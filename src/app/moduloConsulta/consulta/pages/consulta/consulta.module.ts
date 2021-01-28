import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetaComponent } from '../../components/receta/receta.component';
import { DatosConsultaComponent } from '../../components/datos-consulta/datos-consulta.component';
import { HistorialComponent } from '../../components/historial/historial.component';

import { SharedModule } from '../../../../shared/shared.module';
import { ConsultaComponent } from './consulta.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { FormsModule } from '@angular/forms';
import { MostrarPacienteModule } from '../../../pacientes/pages/mostrar-paciente/mostrar-paciente.module';
import { ConsultasModule } from '../consultas/consultas.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { ConsultaRoutingModule } from './consulta-routing.module';

@NgModule({
  declarations: [
    ConsultaComponent,
    RecetaComponent,
    DatosConsultaComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsultaRoutingModule,
    GeneralComponentsModule,
    SharedModule,
    MostrarPacienteModule,
    ConsultasModule,
    PipesModule
  ]
})
export class ConsultaModule { }
