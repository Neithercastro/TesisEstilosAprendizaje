import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { ContenidoDetalleDTO, ContenidoDetalleService } from 'src/app/Services/ContenidoDetalleService';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { UsuarioService } from 'src/app/Services/UsuarioService';

@Component({
  selector: 'app-actividades-detalles',
  templateUrl: './actividades-detalles.component.html',
  styleUrls: ['./actividades-detalles.component.css']
})
export class ActividadesDetallesComponent implements OnInit{
  idActividad!: number;
  usuario!: Usuario;
  contenido: ContenidoDetalleDTO [] = [];
  


  constructor(
    private route: ActivatedRoute,
    public Globales: GlobalesService,
    private Usuarios: UsuarioService,
    private contenidoService: ContenidoDetalleService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idActividad = +params.get('id')!; // Obtén el ID de la actividad
      console.log(this.idActividad); // ID de la actividad obtenido

      const usuarioNombre = this.Globales?.Usuario(); // Obtén el nombre del usuario

      if (usuarioNombre) {
        this.obtenerUsuario(usuarioNombre);
      } else {
        console.error('El nombre del usuario es null. No se puede hacer la solicitud.');
      }
    });
  }
  obtenerUsuario(nombre: string) {
    this.Usuarios.Buscar(nombre).subscribe(
      (data: Usuario) => {
        this.usuario = data;
        console.log(this.usuario); // Verifica si obtuviste el usuario correctamente

        if (this.usuario.idestilos) {
          this.obtenerContenido(this.idActividad!, this.usuario.idestilos);
        } else {
          console.error('El idestilos del usuario es null. No se puede hacer la solicitud.');
        }
      },
      error => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  obtenerContenido(idActividad: number, idEstilo: number) {
    this.contenidoService.getContenidoDetalle(idActividad, idEstilo).subscribe(
      (data: ContenidoDetalleDTO[]) => {
        this.contenido = data;
      
        console.log('Contenido obtenido:', this.contenido);
      },
      error => {
        console.error('Error al obtener el contenido', error);
       
      }
    );
  }
  }


    


