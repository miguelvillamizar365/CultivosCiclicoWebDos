import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroSiembraRoutingModule } from './registro-siembra-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { EditarComponent } from './pages/editar/editar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
 
@NgModule({
  declarations: [
    EditarComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RegistroSiembraRoutingModule,
    NgxDatatableModule
  ]
})
export class RegistroSiembraModule { }
