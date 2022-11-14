import { Rol } from "./rol.interface";
import { TipoDocumento } from "./tipodocumento.interface";
import { Empresa } from './empresa.interface';
import { TipoActividad } from "./tipoActividad.interface";
import { AreaMuestra } from "./areamuestra.interface";
import { Variedad } from "./variedad.interface";
import { AreaSiembra } from "./areasiembra.interface";
import { Calidad } from './calidad.interface';

export interface ListasGenericas {
    listaRoles:         Rol[];
    listaTipoDocumento: TipoDocumento[];
    listaEmpresas:      Empresa[];
    listaTipoActividad: TipoActividad[];
    listaAreaMuestra:   AreaMuestra[];
    listaVariedad:      Variedad[];
    listaAreaSiembra:   AreaSiembra[];
    listaCalidad:       Calidad[];
}