import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';

interface UsuariosDTO {
  id: number;
  idestilos: number;
  usuario: string;
  contrasena: string;
  correo: string;
  nombre: string;
  nombreEstilo?: string;
  semestre?:  number | null;
  
}


@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    private apiUrl = 'https://estilosaprendizaje-cxakfkgcf7a2bvd2.canadacentral-01.azurewebsites.net//api/Usuario/Registrar'; // Cambia esto a tu URL real
  
    constructor(private http: HttpClient) { }

    ConvertJSON(UsuarioDTO: UsuariosDTO): Usuario {
      return {
        nombre: UsuarioDTO.nombre,
        correo: UsuarioDTO.correo,
        usuario: UsuarioDTO.usuario,
        contrasena: UsuarioDTO.contrasena,
        id: UsuarioDTO.id,
        idestilos: UsuarioDTO.idestilos,
        nombreEstilo: UsuarioDTO.nombreEstilo,
        semestre: UsuarioDTO.semestre
      };
    }
  
    Registrar(respuestas: Usuario): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, respuestas);
    }

    Buscar(UsuarioUsuarios: string): Observable<Usuario> {
      return this.http.get<Usuario>(`https://estilosaprendizaje-cxakfkgcf7a2bvd2.canadacentral-01.azurewebsites.net//api/Usuario/Buscar?UsuarioUsuarios=${UsuarioUsuarios}`)
      .pipe(map((usuarioDTO: UsuariosDTO) => this.ConvertJSON(usuarioDTO)));
    }
  
    
  }

  