import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})

export class ListadoComponent implements OnInit {
  
  public usuarios:             Usuario[] = [];
  public usuarioSeleccionado!: Usuario | undefined;
  public listaUsuario!:         Usuario[];

  public miFormulario: FormGroup = this.fb.group({
    termino: ['']
  });
  
  options = {}

  constructor(private usuarioService: UsuariosService,
              private fb: FormBuilder, 
              private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
    .subscribe( resp => {

      this.listaUsuario = resp;
    });
  }
  
  buscarUsuario()
  {
    this.usuarioService.getSugerencias(this.miFormulario.value.termino.trim())
    .subscribe( usuarios => this.usuarios = usuarios);
  }

  opcionSeleccionada(event : MatAutocompleteSelectedEvent){
    
    if(!event.option.value){
      this.refrescar();
      return;
    }
    const usuario: Usuario = event.option.value;
    
    this.usuarioService.getUsuarioPorId( usuario.id!)
    .subscribe( usuario => 
      {
        this.usuarioSeleccionado = usuario;
        
        this.miFormulario.reset({
          termino: this.usuarioSeleccionado!.nombreCompleto
        });            
      });
  }

  refrescar(){
    this.usuarioSeleccionado = undefined;
  }
  
  campoNoEsValido(campo: string ){
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  verDetalle(value: any)
  {
    this.router.navigate(['/usuarios', value]);  
  }

  EditarRegistro(value: any)
  {
    this.router.navigate(['/usuarios/editar', value]);
  }  
}
