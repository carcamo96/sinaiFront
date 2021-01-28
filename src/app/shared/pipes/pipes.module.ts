import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcularEdad } from './calcularEdad.pipe';
import { FechaFormat } from './fechaFormat.pipe';
import { TelefonoFormat } from './telefonoFormat.pipe';
import { FechaRegistroFormat } from './fechaRegistroFormat.pipe';
import { SubstrEstudio } from './substrEstudio.pipe';



@NgModule({
  declarations: [
    CalcularEdad,
    FechaFormat,
    TelefonoFormat,
    FechaRegistroFormat,
    SubstrEstudio,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalcularEdad,
    FechaFormat,
    TelefonoFormat,
    FechaRegistroFormat,
    SubstrEstudio,
  ]
})
export class PipesModule { }
