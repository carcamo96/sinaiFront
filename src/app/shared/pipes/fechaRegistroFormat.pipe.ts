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

        if(min < 10){
            let aux = '0'+min;
            min = parseInt(aux);
        }
        if(sec < 10){
            let aux2 = '0'+sec;
            sec = parseInt(aux2);
        }

        let fechaString = dia+'/'+mes+'/'+year+'/'+hor+':'+min+':'+sec;

        return fechaString;

    }

}