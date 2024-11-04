import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/Models/Materia';
import { Usuario } from 'src/app/Models/Usuario';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { MateriaService } from 'src/app/Services/MateriaService';
import { UsuarioService } from 'src/app/Services/UsuarioService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario = {
    usuario: '',
    correo: '',
    contrasena: '',
    nombre: '',
    nombreEstilo: '',
    id: 0,
    idestilos: 0,
    semestre: 0
  };
  materias: Materia[] = [];
  

  constructor (
    public Globales: GlobalesService, 
    private materiaservice: MateriaService,
    private Usuarios: UsuarioService
  ){}


  ngOnInit() {
    this.cargarDatos();
  }

  

  cargarDatos() {
    const usuarioNombre = this.Globales?.Usuario();
    if (usuarioNombre) {
      this.obtenerUsuario(usuarioNombre);
    } else {
      console.error('El nombre del usuario es null. No se puede hacer la solicitud.');
    }
  }

  obtenerUsuario(nombre: string) {
    this.Usuarios.Buscar(nombre).subscribe(
      (data: Usuario) => {
        this.usuario = data;
        //console.log(this.usuario);
        if (this.usuario.semestre) {
          this.obtenerMaterias(this.usuario.semestre);
        } else {
          console.error('El semestre del usuario es null. No se puede hacer la solicitud.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  obtenerMaterias(semestre: number) {
    this.materiaservice.ObtnerMateriaSemestre(semestre).subscribe(
      (data: Materia[]) => {
        this.materias = data;
        console.log(this.materias);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }
}
