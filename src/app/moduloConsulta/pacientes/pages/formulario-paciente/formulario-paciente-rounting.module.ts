import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPacienteComponent } from './formulario-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: FormularioPacienteComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FormularioPacienteRountingModule { }
