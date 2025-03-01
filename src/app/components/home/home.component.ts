import { Component, AfterViewInit, HostListener, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Butler } from '@app/services/butler.service';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { Yeoman } from '@app/services/yeoman.service';
import { DataApiService } from '@app/services/data-api-service';
import swal from 'sweetalert2';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
  showImage: boolean = true;
  constructor(
    public global: GlobalService,
    public virtualRouter: virtualRouter,
    public formBuilder: FormBuilder,
    public _butler: Butler,
    public http: HttpClient,
    public yeoman: Yeoman,
    public dataApiService: DataApiService,
    private breakpointObserver: BreakpointObserver)
   {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.showImage = !result.matches; // Oculta la imagen en dispositivos móviles
  });
   /*  this.ngFormRequest = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
        zipcode: ['', Validators.required],
        servicesType: ['', Validators.required],
        projectType: ['', Validators.required],
        area: ['', Validators.required],
        message: ['', Validators.required],
    }); */
    this.ngFormRequest = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('your-pattern-here')]],
      zipcode: ['', Validators.required],
      servicesType: ['', Validators.required],
      projectType: ['', Validators.required],
      area: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  

  get f(): { [key: string]: AbstractControl } {
    return this.ngFormRequest.controls;
  }

  saveRequest() {
  this.submitted = true; 


  let data: any = this.ngFormRequest.value;

  // Debug: Mostrar datos del formulario en la consola
  console.log('Datos del formulario:', data);

  this.dataApiService.saveRequest(data).subscribe(
    (response) => {
      swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Request sent successfully.'
      }).then(() => {
        // Limpiar los valores para futuros usos
        this.global.request = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;

        // Reiniciar el formulario
        this.ngFormRequest.reset();
        this.submitted = false;  // Resetear el estado de envío

        // Recargar la página
        window.location.reload();
      });

      console.log('Request saved successfully:', response);
    },
    (error) => {
      this.onIsError();
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the request. Please try again later.'
      });
      console.log('Error al guardar la solicitud:', error);
    }
  );
  }

 
  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;
    event.stopPropagation();
  }

  sendSMS() {
    window.open(`sms:${this.phoneNumber}`, '_self');
  }

  makeCall() {
    window.open(`tel:${this.phoneNumber}`, '_self');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen) {
      const clickedInside = (event.target as HTMLElement).closest('.fab');
      if (!clickedInside) {
        this.menuOpen = false;
      }
    }
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
    ngOnInit(): void {
      window.scrollTo(0, 0);
      this.ngFormRequest = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
        zipcode: ['', Validators.required],
        servicesType: ['', Validators.required],
        projectType: ['', Validators.required],
        area: ['', Validators.required],
        message: ['', Validators.required],
       });
    }
  onIsError(): void {
    this.isError = true;
  }
}
