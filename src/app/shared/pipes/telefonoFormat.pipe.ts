import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'telFormat'
})

export class TelefonoFormat implements PipeTransform{

    transform(value: any){

        let telefono = value.toString();
        telefono = telefono.split("");
        let numUno = telefono.slice(0,4);
        let numDos = telefono.slice(4,8);
        
        let mitadUno = "";
        numUno.forEach(element => {
            mitadUno+=element;
        });

        let mitadDos = "";
        numDos.forEach(element => {
            mitadDos+=element;
        });



        let numero = mitadUno + " - " + mitadDos;

        return numero;

    }

}