import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BarChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: BarChartComponent}
    ])
  ]
})
export class BarChartModule { }
