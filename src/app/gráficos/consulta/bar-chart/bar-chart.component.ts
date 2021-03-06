import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { PacienteService } from '../../../moduloConsulta/pacientes/services/paciente.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  providers: [ PacienteService ]
})
export class BarChartComponent implements OnInit, AfterViewInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors:Array<any> = [{
    backgroundColor: ["#0099CC", "#DAF7A6", "#0459b4"]
    }];

  public pieChartLabels: Label[] = [
    'Mayores de 18', 'Menores de 18'
];
  edadMeses: number;


  @Input()
  set mediciones(datos: any) {
    let edad = 0;
      let mayores = 0;
      let menores = 0;
  
      datos.forEach(m => {
        edad = this.obtenerEdad(
          new Date(),
          new Date(m.fechaNac)
        );
          if (edad >= 18) {
            mayores++;
          } else {
              if (edad < 18) {
                menores++;
              } 
          }
      });
      this.pieChartData = [mayores, menores];
  }  

  constructor() { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
   
  }
  obtenerEdad(fechaActual, fechaNac) {
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;

    let mesNac = fechaNac.getMonth() + 1;
    let diaNac = fechaNac.getDate();

    //Calculando edad relativa
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (mesActual < mesNac) {
      edad--;
    }
    if (mesNac == mesActual && diaActual < diaNac) {
      edad--;
    }

    if(edad <= 0){//Cambiando la edad a meses
        let meses = mesActual - mesNac;
        this.edadMeses = meses;
    }

    return edad;
  } // fin del metodo de calculo de edad


}
