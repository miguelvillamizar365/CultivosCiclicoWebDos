import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ListasGenericas } from '../usuarios/interfaces/listasgenericas.interface';
import { Seguimientofenologico, SeguimientofenologicoResult } from 'src/app/usuarios/interfaces/seguimientofenologico.interface';

@Injectable({
  providedIn: 'root'
})
export class SeguimientofenologicoService {
  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetTodasListasGenericas: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodasListasGenericas`;
  private urlGetSiembra: string = `${this.baseUrl}api/SeguimientoFenologico/ObtenerTodosFiltrosAsync`; 
  private urlGetSiembraPorId : string = `${this.baseUrl}api/Siembras/ObtenerTodosFiltrosByIdAsync?id=${0}`;
  private urlActualizarSiembra : string = `${this.baseUrl}api/Siembras/Actualizar?id=${0}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
   }
   getTodasListasGenericas(): Observable<ListasGenericas>{
    return this.http.get<ListasGenericas>( this.urlGetTodasListasGenericas, { headers: this.headers});
  }
  
  getListadoSeguimientos(usuario: number, areaMuestra_id : number, variedad_id: number): Observable<SeguimientofenologicoResult[]>
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("usuario", usuario.toString());
    queryParams = queryParams.append("areaMuestra", areaMuestra_id.toString());
    queryParams = queryParams.append("variedad", variedad_id.toString());
    
    return this.http.get<SeguimientofenologicoResult[]>(this.urlGetSiembra, { headers: this.headers, params: queryParams });
  }

  getSeguimientoPorId(id: number):Observable<Seguimientofenologico> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id.toString());

    return this.http.get<Seguimientofenologico>( this.urlGetSiembraPorId + id, { headers: this.headers, params: queryParams });
  }

  actualizarSeguimiento(Siembra: Seguimientofenologico): Observable<Seguimientofenologico>{
    return this.http.post<Seguimientofenologico>(this.urlActualizarSiembra + Siembra.id, Siembra, { headers: this.headers});
  }
}
