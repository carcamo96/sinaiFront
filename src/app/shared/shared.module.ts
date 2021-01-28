import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//En este modulo iran todas las librerias y modulos usados globalmente por la aplicación
//importaciones para usar las alertas toastr
import { ToastrModule } from 'ngx-toastr';

//para usar las mascaras en los campos de formulario
import { NgxMaskModule, IConfig } from 'ngx-mask';

//Para usar patterns en las validaciones de formularios
import { NgxPatternModule } from 'ngx-pattern';

// importación para hacer uso de Pipes/Tuberías
import {NgPipesModule} from 'ngx-pipes';

//Para usar ngx-loadingBar
import {LoadingBarModule} from "@ngx-loading-bar/core";

//Para las dataTables
import { DataTablesModule } from 'angular-datatables';

//Para las sweet alerts
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Para usar ngx-smart-modal
import { NgxSmartModalModule } from 'ngx-smart-modal';

//Para usar el ngx-Wizard
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

//Libreria de NgBootstrap. Se importó automaticamente (De esta libreria se usan los popovers)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

//Import de ngx-pagination
import {NgxPaginationModule} from 'ngx-pagination';

//Import de modulo para las gráficas
import { ChartsModule } from 'ng2-charts';

//Import de modulo de select para usar comboboxs
import { NgxSelectModule } from 'ngx-select-ex';


//Configuracion inicial de las mascaras ngx-mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

//Configuración inicial de ngx-wizard
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    
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
  ],
  exports: [
    ToastrModule, //  agregando ToastrModule
    NgxMaskModule, //Agregando el modulo de ngx-mask
    NgxPatternModule, // Agregando el modulo de ngx-patter
    NgPipesModule, // Modulo de Pipes
    LoadingBarModule,
    DataTablesModule, //Modulo para usar las tablas
    SweetAlert2Module, // inicializando las swett alerts
    NgxSmartModalModule, // inicializando Ngx-smart-modal
    NgWizardModule, //inicializando el ngx-wizard
    NgbModule, // Importancion de NgBootstrap
    NgCircleProgressModule, //Barra de progreso en forma de circulo
    NgxPaginationModule, //Paginación para el catalogo de estudios medicos
    ChartsModule,
    NgxSelectModule,
  ],
})
export class SharedModule { }
