import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostrarConsultaRoutingModule } from './mostrar-consulta-routing.module';
import { MostrarConsultaComponent } from './mostrar-consulta.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MostrarConsultaComponent],
  imports: [
    CommonModule,
    FormsModule,
    MostrarConsultaRoutingModule,
    GeneralComponentsModule,
    SharedModule,
    PipesModule
  ]
})
export class MostrarConsultaModule { }
