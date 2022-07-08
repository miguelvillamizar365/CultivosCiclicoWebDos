import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: ['mat-card{ margin-top: 20px }']
})
export class ListadoComponent implements OnInit {
  
  listaUsuario:Usuario[]=[];
  constructor(private usuarioService: UsuariosService) { }


  ngOnInit(): void {
  
    this.usuarioService.getUsuarios()
    .subscribe( resp => {
      this.listaUsuario = resp;
    });
  }

}
