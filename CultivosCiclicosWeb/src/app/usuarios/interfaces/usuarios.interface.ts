

export interface Usuario {
    id?:                    number;
    nombreCompleto:         string;
    nombre:                 string;
    apellido:               string;
    correo:                 string;
    rol:                    Roles;
    rol_Id:                 Roles;
    tipoDocumento:          TipoDocumentos;
    tipDoc_Id:              TipoDocumentos;
    estado:                 number;
    numeroIdentificacion:   string;
    contrasenia:            string;
    empresa_Id:             number;
}

export enum Roles{
    Administrador = "1",
    AsesorCultivo ="2",
    AuxiliarCultivo = "3",
    AsesorCalidad = "4",
    AsesorComercial = "5"
}

export enum Estados{
    Activo = "1",
    Inactivo ="2"
}
export enum TipoDocumentos{
CedulaExtranjeria = "1",
NumeroIdentificaciónPersonal = "2",
NumeroIdentificaciónTributaria = "3",
TarjetaIdentidad = "4"
}

export interface UsuarioAuth{
    correo: string,
    Contrasenia: string   
}