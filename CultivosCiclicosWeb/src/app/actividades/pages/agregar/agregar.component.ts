import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ListasGenericasService } from 'src/app/services/listasGenericas.service';
import { Actividades } from '../../interfaces/actividades.interface';
import { ActividadesService } from '../../../services/actividades.service';
import { ConfirmarComponent } from 'src/app/usuarios/components/confirmar/confirmar.component';
import { TipoActividad } from 'src/app/usuarios/interfaces/tipoActividad.interface';
import { Usuario } from 'src/app/usuarios/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioAuth } from '../../../usuarios/interfaces/usuarios.interface';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})

export class AgregarComponent implements OnInit {

  public listaTipoActividad:    TipoActividad[] = [];
  public listaUsuarios:         Usuario[] = [];

  actividad: Actividades = {
    nombre: '',
    estadoId: 0,
    estadoNombre: '',
    observaciones: '',
    descripcion: '',
    fechaActividad: new Date(),
    usuario_Id: 0,
    nombreUsuario: '',
    tipoActividad_Id: 0,
    tipoActividadNombre: ''
  }

  public miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100) ]],
    observaciones: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300) ]],
    fechaActividad: [<Date | null>(null)],
    descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300) ]],
    tipoActividad_Id: ['0', [Validators.required ]],    
    usuario: [<Usuario | null>(null), [Validators.required ]]
  });

  constructor(private actividadServicio: ActividadesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private listasService: ListasGenericasService,
              private usuarioServicio: UsuariosService) {

              }
              
  campoNoEsValido(campo: string )
  {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  campoNoValido(campo: string)
  {
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }

  ngOnInit(): void 
  {
    this.listasService.getTodasListasGenericas()
    .subscribe(result => {
      this.listaTipoActividad = result.listaTipoActividad;
    });

    this.usuarioServicio.getUsuarios()
    .subscribe(result => {
      this.listaUsuarios = result; 
    });

    if(!this.router.url.includes('editar')){
      return;
    }
    
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.actividadServicio.getActividadPorId(id))
      )
    .subscribe(actividad => {
      this.actividad = actividad;
      
      this.miFormulario.reset({
        nombre: this.actividad.nombre,
        observaciones: this.actividad.observaciones,
        descripcion: this.actividad.descripcion,
        fechaActividad: this.actividad.fechaActividad,        
        tipoActividad_Id: this.actividad.tipoActividad_Id,
        usuario: {id: this.actividad.usuario_Id, nombreCompleto: this.actividad.nombreUsuario}
      });
    });

  }

  guardar()
  {
    if(this.miFormulario.invalid)
    {
      this.miFormulario.markAllAsTouched();
      return;
    }
    if(this.miFormulario.value.TipoActividad_Id == '0')
    {
      this.mostrarSnackBar('Por favor seleccione el tipo de actividad');
    }
    else
    {
      this.actividad.nombre = this.miFormulario.value.nombre;
      this.actividad.observaciones = this.miFormulario.value.observaciones;
      this.actividad.descripcion = this.miFormulario.value.descripcion;
      this.actividad.tipoActividad_Id = this.miFormulario.value.tipoActividad_Id;
      this.actividad.usuario_Id = this.miFormulario.value.usuario.id;

      if(this.actividad.id){
        //Actualizar
        this.actividadServicio.actualizarActividad(this.actividad)
        .subscribe(usuario => {
          this.router.navigate(['/actividades/listado']);
          this.mostrarSnackBar('Actividad Actualizada');    
        });
      }
      else
      {
        //Crear
        this.actividadServicio.agregarActividad(this.actividad)
        .subscribe(resp => {
          this.router.navigate(['/actividades/listado']);
          this.mostrarSnackBar('Actividad Creada');
        });
      }
      this.miFormulario.reset();
    }
  }
  
  borrarActividad(){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: this.actividad
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.actividadServicio.borrarActividad(this.actividad.id!)
          .subscribe(resp => {
            this.router.navigate(['/actividades/listado']);
          });
        }
      });
  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }

  regresar(){
    this.router.navigate(['/actividades/listado']);
  }
  
  displayFn(user: Usuario): string {
    return user && user.nombreCompleto ? user.nombreCompleto : '';
  }
}
