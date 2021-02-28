import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from '../../../../models/consulta';
import { NgForm } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../../pacientes/models/paciente';
import { PacienteService } from '../../../pacientes/services/paciente.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mostrar-consulta',
  templateUrl: './mostrar-consulta.component.html',
  styleUrls: ['./mostrar-consulta.component.css'],
  providers: [ConsultaService, PacienteService]
})
export class MostrarConsultaComponent implements OnInit {
public consulta: any;
  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
public breads: any[] = [
  {titulo: 'Home', link: '/admin/home'},
  {titulo: "Expedientes", link: "/admin/expedientes"},
  {titulo: 'Expediente', link: '/admin/expedientes/expediente'}
];

  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorNoValidSwal') private errorNoValidSwal: SwalComponent;

  
  public idpa: string;
  public status: string;
  public paciente: any;
  public disabledDefault = true;
  public indice = '';
  public i:string;

  public fechaAux;//Variable para manejar la fecha actual
  public edad: number; //Variable para guardar el calculo de la edad del paciente
  public genero: string = '';//Variable para mostrar los campos de citologia
  public motivoCon:boolean = true;//Para manejar los motivos de consulta
  public motivosComunes: string[] = []; //Arreglo para manejar los motivos comunes en localStorage


  @Input() ayuda: boolean = false;// Para manejar la ayuda de los formularios
  public alert = false;
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

  constructor(
      private _consultaService: ConsultaService,
      private _pacienteService: PacienteService,
      private toastr: ToastrService,
      private _route: ActivatedRoute
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
      fechaCitologia: "",
      observacionCitologia: "",
      diagnostico: {
        diagSeleccionados: this.diagSeleccionados,
        diagDetalles: ""
      },
    };

