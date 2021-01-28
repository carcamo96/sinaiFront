import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPacienteComponent } from './mostrar-paciente.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MostrarPacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GeneralComponentsModule,
    SharedModule
  ],
  exports: [
    MostrarPacienteComponent
  ]
})
export class MostrarPacienteModule { }
