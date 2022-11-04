import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ActividadesRoutingModule } from './actividades-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListadoComponent } from './pages/listado/listado.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    ListadoComponent,
    ActividadesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ActividadesRoutingModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatMomentDateModule,
    // MomentDateAdapter
  ]
})
export class ActividadesModule { }
