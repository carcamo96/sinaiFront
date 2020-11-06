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
import { ConsultaService } from '../../../services/consulta.service';
import { Diagnostico } from '../../../models/diagnostico';

@Component({
  selector: 'app-datos-consulta',
  templateUrl: './datos-consulta.component.html',
  styleUrls: ['./datos-consulta.component.css']
})
export class DatosConsultaComponent implements OnInit {

  public consulta: any; //Objeto modelo de la consulta
  public paciente: Paciente; //Objeto de tipo paciente para cargarlo con sus datos

  public fechaAux;//Variable para manejar la fecha actual
  public edad: number; //Variable para guardar el calculo de la edad del paciente
  public genero: string = '';//Variable para mostrar los campos de citologia
  public motivoCon:boolean = true;//Para manejar los motivos de consulta
  public motivosComunes: string[] = []; //Arreglo para manejar los motivos comunes en localStorage


  @Input() ayuda: boolean = false;// Para manejar la ayuda de los formularios
  //Para recibir el objeto paciente cargado desde el componente padre
  private eventsSubscription: any;
  @Input() events: Observable<any>;

  //Para propagar el evento de adjuntar al componente padre que reunirá todos los datos
  @Output() datosConsulta = new EventEmitter();

  //Validación de presion anterial
  public pSistolica = ''; 
  public pDiastolica = '';
  public pArterial = '';

  //Arreglos para cargar y seleccionar los diagnosticos
  public diagnostico: string = '';
  public diagSeleccionados: string[] = [];


  //Para las sweetAlerts
  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorNoValidSwal') private errorNoValidSwal: SwalComponent;


  constructor(
      private consultaService: ConsultaService,
      private toastr: ToastrService
  ) {
    this.consulta = {
      paciente: "",
      fechaConsul: "",
      motivo: "",
      tiemSintomas: {
        tiempo: "7",
        lapso: "Hora/s"
      },
      historia: "",
      antePatol: "",
      temperatura: "",
      freCardia: "",
      freRespiratoria: "",
      peso: "",
      talla: "",
      indiceMC: "",
      presionSistolica: "",
      presionDiastolica: "",
      presionArt: "",
      perimetroCefalico: "",
      circunferenciaAbdominal: "",
      alergias: "",
      examenFisico: "",
      citologia: {
        fecha: "",
        observacion: ""
      },
      diagnostico: {
        diagSeleccionados: this.diagSeleccionados,
        diagDetalles: ""
      },
    };

    this.consulta.fechaConsul = this.inicializarFechaActual();
    this.fechaAux = this.inicializarFechaActual();
  }

  ngOnInit(){
    this.cargarPaciente();
    this.cargarMotivosComunes();
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
        this.genero = this.paciente.gen;

      },//Fin del response
      error =>{

      }//Fin del error 
    );

  }

  //Método para agregar uno ó mas diagnosticos a un arreglo
  agregarDiagnosticos(){
      
    if(this.diagnostico !== '' && this.diagnostico != null){
        this.diagnostico = this.diagnostico.trim();
        this.diagSeleccionados.push(this.diagnostico);
        this.diagnostico = '';
    }
  }

  //Elimina ó descarta diagnosticos agregados del arreglo
  descartar(index){
    this.diagSeleccionados.splice(index, 1);
  }

  //Método para capturar el motivo del select de motivos comunes
  selectMotivoComun(event){
    this.consulta.motivo = event.target.value;
  }

  //Método para cargar los motivos comunes en un arreglo y mostrarlos, son cargados desde LocalStorage
  cargarMotivosComunes(){
    let resultado = this.consultaService.getMotivos('motivos');
    if(resultado != null){
      this.motivosComunes = resultado;
    }
  }

  //Método para agregar motivos comunes a la lista del LocalStorage
  agregarMotivosComunes(){
    
    if(this.consulta.motivo !== ''){
      this.consulta.motivo = this.consulta.motivo.trim();
        this.consulta.motivo = this.consulta.motivo.toLowerCase();
        if(!this.motivosComunes.includes(this.consulta.motivo)){
          this.motivosComunes.push(this.consulta.motivo);
          this.consultaService.addMotivos('motivos',this.motivosComunes);
          this.showInfo('Se agregó a lista de motivos comunes!','Motivos comunes');
        }
    }
    
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
        this.consulta.peso = event;//Event viene el peso en libras, se guarda en libras
      }

      if(campo === 'talla'){
        this.consulta.talla = event;
      }
      
      if ((this.consulta.talla != 0 && this.consulta.talla!= null && this.consulta.talla != '') &&
          (this.consulta.peso != null && this.consulta.peso != '')) {
        let pesoKilos = this.consulta.peso / 2.2046;//Se calcula el peso en kilogramos para calcular el IMC
        let indice = pesoKilos / (Math.pow(this.consulta.talla, 2));
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

      if(this.consulta.presionSistolica != '' && this.consulta.presionSistolica != 0 &&
         this.consulta.presionDiastolica != '' && this.consulta.presionDiastolica != 0){

        this.consulta.presionArt = this.consulta.presionSistolica+' / '+this.consulta.presionDiastolica;

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

  motivoChange(event){
   if(event.target.value === "B"){
      this.motivoCon = false;
      this.cargarMotivosComunes();
      //console.log("Entra B: ", this.motivo);
   }else{
      this.motivoCon = true;
      //console.log("Entra A: ", this.motivo);
   }
  }

  //Capturando la fecha de la citologia
  fechaCitologia(event){
    this.consulta.citologia.fecha = event;
  }

  // Alerta cuando se adjunten datos de consulta
  showInfo(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo);
  }




}
