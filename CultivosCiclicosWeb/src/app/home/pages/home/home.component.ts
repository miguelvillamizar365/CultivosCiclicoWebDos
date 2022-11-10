import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [' .container{ margin: 10px; } ']
})

export class HomeComponent implements OnInit 
{
  get auth(){
    return this.authService.auth;
  }

  UsuariosEnabled = false;
  ActividadesEnabled = false;
  RegistroSiembraEnabled = false;
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    var rol_id = localStorage.getItem('rol_id');
    
    //Adminsitrador
    if(rol_id == "1"){
      this.UsuariosEnabled = true;
      this.ActividadesEnabled = true;
      this.RegistroSiembraEnabled = true;
    }
    //Asesor de cultivo (Web)    
    else if(rol_id == "2"){
      this.ActividadesEnabled = true;
      this.RegistroSiembraEnabled = true;
    }
    //Asesor comercial (Web)
    else if(rol_id == "5"){      
      this.ActividadesEnabled = false;
      this.RegistroSiembraEnabled = false;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['./auth']);
  }
}