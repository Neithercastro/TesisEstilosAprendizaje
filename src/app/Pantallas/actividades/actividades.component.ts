import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { MateriaDetalleDTO, MateriaService } from 'src/app/Services/MateriaService';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit{
  materiasDetalle: MateriaDetalleDTO[] = [];

  constructor(private materiaService: MateriaService,
    private route: ActivatedRoute,
    public Globales: GlobalesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idMateria = Number(params.get('id'));
      if (!isNaN(idMateria)) {
        this.materiaService.getMateriasDetalle(idMateria).subscribe(
          (data: MateriaDetalleDTO[]) => {
            this.materiasDetalle = data;
            console.log(this.materiasDetalle);
          },
          (error) => {
          console.error('Error al obtener los detalles de la materia', error);
          }
        );
      } else {
        console.error('El ID de la materia no es un número válido.');
      }
    });
  }

  

}
