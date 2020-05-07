import { Component, OnInit, Input } from "@angular/core";
import { Paciente } from "../../models/paciente";
import { NgForm } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-mostrar-paciente",
  templateUrl: "./mostrar-paciente.component.html",
  styleUrls: ["./mostrar-paciente.component.css"],
})
export class MostrarPacienteComponent implements OnInit {

  public disabledDefault = true;

  public paciente: any; // objeto auxiliar
  public edad: number; //variable auxiliar para mostrar la edad
  public fechaAux = ''; //para definir la fecha actual para el datePicker

  //@Input() public objeto: any; //recibiendo el objeto paciente
  private eventsSubscription: any
  @Input() events: Observable<any>;

  constructor(
      private _pacienteService: PacienteService
  ) {
   
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
      otrosDatos: ''
    }

    this.inicializarFechaActual();

  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(
      response => {
        console.log(response);
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
      },
      error=>{
          console.log("Error del hijo: "+error);
      }
    );
  }

  ngOnDestroy(){
    this.eventsSubscription.unsubscribe();
  }


  onSubmit(f:NgForm){

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
    console.log(yyyy + "-" + mes + "-" + dia);
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
