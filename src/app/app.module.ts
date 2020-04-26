import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    ExpedienteComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
