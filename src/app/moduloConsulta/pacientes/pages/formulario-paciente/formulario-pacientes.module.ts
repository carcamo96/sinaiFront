import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormularioPacienteRountingModule } from './formulario-paciente-rounting.module';

import { FormularioPacienteComponent } from './formulario-paciente.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [FormularioPacienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    GeneralComponentsModule,
    SharedModule,
    PipesModule,
    FormularioPacienteRountingModule,
  ]
})
export class FormularioPacientesModule { }
