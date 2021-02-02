import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteComponent } from './expediente.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MostrarPacienteModule } from '../mostrar-paciente/mostrar-paciente.module';
import { ConsultasModule } from '../../../consulta/pages/consultas/consultas.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExpedienteComponent
  }
];

@NgModule({
  declarations: [ExpedienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GeneralComponentsModule,
    SharedModule,
    MostrarPacienteModule,
    ConsultasModule
  ],
  exports: [
    ExpedienteComponent
  ]
})
export class ExpedienteModule { }
