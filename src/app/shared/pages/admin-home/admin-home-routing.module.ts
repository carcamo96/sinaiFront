import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';


const routes: Routes = [

  {
    path: '',
    component: AdminHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomeModule)
      },
      {
        path: 'registrarPaciente',
        loadChildren: () => import('../../../moduloConsulta/pacientes/pages/formulario-paciente/formulario-pacientes.module').then( m => m.FormularioPacientesModule)
      },
      {
        path: 'expedientes',
        loadChildren: () => import('../../../moduloConsulta/pacientes/pages/expedientes/expedientes.module').then( m => m.ExpedientesModule )
      },
      {
        path: 'consulta/:id',
        loadChildren: () => import('../../../moduloConsulta/consulta/pages/consulta/consulta.module').then(m => m.ConsultaModule)
      }

    ]
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
