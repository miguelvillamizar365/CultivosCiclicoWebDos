import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaActividades } from '../usuarios/interfaces/listaActividades.interface';
import { Actividades } from '../actividades/interfaces/actividades.interface';
import { ListaClasificacion } from '../usuarios/interfaces/listadoClasificacionSiembra.interface';

@Injectable({
  providedIn: 'root'
})

export class ClasificacionService {

  private baseUrl: string = environment.baseUrl;
  private headers;
  private urlGetClasificaciones: string = `${this.baseUrl}api/ClasificacionSiembra/ObtenerTodosFiltrosAsync`;
  private urlGetActividadPorId: string = `${this.baseUrl}api/ClasificacionSiembra/${0}`;
  private urlActualizarActividad : string = `${this.baseUrl}api/ClasificacionSiembra/Actualizar?id=${0}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getActividadPorId(id: number):Observable<Actividades> {
    return this.http.get<Actividades>( this.urlGetActividadPorId + id, { headers: this.headers});
  }

  getClasificaciones(usuario: number, calidad : number, areamuestra_id: number): Observable<ListaClasificacion[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("calidad", calidad.toString());
    queryParams = queryParams.append("areamuestra_id", areamuestra_id.toString());
    
    return this.http.get<ListaClasificacion[]>(this.urlGetClasificaciones, { headers: this.headers, params: queryParams });
  }

  actualizarActividad(Actividad: Actividades): Observable<Actividades>{
    return this.http.post<Actividades>(this.urlActualizarActividad + Actividad.id, Actividad, { headers: this.headers});
  }

}
