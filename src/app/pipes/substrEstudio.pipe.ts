import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'substrEstudio'
})

export class SubstrEstudio implements PipeTransform{

    transform(value: string, word:string){

        let newString = value.substr(0, 3);//obteniendo los primero 4 caracteres
        newString = newString + word;

        return newString;
    }

}