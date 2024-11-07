import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { UsuarioService } from 'src/app/Services/UsuarioService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(public Globales: GlobalesService,
    private router: Router
  ){}

  ngOnInit() {
   this.Globales.ObtenerEstilo();
   this.Globales.Token();
   this.Globales.Usuario();
  }

  cerrarSesion() {
    this.Globales.CerrarSesion(); // Llama a la función del servicio
  }

  getEstiloColor(): string {
    switch (this.Globales.ObtenerEstilo()) {
      case 'Visual':
        return 'visual-color'; // Azul
      case 'Auditivo':
        return 'auditivo-color'; // Amarillo
      case 'Textual':
        return 'lector-escritor-color'; // Púrpura
      case 'Kinestesico':
        return 'kinestesico-color'; // Verde
      default:
        return ''; // Clase por defecto si no se encuentra el estilo
    }
  }
  
   // Función para regresar a la página anterior
   regresar() {
    // Verifica si la ruta actual es '/Home'
    if (this.router.url !== '/Home') {
      // Si no estamos en la página Home, regresa a la página anterior
      window.history.back();
    }
  }


}
