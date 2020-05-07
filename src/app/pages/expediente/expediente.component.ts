import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  {titulo: 'Home', link: '/home'},
  {titulo: 'Expedientes', link: '/expedientes'}
];

  //Uso este objeto Subject para emitir el resultado del evento response al hijo 
  public eventsSubject: Subject<any> = new Subject<any>();


  
  public paciente: Paciente;
  public consultas: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

constructor(
    private _pacienteService: PacienteService,
    private _consultaService: ConsultaService,
    private _route: ActivatedRoute,
    private _router: Router
) { }
  ngOnInit(): void {
 
    this.pacienteCargar();
    this.consultasCargar();
  }

  pacienteCargar(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._pacienteService.getPaciente(id).subscribe(
        response => {
          this.eventsSubject.next(response); // propagando el evento al componente hijo
          console.log(response);
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    }); 

  }

  consultasCargar(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._consultaService.getConsultas(id).subscribe(
        response => {
          console.log(response.consultas);
          this.consultas = response.consultas;
          this.dtTrigger.next();
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
