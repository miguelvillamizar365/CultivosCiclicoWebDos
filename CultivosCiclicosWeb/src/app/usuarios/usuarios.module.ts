import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module.ts.module';
import { MaterialModule } from '../material/material.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioTarjetaComponent } from './components/usuario-tarjeta/usuario-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';


@NgModule({
  declarations: [
    AgregarComponent,
    HomeComponent,
    ListadoComponent,
    UsuarioComponent,
    UsuarioTarjetaComponent,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
