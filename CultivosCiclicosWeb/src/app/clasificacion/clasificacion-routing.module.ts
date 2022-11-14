import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/pages/home/home.component';
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
export class ClasificacionRoutingModule { }
