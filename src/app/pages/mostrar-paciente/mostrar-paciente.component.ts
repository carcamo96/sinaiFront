import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-paciente',
  templateUrl: './mostrar-paciente.component.html',
  styleUrls: ['./mostrar-paciente.component.css']
})
export class MostrarPacienteComponent implements OnInit {
  public paciente: any;
  public pgen: string;
  constructor() { 
    this.pgen = 'M';
    this.paciente = {

      nombre: '',
      apellidos: '',
      fechaNac: '',
      edad: 19,
      gen: 'M',
      telefono: '',
      encargado: '',
      parentesco: '',
      faContacto: '',
      telFaContacto: '',
      direccion: '',
      otrosDatos: ''

    };
  }

  ngOnInit(){
    console.log(this.paciente);
    console.log(this.paciente.edad);
  }

}
