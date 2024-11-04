import { Component, OnInit } from '@angular/core';
import { Credenciales } from 'src/app/Models/Credenciales';
import { AccesoService } from 'src/app/Services/AccesoService';
import { GlobalesService } from 'src/app/Services/GlobalesServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Exito: boolean = true;
  private Permiso: string = "";

  DatosFormulario: Credenciales ={
    Usuario: '',
    Contrasena: ''
  };
  router: any;
  

  constructor(
    private Acceso: AccesoService,
    public Globales: GlobalesService
  ){}

  ngOnInit(): void {
     if (this.Globales.Token() != null) {
    
  }
  }

  Logearse (){
    this.Acceso.Miembro(this.DatosFormulario)
    .subscribe(
      {
        next: Respuesta => {
          if (Respuesta != null) {
            if(Respuesta.toString() == "Sin confirmar") {
              this.Exito = true;
              this.Globales.IniciarSesion(Respuesta.toString(), this.Permiso, this.DatosFormulario.Usuario) 
              location.href = `/Cuestionario?Usuario=${this.DatosFormulario.Usuario}`;
            }
            else {
              this.Exito = true;
              this.Globales.IniciarSesion(Respuesta.toString(), this.Permiso, this.DatosFormulario.Usuario) 
              location.href = '/Home';
            }
          }
        },
        error: Error => this.DenegarAcceso()
        
      }
    );
}

DenegarAcceso() {
  this.Exito = false;
}

  }

