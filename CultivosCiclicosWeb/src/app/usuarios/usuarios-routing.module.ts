import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HomeComponent } from '../home/pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
      {
      path:'listado',
      component:ListadoComponent
    }, 
    {
      path:'agregar',
      component:AgregarComponent
    }, 
    {
      path:'editar/:id',
      component:AgregarComponent
    }, 
    {
      path:':id',
      component:UsuarioComponent
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
export class UsuariosRoutingModule { }
