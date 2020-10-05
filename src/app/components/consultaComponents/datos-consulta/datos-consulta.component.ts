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
  public motivoCon:boolean = true;//Para manejar los motivos de consulta
  public diag:boolean = true;//Para manejar la seleccion de diagnostico

  @Input() ayuda: boolean;// Para manejar la ayuda de los formularios
  //Para recibir el objeto paciente cargado desde el componente padre
  private eventsSubscription: any;
  @Input() events: Observable<any>;

  //Para propagar el evento de adjuntar al componente padre que reunirá todos los datos
  @Output() datosConsulta = new EventEmitter();

  //Validación de presion anterial
  public pSistolica = ''; 
  public pDiastolica = '';
  public pArterial = '';
  

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
      tiemSintomas: {
        tiempo: "7",
        lapso: "Hora/s"
      },
      fechaConsul: "",
      historia: "",
      antePatol: "",
      alergias: "",
      peso: "",
      talla: "",
      temperatura: "",
      presionSistolica: "",
      presionDiastolica: "",
      presionArt: "",
      indiceMC: "",
      freCardia: "",
      diagnostico: {
        diagEspecifico: "",
        diagDetalles: ""
      },
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
  calcularIMC(event, campo) {

    
    if(event != ''){

      if(campo === 'peso'){
        this.consulta.peso = event;
      }

      if(campo === 'talla'){
        this.consulta.talla = event;
      }
      
      if ((this.consulta.talla != 0 && this.consulta.talla!= null && this.consulta.talla != '') &&
          (this.consulta.peso != null && this.consulta.peso != '')) {
        let indice = this.consulta.peso / (Math.pow(this.consulta.talla, 2));
        let valor = "" + parseFloat("" + indice.toFixed(1));
        this.consulta.indiceMC = valor;
      }else{
        this.consulta.indiceMC = '';
      }
    }else{
      this.consulta.indiceMC = '';
    }
  }
  calcularPresion(event, campo){

    if(event != '' && event != 0 && event != null){

      if(campo === 'Sistolica'){
        this.consulta.presionSistolica = event;
      }

      if(campo === 'Diastolica'){
        this.consulta.presionDiastolica = event;
      }

      //Antes de esta linea deberia de validarse los rangos 
      if(this.consulta.presionSistolica != '' && this.consulta.presionSistolica != 0 &&
         this.consulta.presionDiastolica != '' && this.consulta.presionDiastolica != 0){

        this.consulta.presionArt = this.consulta.presionSistolica+' / '+this.consulta.presionDiastolica;
        this.etiquetaPresionArt();
      }else{
        this.consulta.presionArt= '';  
        this.pArterial = '';
      }

    }else{
      if(campo === 'Sistolica'){
        this.consulta.presionSistolica = '';
      }
      if(campo === 'Diastolica'){
        this.consulta.presionDiastolica = '';
      }
      this.consulta.presionArt= '';
      this.pArterial = '';
    }

  }

  etiquetaPresionArt(){

    //Para sistolica
    if(this.consulta.presionSistolica <= 90){
        this.pSistolica = 'baja';
    }
    if(this.consulta.presionSistolica >= 91 && this.consulta.presionSistolica <= 119){
      this.pSistolica = 'normal';
    }
    if(this.consulta.presionSistolica >= 120 && this.consulta.presionSistolica >= 180){
      this.pSistolica = 'elevada';
    }

    //Para diastolica
    if(this.consulta.presionDiastolica <= 60 ){
      this.pDiastolica = 'baja';
    }
    if(this.consulta.presionDiastolica >= 61 && this.consulta.presionDiastolica <= 79){
      this.pDiastolica = 'normal';
    }
    if(this.consulta.presionDiastolica >= 80 && this.consulta.presionDiastolica <= 120){
      this.pDiastolica = 'alta';
    }

    //Presion arterial 
    if(this.pSistolica === 'baja' || this.pDiastolica === 'baja'){
        this.pArterial = 'baja';
    }
    if(this.pSistolica === 'alta' || this.pDiastolica === 'alta'){
      this.pArterial = 'alta';
    }
    if(this.pSistolica === 'normal' && this.pDiastolica === 'normal'){
      this.pArterial = 'normal';
    }

  }

  motivoChange(event){
   if(event.target.value === "B"){
      this.motivoCon = false;
      //console.log("Entra B: ", this.motivo);
   }else{
      this.motivoCon = true;
      //console.log("Entra A: ", this.motivo);
   }
  }

  diagnosticoChange(event){
  if(event.target.value === "Y"){
      this.diag = false;
      //console.log("Entra Y: ", this.diag);
   }else{
      this.diag = true;
      //console.log("Entra x: ", this.diag);
   }
  }


}
