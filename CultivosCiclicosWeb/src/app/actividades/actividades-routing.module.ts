import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
import { ListadoActividadComponent } from './pages/listado-actividad/listado-actividad.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
       {
        path:'listado-actividad',
        component: ListadoActividadComponent
       }
    // {
    //   path:'agregar',
    //   component:AgregarComponent
    // },  
    // {
    //   path:'editar/:id',
    //   component:AgregarComponent
    // }, 
    // {
    //   path:':id',
    //   component:UsuarioComponent
    // },
    // {
    //   path:'**',
    //   component:ListadoComponent
    // }, 
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
