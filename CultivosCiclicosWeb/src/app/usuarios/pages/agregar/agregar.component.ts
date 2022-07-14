import { Component, OnInit } from '@angular/core';
import { Estados, Usuario, Roles, TipoDocumentos } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  roles =[
    {
      id:'1',
      desc:'Administrador'
    },
    {
      id:'2',
      desc:'Asesor de cultivo'
    }
  ];

  usuario: Usuario = {
    nombreCompleto: '',
    correo: '',
    estado: Number.parseInt(Estados.Activo),
    rol: Number.parseInt(Roles.Administrador),
    tipoDocumento: Number.parseInt(TipoDocumentos.CedulaExtranjeria),
    numeroIdentificacion: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
