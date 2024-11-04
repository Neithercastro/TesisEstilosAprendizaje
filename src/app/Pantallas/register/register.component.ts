import { Component,OnInit} from '@angular/core';
import { concat, concatMap, map } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';
import { Verificacion } from 'src/app/Models/Verificacion';
import  {UsuarioService} from 'src/app/Services/UsuarioService'
import { VerificacionService } from 'src/app/Services/VerificacionService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  DatosFormulario: Usuario = {
    usuario: '',
    correo: '',
    contrasena: '',
    nombre: '',
    id: 0,
    idestilos: 5,
    nombreEstilo: '',
    semestre: null
  };


  constructor(
    private user: UsuarioService,
    private verificaciones: VerificacionService
  ){}

  //Array.from({ length: 3 }, (_, i) => i + 1);

  semestres: number[] = [3, 5, 7];

  Registrarse(){
    this.user.Registrar(this.DatosFormulario).pipe(
      concatMap(
        (Verificar) => {
          let Verificacion: Verificacion = {
            usuario: this.DatosFormulario.usuario,
            permiso:'Miembro'
          }
          return this.verificaciones.Registrar(Verificacion)
          
        }
      )
    )
    .subscribe(
      response => {
        console.log('Registro exitoso', response);
        location.href = '/Login';
       
      },
      error => {
        console.error('Error en el registro', error);
        
      }
    );
  }
}
