import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  public paciente: Paciente;

constructor(
  private _pacienteService: PacienteService,
    private _route: ActivatedRoute,
    private _router: Router
) { 
  
}
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._pacienteService.getPaciente(id).subscribe(
        response => {
          console.log(response);
          this.paciente = response.paciente;
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    });
  }

}
