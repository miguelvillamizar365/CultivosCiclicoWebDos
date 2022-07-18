import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})

export class ListadoComponent implements OnInit {
  
  public termino :             string ="";
  public usuarios:             Usuario[] =[];
  public usuarioSeleccionado!: Usuario | undefined;
  public listaUsuario:         Usuario[]=[];

  constructor(private usuarioService: UsuariosService,
              private usuarioServicio: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
    .subscribe( resp => {
      this.listaUsuario = resp;
    });
  }
  
  buscarUsuario(){
    this.usuarioServicio.getSugerencias(this.termino.trim())
    .subscribe( usuarios => this.usuarios = usuarios);
  }

  opcionSeleccionada(event : MatAutocompleteSelectedEvent){
    
    if(!event.option.value){
      this.refrescar();
      return;
    }
    const usuario: Usuario = event.option.value;
    
    this.usuarioServicio.getUsuarioPorId( usuario.id!)
    .subscribe( usuario => this.usuarioSeleccionado = usuario);
  }

  refrescar(){    
    this.usuarioSeleccionado = undefined;
  }
}
