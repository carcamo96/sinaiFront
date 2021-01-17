import { Component, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { RecetaItem } from '../../../../models/recetaItem';
import { NgForm } from '@angular/forms';
import { Receta } from 'src/app/models/receta';
import { EventEmitter } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PdfMakeWrapper, Table, Columns, Txt, Img } from 'pdfmake-wrapper';
import  * as PdfMake from 'pdfmake/build/pdfmake';
import  * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>PdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  @ViewChild('recetaForm') private formulario: NgForm;//Variable para manejar el formulario
@ViewChild('tab') private tabRec: ElementRef;
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
    medidaDosis: ''
  }

  detallesMedicos = '';//Más detalles de la receta

  items: RecetaItem[] = [];//Arreglo de los items de receta(Medicamentos recetados)

  //Para propagar el evento de confirmación de  la receta
  @Output() recetaMedica = new EventEmitter();

  @Input() ayuda: boolean = false; //Para manejar la ayuda de los formularios

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
          ''+ this.recetaItem.duracion + ' ' + this.recetaItem.lapso,
          this.recetaItem.medidaDosis
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
    
          //continua el proceso de adjuntar los datos de receta
          this.adjuntarReceta();
        
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
      medidaDosis: 'Cucharadas'
    }

    this.formulario.resetForm(this.recetaItem);
  }

  //Se dispara cuando se da click en el boton de adjuntar receta
  confirmarDatosReceta(){
    this.confirmarSwal.fire();
  }

  async imprimir(){
   /* const pdf=new PdfMakeWrapper();
    
    pdf.add(new Columns([await new Img('assets/imgs/sinai_logo.jpg')
            .width(200).height(100).build(), 
            new Txt('LABORATORIO AMAYA LOPEZ \n Calle Dr. Adrian García, Barrio El Centro, \n San Esteban Catarina, San Vicente. \n TEL.: 2362-7541')
            .alignment('center').end]).width('auto').fontSize(16).end);
            
    pdf.add(new Text('Medicamentos recetados'));
  
    var tbl;
  
    pdf.add(new Table([
    ['MEDICAMENTO','PRESENTACION','CONCENTRACION','CANTIDAD','FRECUENCIA','DURACION']])
    .widths([90,90,100,60,80,80]).alignment('center').layout('noBorders').background('#4892f0').end);
    this.items.forEach(rec => {
     tbl= new Table([ 
        [rec.medicamento, rec.presentacion, rec.concentracion, rec.cantidad, rec.frecuencia, rec.duracion]
    ]).headerRows(1).widths([90,90,100,60,80,80]).alignment('center').layout('noBorders').end
    
    pdf.add(tbl);
    });
    
   console.log(tbl);
  
    pdf.create().open();
    */
  }

}
