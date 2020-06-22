import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Subject } from 'rxjs';
import { Paciente } from '../../models/paciente';
//importando ngx-loading
import { LoadingBarService } from '@ngx-loading-bar/core';
//importando para navegar en las rutas
import {Router, ActivatedRoute, Params} from '@angular/router';
//Para usar el modal
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css'],
  providers: [PacienteService]
})
export class ExpedientesComponent implements OnInit, OnDestroy {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/admin/home'}
  ];

  progressData = 10;

  dtTrigger: Subject<any> = new Subject();
  public pacientes: any[] =[];
  dtOptions: DataTables.Settings = {};
 
  constructor(
    private _pacienteService: PacienteService,
    private loadingBarService: LoadingBarService,
    private router: Router,
    private route: ActivatedRoute,
    public ngxSmartModalService: NgxSmartModalService
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
    this.progressData = 30;
    this._pacienteService.getPacientes().subscribe(
      response => {
        this.progressData = 70;
        if (response.pacientes) {
            //Para efecto de carga
            setTimeout(() => {
              this.pacientes = response.pacientes;
              this.dtTrigger.next();
              this.loadingBarService.complete();
              this.progressData = 100;
            }, 2000);
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
    this.router.navigate(['/admin/consultas/', idPaciente ]);
  }

  redireccionarExpediente(idPaciente){
    this.router.navigate(['/admin/expedientes/expediente/', idPaciente ]);
  }

}
