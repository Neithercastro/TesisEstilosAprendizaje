import { Component, OnInit } from '@angular/core';
import { Credenciales } from 'src/app/Models/Credenciales';
import { AccesoService } from 'src/app/Services/AccesoService';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { UsuarioService } from 'src/app/Services/UsuarioService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Exito: boolean = true;
  private Estilo: string = "";

  DatosFormulario: Credenciales ={
    Usuario: '',
    Contrasena: ''
  };
  
  

  constructor(
    private Acceso: AccesoService,
    public Globales: GlobalesService, 
    private Usuario: UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {
     if (this.Globales.Token() != null) {
    
  }
  }

  Logearse (){
    this.Usuario.Buscar(this.DatosFormulario.Usuario)
    .subscribe({
      next: data => {
        if (data != null){
          this.Estilo = data.nombreEstilo!;
        }
      }
    });

    this.Acceso.Miembro(this.DatosFormulario)
    .subscribe(
      {
        next: Respuesta => {
          if (Respuesta != null) {
            if(Respuesta.toString() == "Sin confirmar") {
              this.Exito = true;
              this.Globales.IniciarSesion(Respuesta.toString(), this.Estilo, this.DatosFormulario.Usuario) 
              location.href = `/Cuestionario?Usuario=${this.DatosFormulario.Usuario}`;
            }
            else {
              this.Exito = true;
              

              this.Globales.IniciarSesion(Respuesta.toString(), this.Estilo, this.DatosFormulario.Usuario) 
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

