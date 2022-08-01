import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estados, Usuario, Roles, TipoDocumentos } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3) ]],
    apellido: ['', [Validators.required, Validators.minLength(3) ]],
    correo: ['', [Validators.required, Validators.minLength(3) ]],
    rol_Id: ['', [Validators.required ]],
    tipDoc_Id: ['', [Validators.required ]],
    numeroIdentificacion: ['', [Validators.required, Validators.minLength(3) ]],
    contrasenia: ['', [Validators.required, Validators.minLength(3) ]],
  });

  constructor(private usuarioServicio: UsuariosService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder) { 

              }
              
  campoNoEsValido(campo: string ){
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.usuarioServicio.getUsuarioPorId(id))
      )
    .subscribe(usuario => {
      this.usuario = usuario;
      this.miFormulario.reset({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        correo: this.usuario.correo,
        numeroIdentificacion: this.usuario.numeroIdentificacion,
        contrasenia: this.usuario.contrasenia,
        tipDoc_Id: this.usuario.tipDoc_Id,
        rol_Id: this.usuario.rol_Id
      });
    });

    this.miFormulario.reset({
      nombre: '',
      apellido: '',
      correo: '',
      numeroIdentificacion: '',
      contrasenia: ''
    });
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.usuario.nombre = this.miFormulario.value.nombre;
    this.usuario.apellido = this.miFormulario.value.apellido;
    this.usuario.correo = this.miFormulario.value.correo;
    this.usuario.numeroIdentificacion = this.miFormulario.value.numeroIdentificacion;
    this.usuario.contrasenia = this.miFormulario.value.contrasenia;
    this.usuario.tipDoc_Id = this.miFormulario.value.tipDoc_Id;
    this.usuario.rol_Id = this.miFormulario.value.rol_Id;
    if(this.usuario.id){
      //Actualizar
      this.usuarioServicio.actualizarUsuario(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/usuarios/listado']);
        this.mostrarSnackBar('Usuario Actualizado');    
      });
    }
    else
    {
      //Crear
      this.usuarioServicio.agregarUsuario(this.usuario)
      .subscribe(resp => {
        this.router.navigate(['/usuarios/listado']);
        this.mostrarSnackBar('Usuario Creado');
      });
    }
    this.miFormulario.reset();
  }
  
  borrarUsuario(){
      const dialog = this.dialog.open(ConfirmarComponent,{
        width: '250px',
        data: this.usuario
      });

      dialog.afterClosed().subscribe(
        (result) => {
          if(result){
            this.usuarioServicio.borrarUsuario(this.usuario.id!)
            .subscribe(resp => {
              this.router.navigate(['/usuarios/listado']);
            });
          }
        }
      );
  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }

}
