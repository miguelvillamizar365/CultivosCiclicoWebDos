import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosRoutingModule } from '../../usuarios-routing.module.ts.module';
import { UsuariosService } from '../../services/usuarios.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino : string ="";
  public usuarios: Usuario[] =[];
  public usuarioSeleccionado!: Usuario | undefined;

  constructor(private usuarioServicio: UsuariosService ) { }

  ngOnInit(): void {
  }
  
  buscarUsuario(){
    this.usuarioServicio.getSugerencias(this.termino.trim())
    .subscribe( usuarios => this.usuarios = usuarios);
  }

  opcionSeleccionada(event : MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.usuarioSeleccionado = undefined;
      return;
    }
    const usuario: Usuario = event.option.value;
    
    this.usuarioServicio.getUsuarioPorId( usuario.id!)
    .subscribe( usuario => this.usuarioSeleccionado = usuario);
  }
}
