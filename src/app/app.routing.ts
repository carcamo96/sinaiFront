//importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales les quiero hacer una paina exclusiva
import { AgregarComponent } from './components/activoFijo/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';
import { FormularioPacienteComponent } from './pages/formulario-paciente/formulario-paciente.component';
import { MostrarPacienteComponent } from './pages/mostrar-paciente/mostrar-paciente.component';
import { ExpedienteComponent } from './pages/expediente/expediente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExpedientesComponent } from './pages/expedientes/expedientes.component';
import { MostrarConsultaComponent } from './pages/mostrar-consulta/mostrar-consulta.component';




// Array de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'registrarPaciente', component: FormularioPacienteComponent},
    {path: 'mostrarPaciente', component: MostrarPacienteComponent},
    {path: 'expedientes/expediente/:id', component: ExpedienteComponent},
    {path: 'expedientes', component: ExpedientesComponent},
    {path: 'consulta', component: ConsultaComponent},
    {path: 'consultas/:id', component: ConsultaComponent},
    {path: 'consulta/:id', component: MostrarConsultaComponent},
    {path: 'agregar', component: AgregarComponent},
   
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);