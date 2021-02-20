import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasComponent } from './consultas.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { ModalRecetaComponent } from '../../components/modal-receta/modal-receta.component';



@NgModule({
  declarations: [
    ConsultasComponent,
    ModalRecetaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GeneralComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    ConsultasComponent, 
    ModalRecetaComponent
  ]
})
export class ConsultasModule { }
