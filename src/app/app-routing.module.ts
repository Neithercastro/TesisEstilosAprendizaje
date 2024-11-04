import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pantallas/login/login.component';
import { ActividadesComponent } from './Pantallas/actividades/actividades.component';
import { ActividadesDetallesComponent } from './Pantallas/actividades-detalles/actividades-detalles.component';
import { CuestionarioComponent } from './Pantallas/cuestionario/cuestionario.component';
import { HomeComponent } from './Pantallas/home/home.component';
import { RegisterComponent } from './Pantallas/register/register.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegisterComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Actividades/:id', component: ActividadesComponent},
  {path: 'ActDetalle/:id', component: ActividadesDetallesComponent},
  {path: 'Cuestionario', component: CuestionarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
