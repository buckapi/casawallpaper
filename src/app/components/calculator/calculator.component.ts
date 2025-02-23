import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
    rollIndex: number = 0;
    calculatorForm: FormGroup;
    result: string = '';
    totalWallArea: number = 0; // Para almacenar el área total de la pared
    totalRollArea: number = 0; // Para almacenar el área cubierta por los rollos
    rollsNeeded: number = 0; // Para almacenar la cantidad de rollos necesarios
  
  
    constructor(private fb: FormBuilder) {
   /*    this.calculatorForm = this.fb.group({
        height: ['', Validators.required],
        heightUnit: ['feet', Validators.required],
        width: ['', Validators.required],
        widthUnit: ['feet', Validators.required],
        wallCount: [1],
        rolls: this.fb.array([this.createRoll()]),
        wastePercentage: [0]
      }); */
      this.calculatorForm = this.fb.group({
        height: ['', Validators.required],
        heightUnit: ['feet', Validators.required],
        width: ['', Validators.required],
        widthUnit: ['feet', Validators.required],
        wallCount: [1],
        rolls: this.fb.array([this.createRoll()]),
        wastePercentage: [0],
        totalWallArea: 0, // Cambia de string a number
        totalRollArea: 0, // Cambia de string a number
        rollsNeeded: 0 // Cambia de string a number
    });
    }
  
    // Crear un formulario para un solo rollo
    createRoll() {
      return this.fb.group({
        rollWidth: ['', Validators.required],
        rollWidthUnit: ['feet', Validators.required],
        rollLength: ['', Validators.required],
        rollLengthUnit: ['feet', Validators.required]
      });
    }
  
    // Obtener los controles de los rollos
    get rolls() {
      return (this.calculatorForm.get('rolls') as FormArray).controls;
    }
  
    // Función para agregar más rollos al formulario
    addRoll() {
      const rolls = this.calculatorForm.get('rolls') as FormArray;
      rolls.push(this.createRoll());
    }

    addWall() {
      const walls = this.calculatorForm.get('walls') as FormArray;
      walls.push(this.fb.group({
          height: ['', Validators.required],
          heightUnit: ['feet', Validators.required],
          width: ['', Validators.required],
          widthUnit: ['feet', Validators.required]
      }));
  }
  
    // Manejar el envío del formulario
 
        onSubmit() {
          if (this.calculatorForm.valid) {
              const formValues = this.calculatorForm.value;
      
              // Recuperar datos de las paredes
              const height = this.convertToFeet(formValues.height, formValues.heightUnit);
              const width = this.convertToFeet(formValues.width, formValues.widthUnit);
              const wallCount = formValues.wallCount || 1;
      
              // Calcular el área total de las paredes
              this.totalWallArea = height * width * wallCount;
      
              // Calcular el área cubierta por los rollos
              let totalRollArea = 0;
              formValues.rolls.forEach((roll: any) => { // Asegúrate de que el tipo esté definido correctamente
                  const rollWidth = this.convertToFeet(roll.rollWidth, roll.rollWidthUnit);
                  const rollLength = this.convertToFeet(roll.rollLength, roll.rollLengthUnit);
                  totalRollArea += rollWidth * rollLength; // Área cubierta por cada rollo
              });
      
              // Definir el área cubierta por un rollo
              const AREA_CUBIERTA_POR_ROLLO = 66; // pies cuadrados (ejemplo dado)
      
              // Calcular la cantidad de rollos necesarios
              let rollsNeeded = this.totalWallArea / AREA_CUBIERTA_POR_ROLLO;
      
              // Redondear la cantidad de rollos hacia arriba
              rollsNeeded = Math.ceil(rollsNeeded);
      
              // Obtener el porcentaje de desperdicio del formulario
              const porcentajeDesperdicio = formValues.wastePercentage || 0;
      
              // Calcular el desperdicio adicional y redondear hacia arriba
              const desperdicio = rollsNeeded * (porcentajeDesperdicio / 100);
              rollsNeeded += Math.ceil(desperdicio);
      
              // Mostrar el resultado
              this.result = `You need  ${rollsNeeded} wallpaper rolls.`;
              this.totalRollArea = totalRollArea; // Asignar el área total cubierta por los rollos
          } else {
              this.result = 'Please fill out the form correctly.';
          }
      }
      
        convertToFeet(value: number, unit: string): number {
          return unit === 'inches' ? value / 12 : value; // Convierte de pulgadas a pies si es necesario
        }
       /*  clearResult() {
          this.calculatorForm.reset({
              height: '',
              heightUnit: 'feet',
              width: '',
              widthUnit: 'feet',
              wallCount: 1,
              rolls: this.fb.array([this.createRoll()]),
              wastePercentage: 0,
              totalWallArea: 0, // Cambiado a número
              totalRollArea: 0, // Cambiado a número
              rollsNeeded: 0 // Cambiado a número
          });
          this.result = ''; // Limpia el resultado
          this.totalWallArea = 0; // Limpia el área total
          this.totalRollArea = 0; // Limpia el área cubierta por los rollos
          this.rollsNeeded = 0; // Limpia la cantidad de rollos necesarios
      } */
      clearResult() {
        this.calculatorForm.reset({
            height: '',
            heightUnit: 'feet',
            width: '',
            widthUnit: 'feet',
            wallCount: 1,
            rolls: this.fb.array([this.createRoll()]), // Reinicia el formulario de rollos
            wastePercentage: 0,
            totalWallArea: 0, // Cambiado a número
            totalRollArea: 0, // Cambiado a número
            rollsNeeded: 0 // Cambiado a número
        });
        this.result = ''; // Limpia el resultado
        this.totalWallArea = 0; // Limpia el área total
        this.totalRollArea = 0; // Limpia el área cubierta por los rollos
        this.rollsNeeded = 0; // Limpia la cantidad de rollos necesarios
    }
}


