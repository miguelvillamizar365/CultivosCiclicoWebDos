import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from '../home/pages/home/home.component';
import { EditarComponent } from '../registro-siembra/pages/editar/editar.component';
import { RegistroSiembraComponent } from './pages/registro-siembra/registro-siembra.component';

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
      path:'registro-siembra/:id',
      component:RegistroSiembraComponent
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
export class RegistroSiembraRoutingModule { }
