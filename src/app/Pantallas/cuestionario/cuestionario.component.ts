// cuestionario.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { CuestionarioService } from 'src/app/Services/cuestionario';
import { UserResponse } from 'src/app/Models/UserResponse';
import { UsuarioService } from 'src/app/Services/UsuarioService';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { Usuario } from 'src/app/Models/Usuario';
import { ActivatedRoute } from '@angular/router';
import { AccesoService } from 'src/app/Services/AccesoService';
import { Credenciales } from 'src/app/Models/Credenciales';

interface Respuesta {
  texto: string;
  valor: string;
}

interface Pregunta {
  enunciado: string;
  respuestas: Respuesta[];
}

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  cuestionarioForm!: FormGroup;
  usuario: string | null = null;
  token: string = "";
  

  // Define tus preguntas y respuestas aquí (adaptar según tus necesidades)
  preguntas: Pregunta[] = [
    ///////////////// PREGUNTA1 /////////////////////
    {
      enunciado: 'Usted cocinará algo especial para su familia. Usted haría:',
      respuestas: [
        {texto:'Preguntar a amigos por sugerencias.', valor : "Auditivo"},
        { texto: 'Dar una vista al recetario por ideas de las fotos.', valor: 'Visual' },
        { texto: 'Usar un libro de cocina donde usted sabe hay una buena receta.', valor: 'Textual' },
        { texto: 'Cocinar algo que usted sabe sin la necesidad de instrucciones.', valor: 'Kinestesico' }
      ]
    },
    ///////////////////// PREGUNTA 2 ///////////////////////////
    {
      enunciado: 'Usted escogerá alimento en un restaurante o un café. Usted haría:',
      respuestas: [
        {texto:'Escuchar al mesero o pedir que amigos recomienden opciones.', valor : "Auditivo"},
        {texto:'Mirar lo qué otros comen o mirar dibujos de cada platillo.', valor : "Visual"},
        {texto:'Escoger de las descripciones en el menú.', valor : "Textual"},
        {texto:'Escoger algo que tienes o has tenido antes.', valor : "Kinestesico"}
      ]
    },
    //////////////////////// PREGUNTA 3 //////////////////////////
    {
      enunciado: 'Aparte del precio, qué más te influenciaría para comprar un libro de ciencia ficción',
      respuestas: [
        {texto:'Un amigo habla acerca de él y te lo recomienda.', valor : "Auditivo"},
        {texto:'Tienes historias reales, experiencias y ejemplos.', valor : "Kinestesico"},
        {texto:'Leyendo rápidamente partes de él.', valor : "Textual"},
        {texto:'El diseño de la pasta es atractivo.', valor : "Visual"}
      ]
    },
    ///////////////////////// PREGUNTA 4 //////////////////////////////
    {
      enunciado: 'Usted ha terminado una competencia o un examen y le gustaría tener alguna retroalimentación. Te gustaría retroalimentarte:',
      respuestas: [
        {texto:'Usando descripciones escritas de los resultados.', valor : "Textual"},
        {texto:'Usando ejemplos de lo que usted ha hecho.', valor : "Kinestesico"},
        {texto:'Usando gráficos que muestran lo que usted ha logrado.', valor : "Visual"},
        {texto:'De alguien que habla por usted.', valor : "Auditivo"}
      ]
    },
    ///////////////////////////////PREGUNTA 5 //////////////////////////
    {
      enunciado: 'Usted tiene un problema con la rodilla. Usted preferiría que el doctor:',
      respuestas: [
        {texto:'Use un modelo de plástico y te enseñe lo que está mal.', valor : "Kinestesico"},
        {texto:'Te de una página de internet o algo para leer.', valor : "Textual"},
        {texto:'Te describa lo qué está mal.', valor : "Auditivo"},
        {texto:'Te enseñe un diagrama lo que está mal.', valor : "Visual"}
      ]
    },
    //////////////////////////// PTRGUNTA 6 ////////////////////////////////
    {
      enunciado: 'Usted está a punto de comprar una cámara digital o teléfono o móvil. ¿Aparte del precio qué más influirá en tomar tu decisión?',
      respuestas: [
        {texto:'Probándolo.', valor : "Kinestesico"},
        {texto:'Es un diseño moderno y se mira bien.', valor : "Visual"},
        {texto:'Leer los detalles acerca de sus características.', valor : "Textual"},
        {texto:'El vendedor me informa acerca de sus características.', valor : "Auditivo"}
      ]
    },
    ///////////////////////////// PREGUNTA 7 ////////////////////////////
    {
      enunciado: 'Usted no está seguro como se deletrea trascendente o tracendente ¿Usted qué haría?',
      respuestas: [
        {texto:'Escribir ambas palabras en un papel y escojo una.', valor : "Kinestesico"},
        {texto:'Pienso cómo suena cada palabra y escojo una.', valor : "Auditivo"},
        {texto:'Busco la palabra en un diccionario', valor : "Textual"},
        {texto:'Veo la palabra en mi mente y escojo según como la veo.', valor : "Visual"}
      ]
    },
    //////////////////////////// PREGUNTA 8 ///////////////////////////
    {
      enunciado: 'Me gustan páginas de Internet que tienen:',
      respuestas: [
        {texto:'Interesantes descripciones escritas, listas y explicaciones.', valor : "Textual"},
        {texto:'Diseño interesante y características visuales.', valor : "Visual"},
        {texto:'Cosas que con un click pueda cambiar o examinar.', valor : "Kinestesico"},
        {texto:'Canales donde puedo oír música, programas de radio o entrevistas.', valor : "Auditivo"}
      ]
    },
    ///////////////// PREGUNTA 9 /////////////////////
    {
      enunciado: 'Usted está planeando unas vacaciones para un grupo. Usted quiere alguna observación de ellos acerca del plan. Usted qué haría:',
      respuestas: [
        {texto:'Usa un mapa o página de Internet para mostrarles los lugares.', valor : "Visual"},
        {texto:'Describe algunos de los puntos sobresalientes.', valor : "Auditivo"},
        {texto:'Darles una copia del itinerario impreso.', valor : "Textual"},
        {texto:'Llamarles por teléfono o mandar mensaje por correo electrónico', valor : "Kinestesico"}
      ]
    },
    ///////////////////// PREGUNTA 10 ///////////////////////////
    {
      enunciado: 'Usted está usando un libro, disco compacto o página de Internet para aprender a tomar fotos con su cámara digital nueva. Usted le gustaría tener:',
      respuestas: [
        {texto:'Una oportunidad de hacer preguntas acerca de la cámara y sus características.', valor : "Auditivo"},
        {texto:'Esquemas o diagramas que muestran la cámara y la función de cada parte.', valor : "Visual"},
        {texto:'Ejemplos de buenas y malas fotos y cómo mejorarlas.', valor : "Kinestesico"},
        {texto:'Aclarar las instrucciones escritas con listas y puntos sobre qué hacer.', valor : "Textual"}
      ]
    },
    //////////////////////// PREGUNTA 11 //////////////////////////
    {
      enunciado: 'Usted quiere aprender un programa nuevo, habilidad o juego en una computadora. Usted qué hace:',
      respuestas: [
        {texto:'Hablar con gente que sabe acerca del programa.', valor : "Auditivo"},
        {texto:'Leer las instrucciones que vienen en el programa.', valor : "Textual"},
        {texto:'Seguir los esquemas en el libro que acompaña el programa.', valor : "Visual"},
        {texto:'Use los controles o el teclado.', valor : "Kinestesico"}
      ]
    },
    ///////////////////////// PREGUNTA 12 //////////////////////////////
    {
      enunciado: 'Estás ayudando a alguien que quiere a ir al aeropuerto, al centro del pueblo o la estación del ferrocarril. Usted hace:',
      respuestas: [
        {texto:'Va con la persona.', valor : "Kinestesico"},
        {texto:'Anote las direcciones en un papel (sin mapa).', valor : "Textual"},
        {texto:'Les dice las direcciones.', valor : "Auditivo"},
        {texto:'Les dibuja un croquis o les da un mapa.', valor : "Visual"}
      ]
    },
    ///////////////////////////////PREGUNTA 13 //////////////////////////
    {
      enunciado: 'Recuerde un momento en su vida en que Ud. aprendió a hacer algo nuevo. Trate de evitar escoger una destreza física, como andar en bicicleta. Ud. Aprendió mejor:',
      respuestas: [
        {texto:'Viendo una demostración.', valor : "Kinestesico"},
        {texto:'Con instrucciones escritas, en un manual o libro de texto.', valor : "Textual"},
        {texto:'Escuchando a alguien explicarlo o haciendo preguntas.', valor : "Auditivo"},
        {texto:'Con esquemas y diagramas o pistas visuales.', valor : "Visual"}
      ]
    },
    //////////////////////////// PREGUNTA 14 ////////////////////////////////
    {
      enunciado: 'Ud. Prefiere que un maestro o conferencista que use:',
      respuestas: [
        {texto:'Demostraciones, modelos o sesiones prácticas.', valor : "Kinestesico"},
        {texto:'Folletos, libros o lecturas.', valor : "Textual"},
        {texto:'Diagramas, esquemas o gráficos.', valor : "Visual"},
        {texto:'Preguntas y respuestas, pláticas y oradores invitados.', valor : "Auditivo"}
      ]
    },
    ///////////////////////////// PREGUNTA 15 ////////////////////////////
    {
      enunciado: 'Un grupo de turistas quiere aprender acerca de parques o reservas naturales en su área. Usted:',
      respuestas: [
        {texto:'Los acompaña a un parque o reserva natural.', valor : "Kinestesico"},
        {texto:'Les da un libro o folleto acerca de parques o reservas naturales.', valor : "Textual"},
        {texto:'Les da una plática acerca de parques o reservas naturales', valor : "Auditivo"},
        {texto:'Les muestra imágenes de Internet, fotos o libros con dibujos.', valor : "Visual"}
      ]
    },
    //////////////////////////// PREGUNTA 16 ///////////////////////////
    {
      enunciado: 'Usted tiene que hacer un discurso para una conferencia u ocasión especial. Usted hace:',
      respuestas: [
        {texto:'Escribir el discurso y aprendérselo leyéndolo varias veces', valor : "Textual"},
        {texto:'Reunir muchos ejemplos e historias para hacer el discurso verdadero y práctico.', valor : "Kinestesico"},
        {texto:'Escribir algunas palabras claves y practicar el discurso repetidas veces.', valor : "Auditivo"},
        {texto:'Hacer diagramas o esquemas que te ayuden a explicar las cosas.', valor : "Visual"}
      ]
    },

  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cuestionarioService: CuestionarioService,
    private UsuarioService: UsuarioService,
    private Acceso: AccesoService,
    public Globales: GlobalesService

  ) {
    this.crearFormulario();
  }

  DatosFormulario: Credenciales ={
    Usuario: '',
    Contrasena: ''
  };

  nombreEstilo: string = "";
  user: string = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['Usuario']; // Extraemos el parámetro 'Usuario'
      if (this.usuario) {
        this.buscarUsuario(this.usuario);
      } else {
        console.error('El usuario es null');
      }
    });
  }

   

  buscarUsuario(usuario: string): void {
    this.UsuarioService.Buscar(usuario).subscribe({
      next: (usuarioData) => {
        // Aquí puedes usar usuarioData
        console.log(usuarioData);
        // Acceder al ID como usuarioData.id
      },
      error: (error) => {
        console.error('Error al buscar el usuario:', error);
      }
    });
  }


  
  crearFormulario(): void {
    this.cuestionarioForm = this.fb.group({
      preguntas: this.fb.array(this.preguntas.map(() => this.fb.array([])))
    });
  }

  get preguntasFormArray(): FormArray {
    return this.cuestionarioForm.get('preguntas') as FormArray;
  }

  onCheckboxChange(event: any, preguntaIndex: number, valor: string): void {
    const respuestasArray = this.preguntasFormArray.at(preguntaIndex) as FormArray;

    if (event.target.checked) {
      respuestasArray.push(new FormControl(valor));
    } else {
      const index = respuestasArray.controls.findIndex(x => x.value === valor);
      respuestasArray.removeAt(index);
    }
  }

  // Función para verificar si todas las preguntas están respondidas
  /*
  todasLasPreguntasRespondidas(): boolean {
    return this.preguntasFormArray.controls.every((formArray: AbstractControl) => {
      const formArrayTyped = formArray as FormArray;
      return formArrayTyped.controls.length > 0;  // Verifica que haya al menos una respuesta
    });
  }*/
    todasLasPreguntasRespondidas(): boolean {
      const todasRespondidas = this.preguntasFormArray.controls.every((formArray: AbstractControl) => {
        const formArrayTyped = formArray as FormArray;
        return formArrayTyped.controls.length > 0; // Verifica que haya al menos una respuesta
      });
    
      //console.log('Todas las preguntas respondidas:', todasRespondidas);
      return todasRespondidas;
    }
    
    guardarRespuestas(): void {
      const respuestas = this.preguntasFormArray.controls.map((formArray: AbstractControl) => {
        const formArrayTyped = formArray as FormArray;
        return formArrayTyped.controls.map(control => control.value);
      }).flat();

    this.UsuarioService.Buscar(this.Globales.Usuario()!)
  .subscribe({
    next: (usuario) => {
      // Creamos el objeto userResponse utilizando el ID del usuario obtenido
      const userResponse: UserResponse = {
        usuarioId: usuario.id,  // Utiliza el ID real del usuario
        respuestas: respuestas
      };

      console.log(userResponse);

      this.cuestionarioService.enviarRespuestas(userResponse).subscribe({
        next: response => {
          console.log('Respuesta del servidor:', response);

          // Guardar el estilo de aprendizaje y la bandera en localStorage
          const estiloAprendizaje = response.estilo;
          const Token = response.token;
          localStorage.setItem('Estilo', estiloAprendizaje);
          localStorage.setItem('Token', Token);
          localStorage.setItem('fromCuestionario', 'true');

          location.href = '/Home'; // Redirigir a la página de inicio
        },
        error: error => {
          console.error('Error al enviar las respuestas:', error);
        }
      });
    },
    error: error => {
      console.error('Error al buscar el usuario:', error);
    }
  });

  }}