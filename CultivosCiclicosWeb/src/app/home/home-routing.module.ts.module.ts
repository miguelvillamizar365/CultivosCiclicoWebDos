import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const rutas: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path:'inicio',
      component:InicioComponent
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
export class HomeRoutingModule { }
