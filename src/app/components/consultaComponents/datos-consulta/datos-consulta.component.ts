import { Component, OnInit, ViewChild, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from "ngx-toastr";
import { Consulta } from "src/app/models/consulta";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datos-consulta',
  templateUrl: './datos-consulta.component.html',
  styleUrls: ['./datos-consulta.component.css']
})
export class DatosConsultaComponent implements OnInit {

  public fechaAux;//Variable para manejar la fe cha actual
  public consulta: any; //Objeto modelo de la consulta
  public edad: number; //Variable para guardar el calculo de la edad del paciente
  public paciente: Paciente; //Objeto de tipo paciente para cargarlo con sus datos

  @Input() ayuda: boolean;// Para manejar la ayuda de los formularios
  //Para recibir el objeto paciente cargado desde el componente padre
  private eventsSubscription: any;
  @Input() events: Observable<any>;

  //Para propagar el evento de adjuntar al componente padre que reunirá todos los datos
  @Output() datosConsulta = new EventEmitter();

  //Para los calculos de signos vitales
  public indice: string;
  

  //Para las sweetAlerts
  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorNoValidSwal') private errorNoValidSwal: SwalComponent;


  constructor(

  ) {
    this.consulta = {
      paciente: "",
      motivo: "",
      tiemSintoma: "",
      fechaConsul: "",
      historia: "",
      antePatol: "",
      alergias: "",
      peso: "",
      talla: "",
      temperatura: "",
      presionArt: "",
      indiceMC: "",
      freCardia: "",
      diagnostico: "",
    };

    this.consulta.fechaConsul = this.inicializarFechaActual();
    this.fechaAux = this.inicializarFechaActual();
  }

  ngOnInit(): void {
    this.cargarPaciente();
  }

  //Se dispara cuando se da click en el boton de adjuntar
  confirmarDatosConsulta(){
    this.confirmarSwal.fire();
  }

  //Se ejecuta si se confirma el formulario de datos de consulta
  onSubmit(f:NgForm){
    //Evento que se propagará con los valores capturados al padre
      if (f.valid) {
        //Propagando el objeto consulta al padre
        this.datosConsulta.emit(this.consulta);
      }
  }

  cargarPaciente(){

    //Recibiendo el evento de subscripcion del padre para traer los datos del paciente
    this.eventsSubscription = this.events.subscribe(
      response => {

        this.paciente = response.paciente;
        this.edad = this.obtenerEdad(
          new Date(),
          new Date(this.paciente.fechaNac)
        );
        //Guarda el id del paciente al que pertenece la consulta
        this.consulta.paciente = response.paciente._id;
        //console.log(this.consulta.paciente);

      },//Fin del response
      error =>{

      }//Fin del error 
    );

  }

  obtenerEdad(fechaActual, fechaNac) {
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;

    let mesNac = fechaNac.getMonth() + 1;
    let diaNac = fechaNac.getDate();

    //Calculando edad relativa
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (mesActual < mesNac) {
      edad--;
    }
    if (mesNac == mesActual && diaActual < diaNac) {
      edad--;
    }

    return edad;
  } // fin del metodo de calculo de edad

  esMenor() {
    return this.edad >= 0 && this.edad < 15;
  }

  //Fecha actual
  inicializarFechaActual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    var dia = dd.toString();
    if (dd < 10) {
      dia = "0" + dd;
    }
    var mes = mm.toString();
    if (mm < 10) {
      mes = "0" + mm;
    }

    return yyyy + "-" + mes + "-" + dia;
  }

  //Calculos de los signos vitales
  cal3() {
    var pes = parseFloat(this.consulta.peso);
    var tall = parseFloat(this.consulta.talla);
    if (tall != 0 || tall != null || tall != Infinity) {
      let indice = pes / Math.pow(tall, 2);
      this.indice = "" + parseFloat("" + indice).toFixed(1);
      this.consulta.indiceMC = this.indice;
    } else {
      //this.indice = '';
    }
  }

}
