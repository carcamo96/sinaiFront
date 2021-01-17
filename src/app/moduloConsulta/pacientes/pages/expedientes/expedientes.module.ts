import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ExpedientesComponent } from './expedientes.component';



const routes: Routes = [
  {
    path: '',
    component: ExpedientesComponent
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ExpedientesModule { }
