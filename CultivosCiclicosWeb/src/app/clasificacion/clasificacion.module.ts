import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListadoComponent } from './pages/listado/listado.component';
import { ClasificacionRoutingModule } from './clasificacion-routing.module';
import { EditarComponent } from './pages/editar/editar.component';
import { ClasificacionComponent } from './pages/clasificacion/clasificacion.component';


@NgModule({
  declarations: [
    ListadoComponent,
    EditarComponent,
    ClasificacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ClasificacionRoutingModule,
    NgxDatatableModule
  ]
})
export class ClasificaiconModule { }
