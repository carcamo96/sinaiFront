import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

//Para usar ngx-smart-modal
import { NgxSmartModalModule } from 'ngx-smart-modal';

//Para usar el ngx-Wizard
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

//Libreria de NgBootstrap. Se importó automaticamente (De esta libreria se usan los popovers)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CalculadorComponent,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // Se requiere el modulo de animaciones de angular
    ToastrModule.forRoot(), //  agregando ToastrModule
    NgxMaskModule.forRoot(maskConfig), //Agregando el modulo de ngx-mask
    NgxPatternModule, // Agregando el modulo de ngx-patter
    NgPipesModule, // Modulo de Pipes
    LoadingBarModule,
    DataTablesModule, //Modulo para usar las tablas
    SweetAlert2Module.forRoot(), // inicializando las swett alerts
    NgxSmartModalModule.forRoot(), // inicializando Ngx-smart-modal
    NgWizardModule.forRoot(ngWizardConfig), //inicializando el ngx-wizard
    NgbModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
