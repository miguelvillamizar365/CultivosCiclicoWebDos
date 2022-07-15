import { Component, OnInit } from '@angular/core';
import { Estados, Usuario, Roles, TipoDocumentos } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

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
  
  tipodocumentos =[
    {
      id:'1',
      desc:'Cédula extranjeria'
    },
    {
      id:'2',
      desc:'Numero de identificación personal'
    },
    {
      id:'3',
      desc:'Número de identificación tributaria'
    },
    {
      id:'4',
      desc:'Tarjeta de identidad'
    }
  ];

  usuario: Usuario = {
    nombreCompleto: '',
    nombre : '',
    apellido: '', 
    correo: '',
    estado: Number.parseInt(Estados.Activo),
    rol: Roles.Administrador,
    rol_Id: 0,
    tipoDocumento: TipoDocumentos.CedulaExtranjeria,
    tipDoc_Id: 0,
    numeroIdentificacion: '',
    contrasenia: ''
  }

  constructor(private usuarioServicio: UsuariosService) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.usuario.nombre.trim().length == 0){
      return;
    }
    this.usuario.rol_Id = Number.parseInt(this.usuario.rol.toString());
    this.usuario.tipDoc_Id = Number.parseInt(this.usuario.tipoDocumento.toString());
    this.usuarioServicio.agregarUsuario(this.usuario)
    .subscribe(resp => {
       console.log('Respuesta');
    });
  }
}
