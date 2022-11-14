import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from '../home/pages/home/home.component';
import { EditarComponent } from '../registro-siembra/pages/editar/editar.component';
import { SeguimientoFenologicoComponent } from './pages/seguimiento-fenologico/seguimiento-fenologico.component';

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
      path:'Seguimiento-fenologico/:id',
      component:SeguimientoFenologicoComponent
    }, 
    {
      path:'**',
      component:ListadoComponent
    }, 
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
export class SeguimientoFenologicoRoutingModule  { }
