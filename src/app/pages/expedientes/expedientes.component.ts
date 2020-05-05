import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Subject } from 'rxjs';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css'],
  providers: [PacienteService]
})
export class ExpedientesComponent implements OnInit, OnDestroy {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/home'}
  ];
  dtTrigger: Subject<any> = new Subject();
  public pacientes: any[] =[];
  dtOptions: DataTables.Settings = {};
 
  constructor(
    private _pacienteService: PacienteService
  ) { }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.cargarPacientes();
  }
  cargarPacientes(){
    this._pacienteService.getPaciente().subscribe(
      response => {
        if (response.pacientes) {
         this.pacientes = response.pacientes;
         this.dtTrigger.next();
         //console.log(response.pacientes);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
