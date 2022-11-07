

export interface Actividades {
    id?: number;
    nombre: string;
    estadoId: number;
    estadoNombre: string;
    observaciones: string;
    descripcion: string;
    fechaActividad: Date;
    usuario_Id: number;
    nombreUsuario: string;
    tipoActividad_Id: number;
    tipoActividadNombre: string;
}
