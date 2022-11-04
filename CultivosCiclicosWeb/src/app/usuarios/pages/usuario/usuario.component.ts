import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios.service';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  
  usuario!: Usuario;
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, 
    private usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit() :void  {
     this.routeSub = this.route.params.pipe(switchMap( ({id}) => this.usuarioService.getUsuarioPorId(id) ))
     .subscribe( resp => { this.usuario = resp; });
    }

    regresar(){
      this.router.navigate(['/usuarios/listado']);
    }
}
