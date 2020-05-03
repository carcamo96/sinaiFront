import { Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Paciente } from '../../models/paciente';
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/home'}
  ];

  public paciente: any;
  public form: NgForm;
  public edad: number;
  
  public fechaAux = '';

  constructor(private toastr: ToastrService) {
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

  ngOnInit(): void {
      
  }

  //Enviando datos
  onSubmit(f:NgForm){
  
      console.log(f.value);
      this.showSuccess("Se ha registrado un nuevo paciente", "Nuevo expediente");
      f.resetForm({r1: 'M' }); //importante!!! resetea y se le pasa un json con los nuevo valores por defecto
      this.edad = undefined;
      this.limpiarCampos(); //limpia los campos del objeto auxiliar

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
     
      let anioActual = new Date();
      let mesActual = anioActual.getMonth() + 1;
      let diaActual = anioActual.getDate();

      let fechaNac = new Date(event);
      let mesNac = fechaNac.getMonth() + 1;
      let diaNac = fechaNac.getDate();

      this.paciente.fechaNac = event; // guardando en el objeto auxiliar

      //Calculando edad relativa
      let edad = anioActual.getFullYear() - fechaNac.getFullYear();

      if(mesActual < mesNac){
          edad--;
      }
      if((mesNac == mesActual) && (diaActual < diaNac)){
          edad--;
      }

      this.edad = edad;

  }

  esMenor(){
    return this.edad >= 0 && this.edad < 18;
  }

  limpiarCampos(){
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
  }

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }
 

}
