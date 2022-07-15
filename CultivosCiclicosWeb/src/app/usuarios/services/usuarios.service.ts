import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}api/Usuarios`);
  }

  getUsuarioPorId(id: number):Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}api/Usuarios/${0}` + id);
  }

  getSugerencias(termino: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}api/Usuarios/GetByName?userName=${termino}`);
  }

  agregarUsuario(Usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}api/Usuarios`, Usuario);
  }
}
