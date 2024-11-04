import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActividadesComponent } from './Pantallas/actividades/actividades.component';
import { ActividadesDetallesComponent } from './Pantallas/actividades-detalles/actividades-detalles.component';
import { CuestionarioComponent } from './Pantallas/cuestionario/cuestionario.component';
import { LoginComponent } from './Pantallas/login/login.component';
import { RegisterComponent } from './Pantallas/register/register.component';
import { FooterComponent } from './Utilidades/footer/footer.component';
import { NavbarComponent } from './Utilidades/navbar/navbar.component';
import { HomeComponent } from './Pantallas/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ActividadesComponent,
    ActividadesDetallesComponent,
    CuestionarioComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
