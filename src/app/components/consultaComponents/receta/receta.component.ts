import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { RecetaItem } from '../../../models/recetaItem';
import { NgForm } from '@angular/forms';
import { Receta } from 'src/app/models/receta';
import { EventEmitter } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  @ViewChild('recetaForm') private formulario: NgForm;//Variable para manejar el formulario

  //Para las sweetAlerts
  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;

  //Objeto que ayuda a manejar los datos del formulario
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

  detallesMedicos = '';//Más detalles de la receta

  items: RecetaItem[] = [];//Arreglo de los items de receta(Medicamentos recetados)

  //Para propagar el evento de confirmación de  la receta
  @Output() recetaMedica = new EventEmitter();

  @Input() ayuda: boolean; //Para manejar la ayuda de los formularios

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
          ''+ this.recetaItem.duracion + ' ' + this.recetaItem.lapso
      );

      this.items.push(recetaItem);
      this.limpiarCampos();
  }

  //Elimina un conjunto de elementos del array desde la pocisión dada
  descartar(index){
    this.items.splice(index, 1);
  }

  cambio(event){
      let palabra: string = event;
      let palabras = palabra.split(' ');
      let clave = palabras[0];

      if(clave === 'Solución'){
        this.recetaItem.medida = 'ml';
      }else{
        this.recetaItem.medida = 'mg';
      }
  }

  confirmar(){
    this.confirmarSwal.fire();//lanzando la alerta

      //Esperando por confirmación
      this.confirmarSwal.confirm.subscribe(res => {

        //Si se confirma
        if(res){
          //continua el proceso de adjuntar los datos de receta
          this.adjuntarReceta();
        }
      });
  }

  adjuntarReceta(){
      //Empaquetando en un solo objeto para enviar 
      let recetaFull = new Receta(
        this.items,
        this.detallesMedicos
      );
      
      //Propagando el objeto Receta al componente Padre
      this.recetaMedica.emit(recetaFull);
  }

  limpiarCampos(){
    this.recetaItem = {
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

    this.formulario.resetForm(this.recetaItem);
  }

  //Se dispara cuando se da click en el boton de adjuntar receta
  confirmarDatosReceta(){
    this.confirmarSwal.fire();
  }

}
