import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//Reactive module es otra manera de manejar los formularios, ver documentación
import { ReactiveFormsModule } from '@angular/forms';

//importaciones para usar las alertas toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

//Registrando pipe personalizada para calcular edad relativa
import { CalcularEdad } from './pipes/calcularEdad.pipe';

//Formatear fechas en vistas de tablas
import { FechaFormat } from './pipes/fechaFormat.pipe';

//Para formatear el telefono 
import { TelefonoFormat } from './pipes/telefonoFormat.pipe';

//Para formatear la hora exacta en que se realizo un registro en el servidor
import { FechaRegistroFormat } from './pipes/fechaRegistroFormat.pipe';

//Para generar un codigo simple de los estudios medicos
import { SubstrEstudio } from './pipes/substrEstudio.pipe';

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

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { AgregarComponent } from './components/activoFijo/agregar/agregar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { HomeComponent } from './pages/home/home.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';
import { MostrarPacienteComponent } from './pages/mostrar-paciente/mostrar-paciente.component';
import { ExpedienteComponent } from './pages/expediente/expediente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { ExpedientesComponent } from './pages/expedientes/expedientes.component';
import { MostrarConsultaComponent } from './pages/mostrar-consulta/mostrar-consulta.component';
import { CalculadorComponent } from './components/calculador/calculador.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RecetaComponent } from './components/consultaComponents/receta/receta.component';
import { DatosConsultaComponent } from './components/consultaComponents/datos-consulta/datos-consulta.component';
import { HistorialComponent } from './components/consultaComponents/historial/historial.component';



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
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    AgregarComponent,
    PageHeaderComponent,
    HomeComponent,
    FormularioPacienteComponent,
    MostrarPacienteComponent,
    ExpedienteComponent,
    ConsultaComponent,
    ConsultasComponent,
    ExpedientesComponent,
    MostrarConsultaComponent,
    CalcularEdad,
    FechaFormat,
    TelefonoFormat,
    FechaRegistroFormat,
    SubstrEstudio,
    CalculadorComponent,
    LoginComponent,
    UsuarioComponent,
    AdminHomeComponent,
    FormularioUsuarioComponent,
    UsuariosComponent,
    RecetaComponent,
    DatosConsultaComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule, //Agregando manualmente este modulo
    HttpClientModule,
    BrowserAnimationsModule, // Se requiere el modulo de animaciones de angular
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
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
