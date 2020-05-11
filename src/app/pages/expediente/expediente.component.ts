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
  dtOptions: DataTables.Settings = {};

constructor(
    private _pacienteService: PacienteService,
    private _route: ActivatedRoute
) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.pacienteCargar();
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

  ngOnDestroy(): void {
    //this.dtTrigger.unsubscribe();
  }

}
