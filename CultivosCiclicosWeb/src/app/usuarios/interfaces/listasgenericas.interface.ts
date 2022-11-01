import { Rol } from "./rol.interface";
import { TipoDocumento } from "./tipodocumento.interface";
import { Empresa } from './empresa.interface';

export interface ListasGenericas {
    listaRoles:         Rol[];
    listaTipoDocumento: TipoDocumento[];
    listaEmpresas:      Empresa[];
}