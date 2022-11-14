import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguimientoFenologicoRoutingModule } from './seguimiento-fenologico-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { EditarComponent } from './pages/editar/editar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SeguimientoFenologicoComponent } from './pages/seguimiento-fenologico/seguimiento-fenologico.component'; 
 
@NgModule({
  declarations: [
    EditarComponent,
    ListadoComponent,
    SeguimientoFenologicoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SeguimientoFenologicoRoutingModule,
    NgxDatatableModule
  ]
})
export class SeguimientoFenologicoModule { }