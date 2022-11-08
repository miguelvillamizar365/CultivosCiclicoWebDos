import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroSiembraRoutingModule } from '../registro-siembra/registro-siembra-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
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
