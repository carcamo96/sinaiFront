import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/moduloConsulta/pacientes/services/paciente.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ConsultaService } from 'src/app/moduloConsulta/consulta/services/consulta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PacienteService, ConsultaService ]
})
export class HomeComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [];

  public pacientes: any[] = [];
  public consultas: any[] = [];

  public pieChartColors:Array<any> = [{
    backgroundColor: ["#afd1d4", "#bf8597", "#0459b4"]
    }];

  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartLabels: Label[] = [
    'Masculino', 'Femenino'
];


 mediciones(datos: any) {
      let masculino = 0;
      let femenino = 0;
  
      datos.forEach(m => {
          if (m.gen === "M") {
            masculino++;
          } else {
              if (m.gen === "F") {
                femenino++;
              } 
          }
      });
      this.pieChartData = [masculino, femenino];
  }  

  constructor(
    private _pacienteService: PacienteService,
    private _consultaService: ConsultaService
  ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
  }

  

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarConsultas();
  }

  cargarPacientes(){
    this._pacienteService.getPacientes().subscribe( response => {
      if (response.pacientes) {
        this.pacientes = response.pacientes;
        this.mediciones(this.pacientes);
      }
    },
    error => {
      console.log(error);
    }

    );
  }

  cargarConsultas(){
    this._consultaService.getAllConsultas().subscribe( response => {
      if (response.consultas) {
        this.consultas = response.consultas;
        console.log(this.consultas);
      }
    })
  }

}
