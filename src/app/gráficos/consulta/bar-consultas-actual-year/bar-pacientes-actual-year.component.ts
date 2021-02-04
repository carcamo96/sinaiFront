import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-pacientes-actual-year',
  templateUrl: './bar-pacientes-actual-year.component.html',
  styleUrls: ['./bar-pacientes-actual-year.component.css']
})
export class BarPacientesActualYearComponent implements OnInit {

  totalConsultas = 0;
  
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
    var result = this.consultasActualYear(datos);

    this.barChartLabels = result[0];
    this.barChartData = [{data: result[1], label:"Consultas del año actual"}]
  }
  constructor() { }

  ngOnInit(): void {
  }

  consultasActualYear(array: any){
    moment.locale('es');
    var fechaActual = new Date();
    var fechaConsulta;
    var strFecha;
    var a=[], b=[], ant, datos=[];
    array.forEach(d => {
      fechaConsulta = d.fechaConsul.split('-');
     
      if (parseInt(fechaConsulta[0]) == fechaActual.getFullYear()) {
        strFecha = moment(d.fechaConsul);
        console.log(strFecha);
        let mes = strFecha.format('MMMM');
        datos.push(this.convertPrimeraLetra(mes));
      }
    });
    
    this.barChartOptions={ 
    responsive: true,
    scales:{
      yAxes:[{
       ticks:{
         min:0,
         max:(datos.length<= 1)? this.totalConsultas=2 : this.totalConsultas = datos.length
       },
       scaleLabel:{
         display: true,
         labelString:""
       }
      }
    ],
    xAxes:[{
      scaleLabel:{
        display: false,
        labelString:"Meses"
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

  convertPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
