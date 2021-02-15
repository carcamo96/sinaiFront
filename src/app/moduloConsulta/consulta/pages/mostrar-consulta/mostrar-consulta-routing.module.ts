import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarConsultaComponent } from './mostrar-consulta.component';


const routes: Routes = [
  {
    path: '',
    component: MostrarConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MostrarConsultaRoutingModule { }
