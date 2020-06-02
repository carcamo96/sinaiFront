import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Subject } from 'rxjs';
import { Paciente } from '../../models/paciente';
//importando ngx-loading
import { LoadingBarService } from '@ngx-loading-bar/core';
//importando para navegar en las rutas
import {Router, ActivatedRoute, Params} from '@angular/router';

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

  //Para controlar la ayuda o información de la tabla
  public ayuda = false;

  dtTrigger: Subject<any> = new Subject();
  public pacientes: any[] =[];
  dtOptions: DataTables.Settings = {};
 
  constructor(
    private _pacienteService: PacienteService,
    private loadingBarService: LoadingBarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.loadingBarService.start();
    this.cargarPacientes();
  }
  cargarPacientes(){
    this._pacienteService.getPacientes().subscribe(
      response => {
        if (response.pacientes) {
         this.pacientes = response.pacientes;
         this.dtTrigger.next();
         this.loadingBarService.complete();
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

  redireccionarConsulta(idPaciente){
    this.router.navigate(['/consultas/', idPaciente ]);
  }

  redireccionarExpediente(idPaciente){
    this.router.navigate(['/expedientes/expediente/', idPaciente ]);
  }

  activarPopovers(){

    this.ayuda = !this.ayuda;

  }

}
