  /*  onSubmit() {
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
            formValues.rolls.forEach((roll: any) => {
                const rollWidth = this.convertToFeet(roll.rollWidth, roll.rollWidthUnit);
                const rollLength = this.convertToFeet(roll.rollLength, roll.rollLengthUnit);
                totalRollArea += rollWidth * rollLength; // Área cubierta por cada rollo
            });
    
            // Obtener el patrón de repetición
            const patternRepeat = formValues.patternRepeat || 1; // Default to 1 if not provided
    
            // Calcular la cantidad de rollos necesarios
            let rollsNeeded = this.totalWallArea / totalRollArea;
    
            // Ajustar por el patrón de repetición
            rollsNeeded *= patternRepeat;
    
            // Obtener el porcentaje de desperdicio del formulario
            const porcentajeDesperdicio = formValues.wastePercentage || 0;
    
            // Calcular el desperdicio adicional y redondear hacia arriba
            const desperdicio = rollsNeeded * (porcentajeDesperdicio / 100);
            rollsNeeded += Math.ceil(desperdicio);
    
            // Redondear la cantidad de rollos hacia arriba
            rollsNeeded = Math.ceil(rollsNeeded);
    
            // Mostrar los resultados
            this.result = `You need ${rollsNeeded} wallpaper rolls.`;
            this.totalRollArea = totalRollArea; // Asignar el área total cubierta por los rollos
            this.rollsNeeded = rollsNeeded; // Asignar la cantidad de rollos necesarios
            this.patternRepeat = formValues.patternRepeat;
        } else {
            this.result = 'Please fill out the form correctly.';
        }
    } */