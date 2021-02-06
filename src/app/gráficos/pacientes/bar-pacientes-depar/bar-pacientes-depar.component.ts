import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-pacientes-depar',
  templateUrl: './bar-pacientes-depar.component.html',
  styleUrls: ['./bar-pacientes-depar.component.css']
})
export class BarPacientesDeparComponent implements OnInit {

  
  totalPacientes = 0;
  
  barChartOptions: ChartOptions = {};
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  barChartColors: Color[] = [
    {
      backgroundColor: ["#0459b4", "#04b58d", "#04b407", "#b40485", "#b4042d", "#b48b04"]
    },
  ];

  @Input()
  set generarGrafico(datos: any){
    var result = this.pacientesPorDepartamento(datos);

    this.barChartLabels = result[0];
    this.barChartData = [{data: result[1], label:"Pacientes"}]
  }

  constructor() { }

  ngOnInit(): void {
  }

  pacientesPorDepartamento(array: any){
    var a=[], b=[], ant, datos=[];
    array.forEach(d => {
      if (d.departamento =="SAN VICENTE") {
        datos.push(d.municipio);
      }
    });
    
    this.barChartOptions={ 
    responsive: true,
    scales:{
      yAxes:[{
       ticks:{
         min:0,
         max:this.totalPacientes = datos.length + 1
       },
       scaleLabel:{
         display: true,
         labelString:"Cantidad de pacientes"
       }
      }
    ],
    xAxes:[{
      scaleLabel:{
        display: true,
        labelString:"Municipios de San Vicente"
      }
    }]
    }}
    
    datos.sort();
    
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] !== ant) {
        a.push(datos[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      ant = datos[i];
    }

    return [a,b];
  }

}
