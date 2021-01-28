import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
//Modulo de todos los componentes generales
import { GeneralComponentsModule } from '../../components/general-components.module';


@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    GeneralComponentsModule
  ]
})
export class AdminHomeModule { }
