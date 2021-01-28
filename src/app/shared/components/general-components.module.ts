import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalculadorComponent } from './calculador/calculador.component';


@NgModule({
  declarations: [
    PageHeaderComponent,
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    CalculadorComponent,
  ],
  exports: [
    PageHeaderComponent,
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    CalculadorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class GeneralComponentsModule { }
