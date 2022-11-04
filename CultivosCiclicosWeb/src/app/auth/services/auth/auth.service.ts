import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Auth } from "../../interfaces/auth.interface";
import { tap, Observable, map, of, catchError} from 'rxjs';
import { UsuarioAuth } from "src/app/usuarios/interfaces/usuarios.interface";

@Injectable({
  providedIn: 'root'  
})

export class AuthService {

    private baseUrl: string = environment.baseUrl;
    
    private usuario : UsuarioAuth ={
      correo: "",
      Contrasenia: ""
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
      const url = `${ this.baseUrl }api/login/ValidarToken`;
      const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '');
      
      return this.http.get<Auth>(url, {headers})
      .pipe(
        map( auth => {          
          this._auth = {
            id: auth.id,
            correo: auth.correo,
            token: auth.token,
            usuarioCompleto: auth.usuarioCompleto,
            ok: true
          }
          return true;
        }),
        catchError( error => of(false))
        );
    }

    login(correo: string, Contrasenia: string)
    {
      this.usuario.correo = correo;
      this.usuario.Contrasenia = Contrasenia;
        return this.http.post<Auth>(`${ this.baseUrl }api/login/authenticate`, this.usuario)
        .pipe(          
          tap(auth => {
            if(auth.id){
              
              this._auth = auth;
              this._auth.ok = true;
              localStorage.setItem('token', auth.token);
            }
          }),
          map( resp => resp),
          catchError( error => of(error))
        ); 
    }

    logout(){
      this._auth = undefined;
      localStorage.clear();
    }

}