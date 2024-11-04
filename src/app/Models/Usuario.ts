export interface Usuario{
    usuario: string;
    correo: string;
    contrasena: string;
    nombre: string;
    id: number;
    idestilos: number;
    nombreEstilo?: string;
    semestre?: number | null;
}