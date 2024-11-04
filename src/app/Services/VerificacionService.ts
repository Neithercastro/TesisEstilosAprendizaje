import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Verificacion } from '../Models/Verificacion';


@Injectable({
    providedIn: 'root'
  })
  export class VerificacionService {
    private apiUrl = 'https://localhost:7195/api/Verificacion/Registrar'; // Cambia esto a tu URL real
  
    constructor(private http: HttpClient) { }
  
    Registrar(respuestas: Verificacion): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, respuestas);
    }
  }