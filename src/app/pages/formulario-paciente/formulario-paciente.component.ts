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
  }

  ngOnInit(): void {
    
  }

  onSubmit(f:NgForm){
      //console.log(this.paciente);
      console.log(f.value);
      this.showSuccess("Se ha registrado un nuevo paciente", "Nuevo expediente");
  }

  cambioFecha(event){
     
      let anioActual = new Date();
      let fechaNac = new Date(event);

      this.paciente.fechaNac = event;

      //Arreglar calculo con fecha completa con moment js
      let edad = anioActual.getFullYear() - fechaNac.getFullYear();

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
