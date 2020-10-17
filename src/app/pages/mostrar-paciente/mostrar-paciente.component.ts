import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Paciente } from "../../models/paciente";
import { NgForm } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Observable } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: "app-mostrar-paciente",
  templateUrl: "./mostrar-paciente.component.html",
  styleUrls: ["./mostrar-paciente.component.css"],
})
export class MostrarPacienteComponent implements OnInit {

  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorNoValidSwal') private errorNoValidSwal: SwalComponent;

  public disabledDefault = true;

  public paciente: any; // objeto auxiliar
  public edad: number; //variable auxiliar para mostrar la edad
  public fechaAux = ''; //para definir la fecha actual para el datePicker

  //@Input() public objeto: any; //recibiendo el objeto paciente
  private eventsSubscription: any
  @Input() events: Observable<any>;

  //auxiliar del id
  private id = '';

  constructor(
      private _pacienteService: PacienteService,
      private loadingBarService: LoadingBarService
  ) {
   
    this.loadingBarService.start();

    this.paciente = {
      nombre: '',
      apellidos: '',
      fechaNac: '',
      gen: 'M',
      telefono: '',
      encargado: '',
      parentesco: '',
      faContacto: '',
      telFaContacto: '',
      direccion: '',
      departamento:'Departamento',
      municipio:'Municipio',
      otrosDatos: ''
    }

    this.inicializarFechaActual();

  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(
      response => {
        //console.log(response);
          this.id = response.paciente._id;
          this.paciente = {
            nombre: response.paciente.nombre,
            apellidos: response.paciente.apellidos,
            fechaNac: this.inicializarFechaNac(response.paciente.fechaNac),
            gen: response.paciente.gen,
            telefono: response.paciente.telefono,
            encargado: response.paciente.encargado,
            parentesco: response.paciente.parentesco,
            faContacto: response.paciente.faContacto,
            telFaContacto: response.paciente.telFaContacto,
            direccion: response.paciente.direccion,
            departamento: response.paciente.departamento,
            municipio: response.paciente.municipio,
            otrosDatos: response.paciente.otrosDatos
          }
          //inicializando edad
          this.edad = this.obtenerEdad(new Date() , new Date(response.paciente.fechaNac));
          this.loadingBarService.complete();
          
      },
      error=>{
          //console.log("Error del hijo: "+error);
          this.loadingBarService.complete();
          this.errorSwal.fire();
      }
    );
  }

  ngOnDestroy(){
    this.eventsSubscription.unsubscribe();
  }


  onSubmit(f:NgForm){

    this.loadingBarService.start();
    if(f.valid && this.id != ''){

      let paciente = new Paciente(
        this.paciente.nombre,
        this.paciente.apellidos,
        new Date(this.paciente.fechaNac),
        this.paciente.gen,
        this.paciente.telefono,
        this.paciente.encargado,
        this.paciente.parentesco,
        this.paciente.faContacto,
        this.paciente.telFaContacto,
        this.paciente.direccion,
        this.paciente.departamento,
        this.paciente.municipio,
        this.paciente.otrosDatos
      );

      this._pacienteService.update(this.id, paciente).subscribe(
          response => {
                
                this.id = response.paciente._id;
                this.paciente = {
                  nombre: response.paciente.nombre,
                  apellidos: response.paciente.apellidos,
                  fechaNac: this.inicializarFechaNac(response.paciente.fechaNac),
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
                this.successSwal.fire();
                this.loadingBarService.complete();
                this.disabledDefault = true;

          },
          error =>{
            this.loadingBarService.complete();
            this.disabledDefault = true;
            this.errorSwal.fire();
            //console.log(error.message);
          }
      );


    }else{
      this.errorNoValidSwal.fire();
    }



  }

  confirmarEdicion(){
    this.confirmarSwal.fire();
  }

  edicion(){
      this.disabledDefault  = !this.disabledDefault; 
  }

  inicializarFechaNac(fechaNacParam) {
    var fechaNac = new Date(fechaNacParam);

    var dd = fechaNac.getDate();
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
    //console.log(yyyy + "-" + mes + "-" + dia);
    return yyyy + "-" + mes + "-" + dia;
  }

  //Inicializar fecha actual en el date picker
  inicializarFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            var dia=dd.toString();
            dia='0'+dd;
        } 
        if(mm<10){
          var mes = mm.toString();
            mes='0'+mm;
        } 

    this.fechaAux = yyyy+'-'+mes+'-'+dia;
  }
  // Evento de cambio de fecha para mostrar la edad
  cambioFecha(event){
     
    let fechaActual = new Date();

    let fechaNac = new Date(event);

    this.paciente.fechaNac = event; // guardando en el objeto auxiliar

    //Llamando al calculo de edad
    let edad = this.obtenerEdad(fechaActual, fechaNac);

    this.edad = edad;

  }

  obtenerEdad(fechaActual, fechaNac){

    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;

    let mesNac = fechaNac.getMonth() + 1;
    let diaNac = fechaNac.getDate();

    //Calculando edad relativa
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if(mesActual < mesNac){
        edad--;
    }
    if((mesNac == mesActual) && (diaActual < diaNac)){
        edad--;
    }

    return edad;

  }// fin del metodo de calculo de edad

  esMenor(){
    return this.edad >= 0 && this.edad < 18;
  }


}
