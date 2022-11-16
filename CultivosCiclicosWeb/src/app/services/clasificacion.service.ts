import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaClasificacion } from '../usuarios/interfaces/listadoClasificacionSiembra.interface';

@Injectable({
  providedIn: 'root'
})

export class ClasificacionService {

  private baseUrl: string = environment.baseUrl;
  private headers;
  private urlGetClasificaciones: string = `${this.baseUrl}api/ClasificacionSiembra/ObtenerTodosFiltrosAsync`;
  private urlGetClasificacionPorId: string = `${this.baseUrl}api/ClasificacionSiembra/ObtenerTodosFiltrosByIdAsync?id=${0}`;
  private urlActualizarClasificacion : string = `${this.baseUrl}api/ClasificacionSiembra/Actualizar?id=${0}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getClasificacionPorId(id: number):Observable<ListaClasificacion> {
    return this.http.get<ListaClasificacion>( this.urlGetClasificacionPorId + id, { headers: this.headers});
  }

  getClasificaciones(usuario: number, calidad : number, areamuestra_id: number): Observable<ListaClasificacion[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("calidad", calidad.toString());
    queryParams = queryParams.append("areamuestra_id", areamuestra_id.toString());
    
    return this.http.get<ListaClasificacion[]>(this.urlGetClasificaciones, { headers: this.headers, params: queryParams });
  }

  actualizarClasificacion(Clasificacion: ListaClasificacion): Observable<ListaClasificacion>{
    return this.http.post<ListaClasificacion>(this.urlActualizarClasificacion + Clasificacion.id, Clasificacion, { headers: this.headers});
  }
}
