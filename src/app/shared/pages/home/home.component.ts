import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/moduloConsulta/pacientes/services/paciente.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PacienteService ]
})
export class HomeComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [];

  public datos: any[] = [];

  public pieChartColors:Array<any> = [{
    backgroundColor: ["green", "blue", "#0459b4"],
    borderColor: ["#0459b4", "#04b58d"]
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
    private _pacienteService: PacienteService
  ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
  }

  

  ngOnInit(): void {
    this._pacienteService.getPacientes().subscribe( response => {
      if (response.pacientes) {
        this.datos = response.pacientes;
        this.mediciones(this.datos);
        console.log(this.datos);
        console.log(this.mediciones);
      }
    },
    error => {
      console.log(error);
    }

    );
  }

}