    this.consulta.fechaConsul = this.inicializarFechaActual();
    this.fechaAux = this.inicializarFechaActual();
  }

  ngOnInit(): void {
    this.cargarConsulta();
    this.cargarMotivosComunes();
  }
  cargarConsultaModal(){}
  cargarConsulta(){
    this._route.params.subscribe(params => {
      this.idpa = params['id'];

      this._consultaService.getConsulta(this.idpa).subscribe(
        response => {
          if (response.consulta) {
            this.cargarPaciente(response.consulta.pacienteId);
            this.cargarDiagnosticos(response.consulta._id);
            this.consulta = {
              paciente: response.consulta.pacienteId,
              motivo: response.consulta.motivo,
              fechaConsul: this.inicializarFechaConsul(response.consulta.fechaConsul),
              tiemSintomas:{
                tiempo: response.consulta.tiemSintoma.split(' ')[0],
                lapso: response.consulta.tiemSintoma.split(' ')[1]
              },
              historia: response.consulta.historia,
              antePatol: response.consulta.antePatol,
              alergias: response.consulta.alergias,
              peso: response.consulta.peso,
              talla: response.consulta.talla,
              temperatura: response.consulta.temperatura,
              presionArt: response.consulta.presionArterial,
              freCardia: response.consulta.frecuenciaCardiaca,
              freRespiratoria: response.consulta.frecuenciaRespiratoria,
              presionSistolica:response.consulta.presionSistolica,
              presionDiastolica:response.consulta.presionDiastolica,
              indiceMC: response.consulta.indiceMC,
              fechaCre: response.consulta.fechaCre,
              examenFisico:response.consulta.examenFisico,
              fechaCitologia:response.consulta.fechaCitologia,
              observacionCitologia:response.consulta.observacionCitologia,
              diagnostico:{
                diagSeleccionados: this.diagSeleccionados,
        diagDetalles: ""
              } 
             }
            console.log(this.consulta);
          }
        },
        error => {
            console.log(error);
        }
      );
    });
  }

  onSubmit(f: NgForm){
    
    /*this.loadingBarService.start();
    if(f.valid)
    { 
      let consulta = new Consulta(
        this.consulta.paciente,
        this.consulta.motivo,
        this.consulta.tiemSintoma,
        new Date(this.consulta.fechaConsul),
        this.consulta.historia,
        this.consulta.antePatol,
        this.consulta.alergias,
        this.consulta.peso,
        this.consulta.talla,
        this.consulta.temperatura,
        this.consulta.presionArt,
        this.consulta.freCardia,
        this.consulta.indiceMC,
        this.consulta.diagnostico
      );    
      this._consultaService.update(this.idpa,consulta).subscribe(
        response => {
            this.idpa = response.consulta._id;
            this.consulta = {
              paciente: response.consulta.paciente,
              motivo: response.consulta.motivo,
              fechaConsul: this.inicializarFechaConsul(response.consulta.fechaConsul),
              tiemSintoma: response.consulta.tiemSintoma,
              historia: response.consulta.historia,
              antePatol: response.consulta.antePatol,
              alergias: response.consulta.alergias,
              peso: response.consulta.peso,
              talla: response.consulta.talla,
              temperatura: response.consulta.temperatura,
              presionArt: response.consulta.presionArt,
              freCardia: response.consulta.freCardia,
              indiceMC: response.consulta.indiceMC,
              fechaCre: response.consulta.fechaCre,
              diagnostico: response.consulta.diagnostico
            }
          //if (response.status == 'Success') {
            this.loadingBarService.complete();
            //this.status = 'Success';
            this.successSwal.fire();
                this.loadingBarService.complete();
                this.disabledDefault = true;
            
          
        },
        error => {
            console.log(error);
            this.loadingBarService.complete();
            this.disabledDefault = true;
            this.errorSwal.fire();
            //this.showError("No se ha conctado con el servidor", "Error");
        }

      );
   }else{
    this.errorNoValidSwal.fire();
  }*/
  }

  inicializarFechaConsul(fechaConParam) {
    var fechaNac = new Date(fechaConParam);

    var dd = fechaNac.getDate() + 1;
    var mm = fechaNac.getMonth() + 1; //January is 0!
    var yyyy = fechaNac.getFullYear();

    var dia = dd.toString();
    if (dd < 10) {
      dia = "0" + dd;
    }
    var mes = mm.toString();
    if (mm < 10) {
      mes = "0" + mm;
    }
    console.log(yyyy + "-" + mes + "-" + dia);
    return yyyy + "-" + mes + "-" + dia;
  }

  cargarPaciente(id){
    
    
      this._pacienteService.getPaciente(id).subscribe(
        response => {
          this.paciente = {
            nombre: response.paciente.nombre,
            apellidos: response.paciente.apellidos,
            fechaNac: this.inicializarFechaConsul(response.paciente.fechaNac),
            gen: response.paciente.gen,
            telefono: response.paciente.telefono,
            encargado: response.paciente.encargado,
            parentesco: response.paciente.parentesco,
            faContacto: response.paciente.faContacto,
            telFaContacto: response.paciente.telFaContacto,
            direccion: response.paciente.direccion,
            otrosDatos: response.paciente.otrosDatos
          }
          //inicializando edad
          this.edad = this.obtenerEdad(new Date() , new Date(response.paciente.fechaNac));
          console.log(this.paciente);
        },
        error => {
          console.log("nadaaa "+error);
        }
      );
         
    
  }

  

  edicion(){
    this.disabledDefault  = !this.disabledDefault; 
  }

  confirmarEdicion(){
    this.confirmarSwal.fire();
  }

  //Método para agregar uno ó mas diagnosticos a un arreglo
  agregarDiagnosticos(){
      
    if(this.diagnostico !== '' && this.diagnostico != null){
        this.diagnostico = this.diagnostico.trim();
        this.diagSeleccionados.push(this.diagnostico);
        this.diagnostico = '';
    }
  }

  cargarDiagnosticos(consultaId){
    this._consultaService.getDiagnosticos(consultaId).subscribe(
      response => {
        if (response.status == 'success') {
          this.diagSeleccionados = response.consultas;
          console.log(this.diagSeleccionados, response);
        }
      }
    );
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
    let resultado = this._consultaService.getMotivos('motivos');
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
          this._consultaService.addMotivos('motivos',this.motivosComunes);
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
    this.consulta.fechaCitologia = event;
  }

  // Alerta cuando se adjunten datos de consulta
  showInfo(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo);
  }

}
