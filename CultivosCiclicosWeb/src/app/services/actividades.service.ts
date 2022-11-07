import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaActividades } from '../usuarios/interfaces/listaActividades.interface';
import { Actividades } from '../actividades/interfaces/actividades.interface';

@Injectable({
  providedIn: 'root'
})

export class ActividadesService {

  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetActividades: string = `${this.baseUrl}api/Actividades/ObtenerTodosAsync`; 
  private urlGetActividadPorId: string = `${this.baseUrl}api/Actividades/${0}`; 
  private urlActualizarActividad : string = `${this.baseUrl}api/Actividades/Actualizar?id=${0}`;
  private urlAgregarActividad : string = `${this.baseUrl}api/Actividades`;
  private urlBorrarActividad: string = `${this.baseUrl}api/Actividades/Eliminar?id=${0}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getActividadPorId(id: number):Observable<Actividades> {
    return this.http.get<Actividades>( this.urlGetActividadPorId + id, { headers: this.headers});
  }

  getActividades(usuario: number, fechainicio : string, fechafin: string , tipoActividad: number): Observable<ListaActividades[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("fechainicio", fechainicio.toString());
    queryParams = queryParams.append("fechafin", fechafin.toString());
    queryParams = queryParams.append("tipoActividad", tipoActividad.toString());
    
    return this.http.get<ListaActividades[]>(this.urlGetActividades, { headers: this.headers, params: queryParams });
  }

  actualizarActividad(Actividad: Actividades): Observable<Actividades>{
    return this.http.post<Actividades>(this.urlActualizarActividad + Actividad.id, Actividad, { headers: this.headers});
  }

  agregarActividad(Actividad: Actividades): Observable<Actividades>{
    return this.http.post<Actividades>( this.urlAgregarActividad, Actividad, { headers: this.headers});
  }
  
  borrarActividad(id: number): Observable<any>{
    return this.http.post<Actividades>( this.urlBorrarActividad + id, id, { headers: this.headers});
  }

}
