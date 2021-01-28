import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//Reactive module es otra manera de manejar los formularios, ver documentación
import { ReactiveFormsModule } from '@angular/forms';

//Registrando pipe personalizada para calcular edad relativa
import { CalcularEdad } from './shared/pipes/calcularEdad.pipe';

//Formatear fechas en vistas de tablas
import { FechaFormat } from './shared/pipes/fechaFormat.pipe';

//Para formatear el telefono 
import { TelefonoFormat } from './shared/pipes/telefonoFormat.pipe';

//Para formatear la hora exacta en que se realizo un registro en el servidor
import { FechaRegistroFormat } from './shared/pipes/fechaRegistroFormat.pipe';

//Para generar un codigo simple de los estudios medicos
import { SubstrEstudio } from './shared/pipes/substrEstudio.pipe';

//importacion del modulo que comparte para toda la aplicación
import { SharedModule } from './shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { AppRoutingModule } from './app-routing.module';

//Modulos propios
import { GeneralComponentsModule } from './shared/components/general-components.module';
import { PipesModule } from './shared/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    FormularioUsuarioComponent,
    UsuariosComponent,

  ],
  imports: [
    BrowserModule,//SOLO SE IMPORTA UNA VEZ AQUI EN ROOT MODULE
    BrowserAnimationsModule, // Se requiere el modulo de animaciones de angular, SOLO SE IMPORTA AQUI EN ROOT MODULE
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, //Agregando manualmente este modulo
    
    
    GeneralComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    SharedModule,
    GeneralComponentsModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
