import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HomeRoutingModule } from './home-routing.module.ts.module';
import { HomeComponent } from '../home/pages/home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { InicioComponent } from './pages/inicio/inicio.component';


@NgModule({
  declarations: [
    HomeComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeRoutingModule,
    MatExpansionModule
  ]
})
export class HomeModule { }
