import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
//Modulo de todos los componentes generales
import { GeneralComponentsModule } from '../../components/general-components.module';

import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from '../../../gráficos/consulta/bar-chart/bar-chart.component';
import { BarPacientesDeparComponent } from '../../../gráficos/pacientes/bar-pacientes-depar/bar-pacientes-depar.component';
import { BarPacientesActualYearComponent } from '../../../gráficos/consulta/bar-consultas-actual-year/bar-pacientes-actual-year.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    BarChartComponent,
    BarPacientesDeparComponent,
    BarPacientesActualYearComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    GeneralComponentsModule,
    ChartsModule
  ]
})
export class HomeModule { }
