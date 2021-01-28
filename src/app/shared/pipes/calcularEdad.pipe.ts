import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calcularEdad'
})

export class CalcularEdad implements PipeTransform{

    transform(value: any){
        

        let anioActual = new Date();
        let mesActual = anioActual.getMonth() + 1;
        let diaActual = anioActual.getDate();

        let fechaNac = new Date(value);
        let mesNac = fechaNac.getMonth() + 1;
        let diaNac = fechaNac.getDate();

        //Calculando edad relativa
        let edad = anioActual.getFullYear() - fechaNac.getFullYear();

        if(mesActual < mesNac){
            edad--;
        }
        if((mesNac == mesActual) && (diaActual < diaNac)){
            edad--;
        } 

        let dato = edad+" Año/s";

        if(edad <= 0 ){
            let meses = mesActual - mesNac;
            if(meses >= 0){
                dato = meses + " Mes/es";
            }
        }
        
        
        return dato;
    }

}