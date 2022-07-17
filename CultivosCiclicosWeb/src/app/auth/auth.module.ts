import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './services/auth/auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    MaterialModule
  ]
})
export class AuthModule { }
