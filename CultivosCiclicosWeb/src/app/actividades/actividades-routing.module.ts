import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
      {
        path:'listado',
        component: ListadoComponent
      },
      {
        path:'agregar',
        component:AgregarComponent
      }, 
      {
        path:':id',
        component: ActividadesComponent
      },  
      {
        path:'editar/:id',
        component:AgregarComponent
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
export class ActividadesRoutingModule { }
