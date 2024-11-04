import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Materia } from '../Models/Materia';

export interface MateriaDetalleDTO {
    id: number;
    idmateria: number;
    nombreactivdad: string;
    nombremateria: string;
  }

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
  export class MateriaService {
    
    private apiUrl = 'https://localhost:7195/api/Materias/semestre';
    constructor(private http: HttpClient) { }
  
    ObtnerMateriaSemestre(semestre: number): Observable<Materia[]> {
        return this.http.get<Materia[]>(`${this.apiUrl}?semestre=${semestre}`);
      }

      getMateriasDetalle(id: number): Observable<MateriaDetalleDTO[]> {
        return this.http.get<MateriaDetalleDTO[]>(`https://localhost:7195/api/Materias/${id}`);
      }

      getContenidoDetalle( idestilos: number,idActividad: number,): Observable<ContenidoDetalleDTO>{
        return this.http.get<ContenidoDetalleDTO>(`https://localhost:7195/api/ContenidoDetalle/${idestilos}/${idActividad}`);
      }
  }