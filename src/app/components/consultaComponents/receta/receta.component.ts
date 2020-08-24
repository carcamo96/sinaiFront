import { Component, OnInit } from '@angular/core';
import { Receta } from '../../../models/receta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta = {
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

  recetas: Receta[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('Arrary: ', this.recetas);
  }

  onSubmit(f:NgForm){

      console.log("Receta: " ,this.receta);
      let recetaFull = new Receta(
          this.receta.medicamento,
          this.receta.presentacion,
          this.receta.concentracion + ' ' + this.receta.medida,
          this.receta.cantidad,
          'Cada ' + this.receta.frecuencia + ' ' + this.receta.tiempo,
          'Durante '+ this.receta.duracion + ' ' + this.receta.lapso
      );

      this.recetas.push(recetaFull);
  }

}
