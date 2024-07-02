import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Butler } from '@app/services/butler.service';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { Yeoman } from '@app/services/yeoman.service';
import { FormGroup, Validators } from '@angular/forms';
import { DataApiService } from '@app/services/data-api-service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  request: FormGroup;
  submitted = false;
  public isError = false;
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public formBuilder: FormBuilder,
  public _butler: Butler,
  public http: HttpClient,
  public yeoman: Yeoman,
  public dataApiService: DataApiService
) {
  this.request = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    zipcode: ['', Validators.required],
    serviceType: ['', Validators.required],
    projectType: ['', Validators.required],
    message: ['', Validators.required],
    area: ['', Validators.required],
    date: ['', Validators.required],

  });
}
get f(): { [key: string]: AbstractControl } {
  return this.request.controls;
}


saveRequest() {
  this.submitted = true; 

  // Verifica si el formulario es válido antes de enviarlo
  /* if (this.addProperties.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
    });
    return;
  } */

  let data: any = this.request.value;
  data.images = this._butler.uploaderImages;
  this._butler.uploaderImages = [];
  
  this.dataApiService.saveRequest(data).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Request saved successfully.'
      }).then(() => {
        // Limpiar los valores para futuros usos
        this.global.requests = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;
        
        // Reiniciar el formulario
        this.request.reset();
        this.submitted = false;  // Resetear el estado de envío

        // Recargar la página
        window.location.reload();
      });

      console.log('Request saved successfully:', response);
    },
    (error) => {
      this.onIsError();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the request. Please try again later.'
      });
      console.log('Error saving request:', error);
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
  this.request = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    zipcode: ['', Validators.required],
    serviceType: ['', Validators.required],
    projectType: ['', Validators.required],
    message: ['', Validators.required],
    area: ['', Validators.required],
    date: ['', Validators.required],
  });
}
onIsError(): void {
  this.isError = true;
  /* setTimeout(() => {
    this.isError = false;
  }, 4000); */
}
}
