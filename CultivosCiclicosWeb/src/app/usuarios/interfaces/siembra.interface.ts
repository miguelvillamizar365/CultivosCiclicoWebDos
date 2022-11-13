
export interface Siembra {
    id:                     number;
    areaSiembraId:          number;
    areaMuestraId:          number;
    areaMuestraNombre?:     string;
    variedadId:             number;
    variedadNombre?:        string;
    estadoId:               number;
    estadoNombre?:          string;
    fechaRegistroSiembra:   Date;
    usuario:                string;
    observaciones:          string;
    cantidad:               number;
    actividadId:            number;
    actividad_Nombre:       string;
}