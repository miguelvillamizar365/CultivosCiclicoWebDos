import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListasGenericasService } from 'src/app/services/listasGenericas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';import { ListaActividades } from 'src/app/usuarios/interfaces/listaActividades.interface';
import { TipoActividad } from 'src/app/usuarios/interfaces/tipoActividad.interface';
import { Usuario } from 'src/app/usuarios/interfaces/usuarios.interface';
import { Utilidades } from 'src/app/utilidades/utilidades';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'app-listado-component',
  templateUrl: './listado.component.html',
  styleUrls: []
})

export class ListadoComponent implements OnInit {

  public listaActividades:      ListaActividades[] = [];
  public listaUsuarios:         Usuario[] = [];
  public listaTipoActividad:    TipoActividad[] = [];
  public objUtilidades!:         Utilidades;
    
  public miFormulario: FormGroup = this.fb.group({
    fechaInicio: [<Date | null>(null)],
    fechaFin: [<Date | null>(null)],
    usuario: [<Usuario| null>(null), [Validators.required ]],
    tipoactividad_Id: ['0', [Validators.required ]]
  });

  constructor(private actividadesService: ActividadesService,
    private router: Router,
    private fb: FormBuilder,
    private usuarioServicio: UsuariosService,
    private listasService: ListasGenericasService,
    private snackBar: MatSnackBar) { }

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
    this.objUtilidades = new Utilidades();
  }

  buscarByFiltros()
  {
    if(this.miFormulario.value.tipoactividad_Id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione el tipo de actividad');
    }
    else if(this.miFormulario.value.tipoactividad_Id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione el rango de fechas');
    }
    else if(this.miFormulario.status != 'INVALID')
    {
      this.consultaFiltrosListaActividades(
        parseInt(this.miFormulario.value.usuario.id),
        this.objUtilidades.formatddMMyyyy(this.miFormulario.value.fechaInicio),
        this.objUtilidades.formatddMMyyyy(this.miFormulario.value.fechaFin),
        parseInt(this.miFormulario.value.tipoactividad_Id));
    }
    else {
      this.mostrarSnackBar('Por favor validar el formato de las fechas');
    }
  }
  
  consultaFiltrosListaActividades(usuario: number, fechainicio : string, fechafin: string , tipoActividad: number)
  {
    this.actividadesService.getActividades(usuario, fechainicio, fechafin, tipoActividad)
    .subscribe( resp => {
      this.listaActividades = resp;
    });
  }
  
  verDetalle(value: any)
  {
    this.router.navigate(['/actividades', value]);  
  }

  EditarRegistro(value: any)
  {
    this.router.navigate(['/actividades/editar', value]);
  } 
  
  campoNoEsValido(campo: string )
  {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }
  
  displayFn(user: Usuario): string {
    return user && user.nombreCompleto ? user.nombreCompleto : '';
  }
  
  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }
}
