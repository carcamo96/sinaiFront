//importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales les quiero hacer una paina exclusiva
import { AgregarComponent } from './components/activoFijo/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';




// Array de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'registrarPaciente', component: FormularioPacienteComponent},
    {path: 'agregar', component: AgregarComponent}
   
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);