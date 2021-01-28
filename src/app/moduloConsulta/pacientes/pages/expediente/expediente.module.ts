import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteComponent } from './expediente.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MostrarPacienteModule } from '../mostrar-paciente/mostrar-paciente.module';
import { ConsultasModule } from '../../../consulta/pages/consultas/consultas.module';



@NgModule({
  declarations: [ExpedienteComponent],
  imports: [
    CommonModule,
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
