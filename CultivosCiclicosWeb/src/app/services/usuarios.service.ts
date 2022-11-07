import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../usuarios/interfaces/rol.interface';
import { TipoDocumento } from '../usuarios/interfaces/tipodocumento.interface';
import { Usuario } from '../usuarios/interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetRoles: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodosRoles`;
  private urlGetTiposDocumentos : string = `${this.baseUrl}api/ListasGenericas/ObtenerTodosTiposDocumentos`;
  private urlGetUsuarios : string = `${this.baseUrl}api/Usuarios`;
  private urlGetUsuarioPorId : string = `${this.baseUrl}api/Usuarios/${0}`;
  private urlGetSugerencias : string = this.baseUrl + "api/Usuarios/GetByName?userName=";
  private urlAgregarUsuario : string = `${this.baseUrl}api/Usuarios`;
  private urlActualizarUsuario : string = `${this.baseUrl}api/Usuarios/Actualizar?id=${0}`;
  private urlBorrarUsuario: string = `${this.baseUrl}api/Usuarios/Eliminar?id=${0}`;
  

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }
  getRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>( this.urlGetRoles, { headers: this.headers});
  }
  
  getTiposDocumentos(): Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(this.urlGetTiposDocumentos, { headers: this.headers});
  }
  
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlGetUsuarios, { headers: this.headers});
  }

  getUsuarioPorId(id: number):Observable<Usuario> {
    return this.http.get<Usuario>( this.urlGetUsuarioPorId + id, { headers: this.headers});
  }

  getSugerencias(termino: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>( this.urlGetSugerencias + termino, { headers: this.headers});
  }

  agregarUsuario(Usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>( this.urlAgregarUsuario, Usuario, { headers: this.headers});
  }
  
  actualizarUsuario(Usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlActualizarUsuario + Usuario.id, Usuario, { headers: this.headers});
  }

  borrarUsuario(id: number): Observable<any>{
    return this.http.post<Usuario>( this.urlBorrarUsuario + id, id, { headers: this.headers});
  }

}
