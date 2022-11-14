export interface ListaClasificacion {
    id:                 number;
    areaMuestra_Id:     number;
    areaMuestra_Nombre: string;
    calidad_Id:         string;
    calidad_Nombre:     string;
    cantidad:           Date;
    usuario:            string;
    fechaRegistro:      Date;
    variedad_Id:        number;
    variedad_Nombre:    string;
    observaciones:      string;
}