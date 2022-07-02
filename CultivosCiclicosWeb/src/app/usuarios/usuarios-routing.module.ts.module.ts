import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
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
      path:'buscar',
      component:BuscarComponent
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
