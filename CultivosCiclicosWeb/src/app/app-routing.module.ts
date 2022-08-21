import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes :Routes =[
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)
  }, 
  {
    path:'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m=> m.UsuariosModule),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component:ErrorPageComponent
  },
  {
    path:'**',
    redirectTo:'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ] 
})
export class AppRoutingModule { }
