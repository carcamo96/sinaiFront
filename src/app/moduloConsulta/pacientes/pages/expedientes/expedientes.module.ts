import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ExpedientesComponent } from './expedientes.component';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: ExpedientesComponent
  }
];



@NgModule({
  declarations: [ExpedientesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PipesModule,
    GeneralComponentsModule,
    SharedModule
  ]
})
export class ExpedientesModule { }
