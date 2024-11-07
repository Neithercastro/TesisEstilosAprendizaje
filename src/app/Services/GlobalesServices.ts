import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalesService {

  constructor(private router: Router) {}


    // Función para iniciar sesión y guardar los datos en localStorage
    IniciarSesion(Token: string, Estilo: string, Usuario: string) {
      localStorage.setItem('Token', Token);
      localStorage.setItem('Estilo', Estilo);
      localStorage.setItem('Usuario', Usuario);
    }
    
    // Función para cerrar sesión y redirigir a Login
    CerrarSesion() {
      localStorage.removeItem('Token');
      localStorage.removeItem('Estilo');
      localStorage.removeItem('Usuario');
      this.router.navigate(['/Login']);  // Usamos router.navigate para redirigir sin recargar la página
    }
  

  Token() {
    return localStorage.getItem('Token');
  }

  Permiso() {
    return localStorage.getItem('Permiso');
  }

  Usuario() {
    return localStorage.getItem('Usuario');
  }

  GuardarEstilo(estilo: string) {
    localStorage.setItem('Estilo', estilo);
  }

  ObtenerEstilo(): string | null {
    return localStorage.getItem('Estilo');
  }

  TieneEstiloAsignado(): boolean {
    return this.ObtenerEstilo() !== null;
  }
}
