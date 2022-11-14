import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
import { ClasificacionComponent } from './pages/clasificacion/clasificacion.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListadoComponent } from './pages/listado/listado.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
      {
        path:'listado',
        component:ListadoComponent
      },
      {
        path:'editar/:id',
        component:EditarComponent
      }, 
      {
        path:'clasificacion/:id',
        component:ClasificacionComponent
      }, 
      {
        path:'**',
        component:ListadoComponent
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
export class ClasificacionRoutingModule { }
