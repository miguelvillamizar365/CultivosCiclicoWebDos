import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

import { GraficasRoutingModule } from './graficas-routing.module';
import { ReporteCalidadesPorVariedadComponent } from './pages/reporte-calidades-por-variedad/reporte-calidades-por-variedad.component';
import { ReporteAreaDemuestraCalidadComponent } from './pages/reporte-area-demuestra-calidad/reporte-area-demuestra-calidad.component';


@NgModule({
  declarations: [
    ReporteCalidadesPorVariedadComponent,
    ReporteAreaDemuestraCalidadComponent
  ],
  imports: [
    CommonModule,
    GraficasRoutingModule, 
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ]
})
export class GraficasModule { }
