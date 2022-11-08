import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ListasGenericas } from '../usuarios/interfaces/listasgenericas.interface';
import { ListaSiembra } from '../usuarios/interfaces/listaSiembra.interface';

@Injectable({
  providedIn: 'root'
})

export class SiembraService {
  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetTodasListasGenericas: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodasListasGenericas`;
  private urlGetSiembra: string = `${this.baseUrl}api/Siembras/ObtenerTodosFiltrosAsync`; 

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getTodasListasGenericas(): Observable<ListasGenericas>{
    return this.http.get<ListasGenericas>( this.urlGetTodasListasGenericas, { headers: this.headers});
  }
  
  getListadoRegistroSiembra(usuario: number, areaMuestra_id : number, variedad_id: number): Observable<ListaSiembra[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("areaMuestra", areaMuestra_id.toString());
    queryParams = queryParams.append("variedad", variedad_id.toString());
    
    return this.http.get<ListaSiembra[]>(this.urlGetSiembra, { headers: this.headers, params: queryParams });
  }

}