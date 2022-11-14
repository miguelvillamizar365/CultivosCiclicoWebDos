export interface Seguimientofenologico {
    id:                     number;
    areaSiembraId:          number;
    areaSiembraNombre:      string;
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
export interface SeguimientofenologicoResult {
    id:                     number;
    actividad_Id:           number;
    actividad_Nombre?:      string;
    estado_Id:              number;
    estado_Nombre?:         string;
    areaMuestra_Id:         number;
    areaMuestra_Nombre?:    string;
    variedad_Id:            number;
    variedad_Nombre?:       string;
    calidad_Id:             number;
    calidad_Nombre?:        string;
    observaciones:          string;
    usuario:                string;
    fechaRegistro:          Date;
}