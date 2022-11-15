import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
import { ReporteAreaDemuestraCalidadComponent } from './pages/reporte-area-demuestra-calidad/reporte-area-demuestra-calidad.component';
import { ReporteCalidadesPorVariedadComponent } from './pages/reporte-calidades-por-variedad/reporte-calidades-por-variedad.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path:'reporte-area-muestra-calidad',
      component:ReporteAreaDemuestraCalidadComponent
    },
    {
      path:'reporte-calidades-por-variedad',
      component:ReporteCalidadesPorVariedadComponent
    }
]
}];

@NgModule({
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports:[
    RouterModule
  ]
})
export class GraficasRoutingModule { }
