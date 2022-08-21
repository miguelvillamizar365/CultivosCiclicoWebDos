import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UsuarioAuth } from '../../../usuarios/interfaces/usuarios.interface';
import { Auth } from "../../interfaces/auth.interface";
import { tap, Observable, map, of} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  
})

export class AuthService {

    private baseUrl: string = environment.baseUrl;
    
    private usuario : UsuarioAuth ={
      correo: "miguelvillamizar365@gmail.com",
      Contrasenia: "PruebA02*"
    };
    private _auth: Auth | undefined;

    get auth(): Auth{
      return { ...this._auth! }
    }

    constructor( private http: HttpClient){}
    
    verificaAutenticacion(): Observable<boolean>{
      if( !localStorage.getItem('token') ){
        return of(false);
      }

      return this.http.post<Auth>(`${ this.baseUrl }api/login/authenticate`, this.usuario)
      .pipe(
        map( auth => {          
          this._auth = auth;
          return true;
        })
      );
    }

    login(correo: string, Contrasenia: string)
    {
      this.usuario.correo = correo;
      this.usuario.Contrasenia = Contrasenia;
        return this.http.post<Auth>(`${ this.baseUrl }api/login/authenticate`, this.usuario)
        .pipe(
          tap( auth => this._auth = auth),
          tap( auth => localStorage.setItem('token', auth.token)),
        ); 
    }

    logout(){
      this._auth = undefined;
    }
}