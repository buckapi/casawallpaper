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
    wastePercentage: number = 0; // Para almacenar el porcentaje de desperdicio
    
    constructor(private fb: FormBuilder) {
  
    this.calculatorForm = this.fb.group({
      // other controls
      walls: this.fb.array([this.createWall()]), // Ensure this line exists
      rolls: this.fb.array([this.createRoll()]),
      wastePercentage: [0, Validators.required], // Default value set to 0
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
          rollLengthUnit: ['feet', Validators.required],
          pattern: ['', Validators.required] // Ensure pattern is defined here
      });
  }

    createWall() {
      return this.fb.group({
          height: ['', Validators.required],
          heightUnit: ['feet', Validators.required],
          width: ['', Validators.required],
          widthUnit: ['feet', Validators.required],
          wallCount: [1, Validators.required] // Ensure wallCount is defined here
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

    get walls() {
      return (this.calculatorForm.get('walls') as FormArray).controls;
    }

    addWall() {
      console.log(this.calculatorForm); // Check if this is defined
      const walls = this.calculatorForm.get('walls') as FormArray;
      if (walls) {
          walls.push(this.createWall());
      } else {
          console.error("Walls FormArray is undefined");
      }
  }
    // Manejar el envío del formulario
  onSubmit() {
    if (this.calculatorForm.valid) {
        const formValues = this.calculatorForm.value;
        console.log("Waste Percentage:", formValues.wastePercentage); // Check the value here

        // Initialize total areas and rolls needed
        let totalWallArea = 0;
        let totalRollsNeeded = 0;

        // Calculate total wall area for each wall
        formValues.walls.forEach((wall: any) => {
          const height = this.convertToFeet(wall.height, wall.heightUnit);
          const width = this.convertToFeet(wall.width, wall.widthUnit);
          const wallCount = wall.wallCount || 1;

          // Calculate area for this wall
          const wallArea = height * width * wallCount;
          totalWallArea += wallArea; // Accumulate total wall area
      });

      this.totalWallArea = totalWallArea; // Update the totalWallArea variable
      

        // Calculate the total roll area
        let totalRollArea = 0;
        formValues.rolls.forEach((roll: any) => {
            const rollWidth = this.convertToFeet(roll.rollWidth, roll.rollWidthUnit);
            const rollLength = this.convertToFeet(roll.rollLength, roll.rollLengthUnit);
            totalRollArea += rollWidth * rollLength;
        });

        // Define the area covered by one roll (example given)
        const AREA_CUBIERTA_POR_ROLLO = 66; // square feet

        // Calculate rolls needed based on total wall area
        totalRollsNeeded = Math.ceil(totalWallArea / AREA_CUBIERTA_POR_ROLLO);

        // Get the waste percentage from the form
        const porcentajeDesperdicio = formValues.wastePercentage || 0;

        // Calculate additional waste and round up
        const desperdicio = totalRollsNeeded * (porcentajeDesperdicio / 100);
        totalRollsNeeded += Math.ceil(desperdicio);

        // Show the result
        this.result = `You need ${totalRollsNeeded} wallpaper rolls to cover the walls.`;
        this.totalRollArea = totalRollArea; // Assign the total area covered by the rolls
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