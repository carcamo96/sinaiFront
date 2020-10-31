import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';
import { Subject } from 'rxjs';

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

constructor(
    private _pacienteService: PacienteService,
    private _route: ActivatedRoute
) { }
  ngOnInit(): void {
    this.pacienteCargar();
  }

  pacienteCargar(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._pacienteService.getPaciente(id).subscribe(
        response => {
          this.eventsSubject.next(response); // propagando el evento al componente hijo
          this.expediente = response.paciente.codigo;//Asignando el codigo de expediente a una variable
          
        },
        error => {
          //console.log(error);
        }
      );
    }); 

  }

}
