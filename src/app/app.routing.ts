//importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales les quiero hacer una paina exclusiva
import { AgregarComponent } from './components/activoFijo/agregar/agregar.component';




// Array de rutas
const appRoutes: Routes = [
    {path: 'agregar', component: AgregarComponent}
   
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);