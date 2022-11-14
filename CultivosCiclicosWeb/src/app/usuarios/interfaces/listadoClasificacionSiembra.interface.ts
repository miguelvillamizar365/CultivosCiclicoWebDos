export interface ListaClasificacion {
    id:                 number;
    areaMuestraId:     number;
    areaMuestraNombre: string;
    calidadId:         string;
    calidadNombre:     string;
    cantidad:           Date;
    usuario:            string;
    fechaRegistro:      Date;
    variedadId:        number;
    variedadNombre:    string;
    observaciones:      string;
    estadoId:          number;
    estadoNombre:      string;
    areaSiembraId:     number; 
    areaSiembraNombre: string;
}