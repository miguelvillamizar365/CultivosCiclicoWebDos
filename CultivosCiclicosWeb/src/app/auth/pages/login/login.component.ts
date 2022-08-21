import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public miFormularioLogin: FormGroup = this.fb.group({
    correo:['', [Validators.required, Validators.email]],
    Contrasenia: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private router: Router, 
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    // ir al back end
    this.authService.login(this.miFormularioLogin.value.correo,
      this.miFormularioLogin.value.Contrasenia).subscribe(resp => {
      this.router.navigate(['./usuarios']);
    });    
  }
  IngresarSinLogin(){
    this.router.navigate(['./usuarios']);
  }
}
