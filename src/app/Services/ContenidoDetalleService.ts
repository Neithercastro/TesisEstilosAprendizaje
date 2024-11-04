import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface ContenidoDetalleDTO {
    idContenido: number;
  idMateria: number | null;
  idActividad: number | null;
  idEstiloAprendizaje: number | null;
  descripcion: string | null;
  materialApoyo1: string | null;
  materialApoyo2: string | null;
  nombreEstiloAprendizaje: string | null;
  nombreMateria: string | null;
  nombreActividad: string | null;
  }


  @Injectable({
    providedIn: 'root'
  })
  export class ContenidoDetalleService {
    constructor(private http: HttpClient) {}

    private apiUrl = 'https://localhost:7195/api/ContenidoDetalle';

    getContenidoDetalle( idActividad: number, idEstiloAprendizaje: number): Observable<ContenidoDetalleDTO[]>{
        
        return this.http.get<ContenidoDetalleDTO[]>(`${this.apiUrl}/${idActividad}/${idEstiloAprendizaje}`);
      }
  }
