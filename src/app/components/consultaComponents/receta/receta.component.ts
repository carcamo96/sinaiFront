import { Component, OnInit } from '@angular/core';
import { RecetaItem } from '../../../models/recetaItem';
import { NgForm } from '@angular/forms';
import { Receta } from 'src/app/models/receta';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  recetaItem = {
    medicamento: '',
    presentacion: 'Tableta',
    concentracion: '',
    medida: 'mg',
    cantidad: 1,
    frecuencia: 2,
    tiempo: 'Hora/s',
    duracion: 7,
    lapso: 'Dia/s',
  }

  detallesMedicos = '';

  items: RecetaItem[] = [];

  constructor() { }

  ngOnInit(): void {
    //console.log('Arrary: ', this.recetas);
  }

  onSubmit(f:NgForm){

      //console.log("Receta: " ,this.receta);
      let recetaItem = new RecetaItem(
          this.recetaItem.medicamento,
          this.recetaItem.presentacion,
          this.recetaItem.concentracion + ' ' + this.recetaItem.medida,
          this.recetaItem.cantidad,
          'Cada ' + this.recetaItem.frecuencia + ' ' + this.recetaItem.tiempo,
          'Durante '+ this.recetaItem.duracion + ' ' + this.recetaItem.lapso
      );

      this.items.push(recetaItem);
  }

  //Elimina un conjunto de elementos del array desde la pocisión dada
  descartar(index){
    this.items.splice(index, 1);
  }

  confirmar(){
      //Empaquetando en un solo objeto para enviar 
      let recetaFull = new Receta(
        this.items,
        this.detallesMedicos
      );
      //console.log('Datos confirmados: ', recetaFull);
  }

}
