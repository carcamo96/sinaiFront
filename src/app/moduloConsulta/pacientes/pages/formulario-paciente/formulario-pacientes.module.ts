import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormularioPacienteRountingModule } from './formulario-paciente-rounting.module';

import { FormularioPacienteComponent } from './formulario-paciente.component';
import { GeneralComponentsModule } from '../../../../shared/components/general-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { ChartsModule } from 'ng2-charts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPatternModule } from 'ngx-pattern';
import { NgPipesModule } from 'ngx-pipes';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';

//Configuracion inicial de las mascaras ngx-mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

//Configuración inicial de ngx-wizard
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};



@NgModule({
  declarations: [FormularioPacienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    GeneralComponentsModule,
    FormularioPacienteRountingModule,
    
    ToastrModule.forRoot({
      preventDuplicates: true
    }), //  agregando ToastrModule
    NgxMaskModule.forRoot(maskConfig), //Agregando el modulo de ngx-mask
    NgxPatternModule, // Agregando el modulo de ngx-patter
    NgPipesModule, // Modulo de Pipes
    LoadingBarModule,
    DataTablesModule, //Modulo para usar las tablas
    SweetAlert2Module.forRoot(), // inicializando las swett alerts
    NgxSmartModalModule.forRoot(), // inicializando Ngx-smart-modal
    NgWizardModule.forRoot(ngWizardConfig), //inicializando el ngx-wizard
    NgbModule, // Importancion de NgBootstrap
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "UI",
      "titleFontSize": "19",
      "subtitleFontSize": "21",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false
    }), //Barra de progreso en forma de circulo
    NgxPaginationModule, //Paginación para el catalogo de estudios medicos
    ChartsModule,
    NgxSelectModule
  ]
})
export class FormularioPacientesModule { }
