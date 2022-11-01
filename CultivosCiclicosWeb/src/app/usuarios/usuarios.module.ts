import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module.ts.module';
import { MaterialModule } from '../material/material.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioTarjetaComponent } from './components/usuario-tarjeta/usuario-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    AgregarComponent,
    ListadoComponent,
    UsuarioComponent,
    UsuarioTarjetaComponent,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuariosRoutingModule,
    NgxDatatableModule
  ]
})
export class UsuariosModule { }
