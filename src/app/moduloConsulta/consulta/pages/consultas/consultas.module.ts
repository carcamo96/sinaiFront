import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasComponent } from './consultas.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    GeneralComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    ConsultasComponent
  ]
})
export class ConsultasModule { }
