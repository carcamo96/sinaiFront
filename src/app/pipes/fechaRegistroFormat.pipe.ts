import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fechaHoraMinSec'
})

export class FechaRegistroFormat implements PipeTransform{

    transform(value: any){

        let fecha = new Date(value);

        let dia = fecha.getDate();
        let mes = fecha.getMonth()+1;
        let year = fecha.getFullYear();

        let sec = fecha.getSeconds();
        let min = fecha.getMinutes();
        let hor = fecha.getHours();

        let fechaString = dia+'/'+mes+'/'+year+'/'+hor+':'+min+':'+sec;

        return fechaString;

    }

}