import { Component, OnInit } from '@angular/core';
import { Estados, Usuario, Roles, TipoDocumentos } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

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
    rol_Id: Roles.Administrador,
    tipoDocumento: TipoDocumentos.CedulaExtranjeria,
    tipDoc_Id: TipoDocumentos.CedulaExtranjeria,
    numeroIdentificacion: '',
    contrasenia: ''
  }

  constructor(private usuarioServicio: UsuariosService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 

              }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.usuarioServicio .getUsuarioPorId(id)  )
      )
    .subscribe(usuario => this.usuario = usuario);
  }

  guardar(){
    if(this.usuario.nombre.trim().length == 0){
      return;
    }
    // this.usuario.rol_Id = Number.parseInt(this.usuario.rol.toString());
    // this.usuario.tipDoc_Id = Number.parseInt(this.usuario.tipoDocumento.toString());
    
    if(this.usuario.id){
      //Actualizar
      this.usuarioServicio.actualizarUsuario(this.usuario)
      .subscribe(usuario => {
          console.log('Actualizando', usuario);
      });
    }
    else
    {
      //Crear
      this.usuarioServicio.agregarUsuario(this.usuario)
      .subscribe(resp => {
        this.router.navigate(['/usuarios/listado']);
      });
    }
  }
}
