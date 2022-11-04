import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaActividades } from '../usuarios/interfaces/listaActividades.interface';

@Injectable({
  providedIn: 'root'
})

export class ActividadesService {

  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetActividades: string = `${this.baseUrl}api/Actividades/ObtenerTodosAsync`; 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
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
}
