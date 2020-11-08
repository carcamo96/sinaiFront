import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';
import { Subject } from 'rxjs';
import { LoadingBarService } from "@ngx-loading-bar/core";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css'],
  providers: [PacienteService, ConsultaService]
})
export class ExpedienteComponent implements OnInit {
  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/admin/home'},
    {titulo: 'Expedientes', link: '/admin/expedientes'}
  ];

  //Uso este objeto Subject para emitir el resultado del evento response al hijo 
  public eventsSubject: Subject<any> = new Subject<any>();

  public paciente: Paciente;
  public expediente: string = '';

  progressData = 10; //Usando para la ngb-progressbar

constructor(
    private _pacienteService: PacienteService,
    private _route: ActivatedRoute,
    private loadingBarService: LoadingBarService
) { }
  ngOnInit(): void {
    this.loadingBarService.start();
    this.pacienteCargar();
  }

  pacienteCargar(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.progressData = 30;//Avanza 30% la barra de progreso
      this._pacienteService.getPaciente(id).subscribe(
        response => {
          this.progressData = 70; //Avanza 70% la barra de progreso
          setTimeout(() => {//Para simular efecto de carga de la ngbProgressBar
            this.eventsSubject.next(response); // propagando el evento al componente hijo
            this.expediente = response.paciente.codigo;//Asignando el codigo de expediente a una variable
            this.loadingBarService.complete();
            this.progressData = 100; //Avanza 100% la barra de progreso se completa
          }, 2000);
        },
        error => {
          //console.log(error);
        }
      );
    }); 

  }

}
