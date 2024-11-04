import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../Models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  private apiUrl = 'https://localhost:7195/api/EstiloAprendizaje'; // Cambia esto a tu URL real

  constructor(private http: HttpClient) { }

  enviarRespuestas(respuestas: UserResponse): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, respuestas);
  }
}
