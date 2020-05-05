import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Subject } from 'rxjs';

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

  constructor(
    private _consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.cargarConsultas();
  }

  cargarConsultas(){
    this._consultaService.getConsulta().subscribe(
      response => {
        if (response.consultas) {
          this.consultas = response.consultas;
          this.dtTrigger.next();
        }
      }
    );
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
}
