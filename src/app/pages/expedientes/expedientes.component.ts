import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css'],
  providers: [PacienteService]
})
export class ExpedientesComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/home'}
  ];

  public pacientes: Paciente[];

  constructor(
    private _pacienteService: PacienteService
  ) { }

  ngOnInit(){
    this.cargarPacientes();
  }
  cargarPacientes(){
    this._pacienteService.getPaciente().subscribe(
      response => {
        if (response.pacientes) {
         this.pacientes = response.pacientes;
         console.log(response.pacientes);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
