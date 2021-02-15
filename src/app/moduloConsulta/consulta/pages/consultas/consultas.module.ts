import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasComponent } from './consultas.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GeneralComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    ConsultasComponent
  ]
})
export class ConsultasModule { }
