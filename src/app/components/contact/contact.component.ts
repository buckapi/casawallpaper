import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataApiService } from '@app/services/data-api-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  ngFormRequest: FormGroup;
  submitted = false;
  isError = false;

  constructor(private formBuilder: FormBuilder, 
    public dataApiService: DataApiService) {
    this.ngFormRequest = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      zipcode: ['', Validators.required],
      servicesType: ['', Validators.required],
      projectType: ['', Validators.required],
      area: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
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
  
  get f(): { [key: string]: AbstractControl } {
    return this.ngFormRequest.controls;
  }

  saveRequest() {
    this.submitted = true;
 /*    let data: any = this.ngFormRequest.value; */
    let data: any = {
      name: "",
      email: "",
      phone: "",
      zipcode: "",
      servicesType: "",
      projectType: "",
      area: "",
      message: "",
      // otros campos necesarios
  };
    console.log('Datos del formulario:', data); // Verifica si los campos están vacíos aquí
    
    if (!data.servicesType || !data.projectType || !data.area) {
      console.error('Algunos campos obligatorios no están seleccionados');
      return;
    }
  
    this.dataApiService.saveRequest(data).subscribe(
      (response) => {
        swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Request sent successfully.'
        }).then(() => {
          this.ngFormRequest.reset();
          this.submitted = false;
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
    console.log('Datos del formulario:', this.ngFormRequest.value);
if (this.ngFormRequest.invalid) {
    console.error('Formulario inválido');
    return;
}
  }
}
