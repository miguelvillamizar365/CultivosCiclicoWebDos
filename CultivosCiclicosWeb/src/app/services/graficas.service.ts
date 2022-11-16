import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListaClasificacion } from '../usuarios/interfaces/listadoClasificacionSiembra.interface';
import { Reporteareademuestracalidad } from '../usuarios/interfaces/reporteareademuestracalidad.interface';

@Injectable({
  providedIn: 'root'
})

export class graficaService {

  private baseUrl: string = environment.baseUrl;
  private headers;
  private urlGetObtenerlabelReportesync: string = `${this.baseUrl}api/Grafica/ObtenerlabelReportesync`;
 
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getReporteareademuestracalidad():Observable<Reporteareademuestracalidad> {
    return this.http.get<Reporteareademuestracalidad>( this.urlGetObtenerlabelReportesync, { headers: this.headers});
  }
}