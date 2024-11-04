import { Component } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { UsuarioService } from 'src/app/Services/UsuarioService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

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



  constructor(public Globales: GlobalesService,
    private Usuarios: UsuarioService
  ){}

  ngOnInit() {
    this.obtenerUsuario();
  }
  obtenerUsuario() {
    const usuarioNombre = this.Globales!.Usuario(); // Obtén el nombre del usuario

  // Verificamos que usuarioNombre no sea null antes de llamar al servicio
  if (usuarioNombre) {
    this.Usuarios.Buscar(usuarioNombre).subscribe(
      (data: Usuario) => {
        this.usuario = data; // Almacena la respuesta en la variable 'usuario'
        //console.log(this.usuario);
        
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  } else {
    console.error('El nombre del usuario es null. No se puede hacer la solicitud.');
    // Aquí puedes manejar el caso en que no haya un usuario logueado, por ejemplo:
    // redireccionar a una página de login o mostrar un mensaje de error
  }

  }

  cerrarSesion() {
    this.Globales.CerrarSesion(); // Llama a la función del servicio
  }

  getEstiloColor(): string {
    switch (this.usuario.nombreEstilo) {
      case 'Visual':
        return 'visual-color'; // Azul
      case 'Auditivo':
        return 'auditivo-color'; // Amarillo
      case 'Textual':
        return 'lector-escritor-color'; // Púrpura
      case 'Kinestésico':
        return 'kinestesico-color'; // Verde
      default:
        return ''; // Clase por defecto si no se encuentra el estilo
    }
  }
  


}
