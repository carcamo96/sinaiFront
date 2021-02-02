import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Subject, Observable } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Paciente } from 'src/app/moduloConsulta/pacientes/models/paciente';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  providers: [ConsultaService]
})
export class ConsultasComponent implements OnInit, OnDestroy {

  public consultas: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  private eventsSubscription: any;
  @Input() events: Observable<any>;

  //auxiliar del id
  public id = '';

  constructor(
    private _consultaService: ConsultaService,
    private loadingBarService: LoadingBarService,
    public ngxSmartModalService: NgxSmartModalService
  ) { this.loadingBarService.start(); }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    
    this.eventsSubscription = this.events.subscribe(
      response => {
        this.id = response.paciente._id;
        this._consultaService.getConsultas(response.paciente._id).subscribe(
          response => {
            this.consultas = response.consultas;
            console.log("Exito: ", response);
            this.dtTrigger.next();
          },
          error => {
            console.log("nadaaa "+error);
            this.loadingBarService.complete();
          }
        );
          this.loadingBarService.complete();
          
      },
      error=>{
          console.log("Error del hijo: "+error);
          this.loadingBarService.complete();
          //this.errorSwal.fire();
      }
    );

  }

  /*cargarConsultas(){
    this._consultaService.getConsulta().subscribe(
      response => {
        if (response.consultas) {
          this.consultas = response.consultas;
          this.dtTrigger.next();
        }
      }
    );
  }*/


  ngOnDestroy(): void{
    this.eventsSubscription.unsubscribe();
  }
}