/* import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
   
    patternRepeat: number = 1; // Para almacenar el patrón de repetición
    rollIndex: number = 0;
    calculatorForm: FormGroup;
    result: string = '';
    totalWallArea: number = 0; // Total wall area
    totalRollArea: number = 0; // Total roll area
    rollsNeeded: number = 0; // Rolls needed
    wastePercentage: number = 0; // Waste percentage
  
    constructor(private fb: FormBuilder) {
  
   
    this.calculatorForm = this.fb.group({
      height: ['', Validators.required],
      heightUnit: ['feet', Validators.required],
      width: ['', Validators.required],
      widthUnit: ['feet', Validators.required],
      wallCount: [1, Validators.required],
      walls: this.fb.array([]),
      rolls: this.fb.array([this.createRoll()]),
      wastePercentage: [10, Validators.required],
    });
    }
  
    // Crear un formulario para un solo rollo
   
  createRoll() {
      return this.fb.group({
          rollWidth: ['', Validators.required],
          rollWidthUnit: ['feet', Validators.required],
          rollLength: ['', Validators.required],
          rollLengthUnit: ['feet', Validators.required],
          patternRepeat: [1, Validators.required]
      });
  }
  
      get rolls(): FormArray {
        return this.calculatorForm.get('rolls') as FormArray;
    }
    get wallsArray(): FormArray {
      return this.calculatorForm.get('walls') as FormArray;
  }
    // Función para agregar más rollos al formulario
    addRoll() {
      const rolls = this.calculatorForm.get('rolls') as FormArray;
      rolls.push(this.createRoll());
    }
    removeWall(index: number) {
      const walls = this.calculatorForm.get('walls') as FormArray;
      walls.removeAt(index);
  }
  removeRoll(index: number) {
    const rolls = this.calculatorForm.get('rolls') as FormArray;
    rolls.removeAt(index);
  }
    addWall() {
      const walls = this.calculatorForm.get('walls') as FormArray;
      walls.push(this.fb.group({
          height: ['', Validators.required],
          heightUnit: ['feet', Validators.required],
          width: ['', Validators.required],
          widthUnit: ['feet', Validators.required]
      }));
  }
  
    // Manejar el envío del formulario
 
         onSubmit() {
          if (this.calculatorForm.valid) {
              const formValues = this.calculatorForm.value;
      
              // Recuperar datos de las paredes
              const height = this.convertToFeet(formValues.height, formValues.heightUnit);
              const width = this.convertToFeet(formValues.width, formValues.widthUnit);
              const wallCount = formValues.wallCount || 1;
      
              // Calcular el área total de las paredes
              this.totalWallArea = height * width * wallCount;
      
              // Calcular el área cubierta por los rollos
              let totalRollArea = 0;
              formValues.rolls.forEach((roll: any) => { // Asegúrate de que el tipo esté definido correctamente
                  const rollWidth = this.convertToFeet(roll.rollWidth, roll.rollWidthUnit);
                  const rollLength = this.convertToFeet(roll.rollLength, roll.rollLengthUnit);
                  totalRollArea += rollWidth * rollLength; // Área cubierta por cada rollo
              });
      
              // Definir el área cubierta por un rollo
              const AREA_CUBIERTA_POR_ROLLO = 66; // pies cuadrados (ejemplo dado)
      
              // Calcular la cantidad de rollos necesarios
              let rollsNeeded = this.totalWallArea / AREA_CUBIERTA_POR_ROLLO;
      
              // Redondear la cantidad de rollos hacia arriba
              rollsNeeded = Math.ceil(rollsNeeded);
      
              // Obtener el porcentaje de desperdicio del formulario
              const porcentajeDesperdicio = formValues.wastePercentage || 0;
      
              // Calcular el desperdicio adicional y redondear hacia arriba
              const desperdicio = rollsNeeded * (porcentajeDesperdicio / 100);
              rollsNeeded += Math.ceil(desperdicio);
      
              // Mostrar el resultado
              this.result = `You need  ${rollsNeeded} wallpaper rolls.`;
              this.totalRollArea = totalRollArea; // Asignar el área total cubierta por los rollos
          } else {
              this.result = 'Please fill out the form correctly.';
          }
      }
      
   
      convertToFeet(value: number, unit: string): number {
          return unit === 'inches' ? value / 12 : value; // Convierte de pulgadas a pies si es necesario
        }
      clearResult() {
        this.calculatorForm.reset({
            height: '',
            heightUnit: 'feet',
            width: '',
            widthUnit: 'feet',
            wallCount: 1,
            rolls: this.fb.array([this.createRoll()]), // Reinicia el formulario de rollos
            wastePercentage: 0,
            totalWallArea: 0, // Cambiado a número
            totalRollArea: 0, // Cambiado a número
            rollsNeeded: 0, // Cambiado a número
            patternRepeat: 1 // Patrón de repetición
        });
        this.result = ''; // Limpia el resultado
        this.totalWallArea = 0; // Limpia el área total
        this.totalRollArea = 0; // Limpia el área cubierta por los rollos
        this.rollsNeeded = 0; // Limpia la cantidad de rollos necesarios
        this.patternRepeat = 1; // Limpia el patrón de repetición
    } 
      
}
 */