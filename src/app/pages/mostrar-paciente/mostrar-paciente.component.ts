import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-mostrar-paciente',
  templateUrl: './mostrar-paciente.component.html',
  styleUrls: ['./mostrar-paciente.component.css']
})
export class MostrarPacienteComponent implements OnInit {
  public paciente: any;
  @Input() public objeto: Paciente;
  public pgen: string;
  constructor(
  ) { 
    this.pgen = 'M';
    this.paciente = {

      nombre: '',
      apellidos: '',
      fechaNac: '',
      edad: '',
      gen: '',
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
