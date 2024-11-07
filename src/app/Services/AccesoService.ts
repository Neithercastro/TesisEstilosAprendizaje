import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Verificacion } from '../Models/Verificacion';
import { Credenciales } from '../Models/Credenciales';


@Injectable({
    providedIn: 'root'
  })
  export class AccesoService {
    
    private apiUrl = 'https://estilosaprendizaje-cxakfkgcf7a2bvd2.canadacentral-01.azurewebsites.net/api/Usuario/Validar';
    constructor(private http: HttpClient) { }
  
    Miembro(respuestas: Credenciales): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, respuestas);
      }
  }