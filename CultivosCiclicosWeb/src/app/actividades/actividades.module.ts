import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ActividadesRoutingModule } from './actividades-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ActividadesRoutingModule,
  ]
})
export class ActividadesModule { }
