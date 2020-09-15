import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'substrEstudio'
})

export class SubstrEstudio implements PipeTransform{

    transform(value: string, clave1:any, clave2: any){

        let newString = value.substr(0, 3);//obteniendo los primero 4 caracteres
        newString = newString + clave1 + clave2;

        return newString;
    }

}