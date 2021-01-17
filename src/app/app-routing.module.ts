import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./shared/pages/admin-home/admin-home.module').then( m => m.AdminHomeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//Se cambió a forRoot porque es el routing principal
  exports: [RouterModule]
})
export class AppRoutingModule { }
