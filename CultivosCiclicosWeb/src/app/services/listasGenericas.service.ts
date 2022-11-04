import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ListasGenericas } from '../usuarios/interfaces/listasgenericas.interface';

@Injectable({
  providedIn: 'root'
})

export class ListasGenericasService {
  private baseUrl: string = environment.baseUrl;  
  private headers;
  private urlGetTodasListasGenericas: string = `${this.baseUrl}api/ListasGenericas/ObtenerTodasListasGenericas`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Authorization', localStorage.getItem('token') || '');
  }

  getTodasListasGenericas(): Observable<ListasGenericas>{
    return this.http.get<ListasGenericas>( this.urlGetTodasListasGenericas, { headers: this.headers});
  }
}