import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ListasGenericas } from '../usuarios/interfaces/listasgenericas.interface';
import { Siembra } from 'src/app/usuarios/interfaces/siembra.interface';

@Injectable({
  providedIn: 'root'
})

export class SiembraService {
  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetTodasListasGenericas: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodasListasGenericas`;
  private urlGetSiembra: string = `${this.baseUrl}api/Siembras/ObtenerTodosFiltrosAsync`; 
  private urlGetSiembraPorId : string = `${this.baseUrl}api/Siembras/ObtenerTodosFiltrosByIdAsync?id=${0}`;
  private urlActualizarSiembra : string = `${this.baseUrl}api/Siembras/Actualizar?id=${0}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getTodasListasGenericas(): Observable<ListasGenericas>{
    return this.http.get<ListasGenericas>( this.urlGetTodasListasGenericas, { headers: this.headers});
  }
  
  getListadoRegistroSiembra(usuario: number, areaMuestra_id : number, variedad_id: number): Observable<Siembra[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("areaMuestra", areaMuestra_id.toString());
    queryParams = queryParams.append("variedad", variedad_id.toString());
    
    return this.http.get<Siembra[]>(this.urlGetSiembra, { headers: this.headers, params: queryParams });
  }

  getSiembraPorId(id: number):Observable<Siembra> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id.toString());

    return this.http.get<Siembra>( this.urlGetSiembraPorId + id, { headers: this.headers, params: queryParams });
  }

  actualizarSiembra(Siembra: Siembra): Observable<Siembra>{
    return this.http.post<Siembra>(this.urlActualizarSiembra + Siembra.id, Siembra, { headers: this.headers});
  }

}