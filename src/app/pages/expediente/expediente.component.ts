import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css'],
  providers: [PacienteService]
})
export class ExpedienteComponent implements OnInit {
//Se le pasan los titulos y los links de las paginas que preseden esta pagina
public breads: any[] = [
  {titulo: 'Home', link: '/home'},
  {titulo: 'Expedientes', link: '/expedientes'}
];

  //Uso este objeto Subject para emitir el resultado del evento response al hijo 
  public eventsSubject: Subject<any> = new Subject<any>();

constructor(
  private _pacienteService: PacienteService,
    private _route: ActivatedRoute,
    private _router: Router
) { }
  ngOnInit(): void {
 
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._pacienteService.getPaciente(id).subscribe(
        response => {
          this.eventsSubject.next(response);
          console.log(response);
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    }); 

  }

}
