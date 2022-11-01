import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Actividades } from '../../interfaces/actividades.interface';

@Injectable({
  providedIn: 'root'
})

export class ActividadesService {

  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetActividades: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodosRoles`;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getActividades(): Observable<Actividades[]>{
    return this.http.get<Actividades[]>(this.urlGetActividades, { headers: this.headers});
  }
}
