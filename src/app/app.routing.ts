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
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';




// Array de rutas
const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {
        path: 'admin',
        component: AdminHomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {path: 'home', component: HomeComponent},
            {path: 'registrarPaciente', component: FormularioPacienteComponent},
            {path: 'expedientes', component: ExpedientesComponent},
            {path: 'expedientes/expediente/:id', component: ExpedienteComponent},
            {path: 'mostrarPaciente', component: MostrarPacienteComponent},
            {path: 'consultas/:id', component: ConsultaComponent},
            {path: 'consulta/:id/:idp', component: MostrarConsultaComponent},
            {path: 'registrarUsuario', component: FormularioUsuarioComponent}
        ]
    },
    {path:'login', component: LoginComponent},
    {path: 'usuario', component: UsuarioComponent},
    /*{path: 'home', component: HomeComponent},
    {path: 'mostrarPaciente', component: MostrarPacienteComponent},
    {path: 'expedientes/expediente/:id', component: ExpedienteComponent},
    {path: 'expedientes', component: ExpedientesComponent},
    {path: 'consulta', component: ConsultaComponent},
    {path: 'consultas/:id', component: ConsultaComponent},
    {path: 'consulta/:id/:idp', component: MostrarConsultaComponent},*/
   
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);