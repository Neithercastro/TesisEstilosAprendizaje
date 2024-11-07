import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pantallas/login/login.component';
import { ActividadesComponent } from './Pantallas/actividades/actividades.component';
import { ActividadesDetallesComponent } from './Pantallas/actividades-detalles/actividades-detalles.component';
import { CuestionarioComponent } from './Pantallas/cuestionario/cuestionario.component';
import { HomeComponent } from './Pantallas/home/home.component';
import { RegisterComponent } from './Pantallas/register/register.component';
import { AuthGuard } from './auth.guard';
import { EstiloAsignadoGuard } from './guards/estilo-asignado.guard';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegisterComponent},
  {path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'Actividades/:id', component: ActividadesComponent, canActivate: [AuthGuard]},
  {path: 'ActDetalle/:id', component: ActividadesDetallesComponent, canActivate: [AuthGuard]},
  {path: 'Cuestionario', component: CuestionarioComponent, canActivate: [AuthGuard,EstiloAsignadoGuard]},
  {path: '**', redirectTo: 'Login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
