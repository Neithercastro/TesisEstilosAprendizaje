import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalesService {
  IniciarSesion(Token: string, Permiso: string, Usuario: string) {
    localStorage.setItem('Token', Token);
    localStorage.setItem('Permiso', Permiso);
    localStorage.setItem('Usuario', Usuario);
  }

  CerrarSesion() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Permiso');
    localStorage.removeItem('Usuario');
    location.href = '/Login';
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
}
