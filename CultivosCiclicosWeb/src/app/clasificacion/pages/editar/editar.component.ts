import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClasificacionService } from 'src/app/services/clasificacion.service';
import { ListasGenericasService } from 'src/app/services/listasGenericas.service';
import { AreaMuestra } from 'src/app/usuarios/interfaces/areamuestra.interface';
import { AreaSiembra } from 'src/app/usuarios/interfaces/areasiembra.interface';
import { ListaClasificacion } from 'src/app/usuarios/interfaces/listadoClasificacionSiembra.interface';
import { Estados } from 'src/app/usuarios/interfaces/usuarios.interface';
import { Variedad } from 'src/app/usuarios/interfaces/variedad.interface';
import { Calidad } from '../../../usuarios/interfaces/calidad.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: []
})

export class EditarComponent implements OnInit 
{
    public listaAreaMuestraGlobal:  AreaMuestra[] = [];
    public listaAreaMuestra:        AreaMuestra[] = [];  
    public listaAreaSiembra:        AreaSiembra[] = [];  
    public listaVariedad:           Variedad[] = [];
    public listaCalidad:            Calidad[] = [];

    clasificacion: ListaClasificacion = {
      id:                 0,
      areaMuestraId:      0,
      areaMuestraNombre: '',
      calidadId:          '0',
      calidadNombre:     '',
      cantidad:           new Date,
      usuario:            '',
      fechaRegistro:      new Date,
      variedadId:        0,
      variedadNombre:    '',
      observaciones:      '',
      estadoId:          0,
      estadoNombre:      '',
      areaSiembraId:     0,
      areaSiembraNombre: ''
    };     
      
    public miFormulario: FormGroup = this.fb.group({
      areamuestra_Id: ['0', [Validators.required ]],
      areasiembra_Id: ['0', [Validators.required ]],
      variedad_Id: ['0', [Validators.required ]],
      cantidad: ['', [Validators.required ]],
      observaciones: ['', [Validators.required, Validators.maxLength(300) ]],
      calidad_Id: ['0', [Validators.required ]]
    });
    
    constructor(private clasificacionService: ClasificacionService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private listasService: ListasGenericasService,
      private snackBar: MatSnackBar) { }
  
    ngOnInit(): void
    {
      this.listasService.getTodasListasGenericas()
      .subscribe(result => {
        this.listaAreaMuestraGlobal = result.listaAreaMuestra;
        this.listaVariedad = result.listaVariedad;
        this.listaAreaSiembra = result.listaAreaSiembra;   
        this.listaCalidad =  result.listaCalidad;
        
        this.activatedRoute.params.pipe(
          switchMap( ({id}) => this.clasificacionService.getClasificacionPorId(id))
          )
        .subscribe(clasificacion => {
          this.clasificacion = clasificacion;
          this.listaAreaMuestra = [];
          this.listaAreaMuestra = this.listaAreaMuestraGlobal.filter(n=> n.areaSiembraId == clasificacion.areaSiembraId);
  
          this.miFormulario.reset({
            areasiembra_Id:         clasificacion.areaSiembraId,
            areamuestra_Id:         clasificacion.areaMuestraId,
            variedad_Id:            clasificacion.variedadId,
            FechaRegistroSiembra:   clasificacion.fechaRegistro,
            cantidad:               clasificacion.cantidad,
            observaciones:          clasificacion.observaciones,
            calidad_Id:             clasificacion.calidadId
          });
        });
      });
    }
    
    campoNoEsValido(campo: string )
    {
      return this.miFormulario.controls[campo].errors
        && this.miFormulario.controls[campo].touched;
    }
      
    mostrarSnackBar(mensaje:string){
      this.snackBar.open(mensaje, 'Ok!', {
        duration: 2500
      });
    }
    
    mostrarAreaMuestra(event: any)
    {
      if(event.value != 0 && event.value != undefined)
      {
        this.listaAreaMuestra = [];
        this.listaAreaMuestra = this.listaAreaMuestraGlobal.filter(n=> n.areaSiembraId == event.value);
        
        this.miFormulario.reset({
          areasiembra_Id: event.value,
          areamuestra_Id: this.listaAreaMuestra[0].id,
          variedad_Id: '0'
        });
      }
    }    
  
    editar()
    {
      if(this.miFormulario.invalid){
        this.miFormulario.markAllAsTouched();
        return;
      }
  
      this.clasificacion.areaMuestraId = this.miFormulario.value.areamuestra_Id;
      this.clasificacion.variedadId = this.miFormulario.value.variedad_Id;
      this.clasificacion.estadoId = Number.parseInt(Estados.Activo),
      this.clasificacion.observaciones = this.miFormulario.value.observaciones;
      this.clasificacion.cantidad  = this.miFormulario.value.cantidad;
      this.clasificacion.calidadId = this.miFormulario.value.calidad_Id;
  
      if(this.miFormulario.value.areamuestra_Id.toString() == '0'){
          this.mostrarSnackBar('Por favor seleccione el área de siembra');
      }
      else if(this.miFormulario.value.variedad_Id.toString() == '0'){
        this.mostrarSnackBar('Por favor seleccione la variedad');
      }
      else if(this.miFormulario.value.calidad_Id.toString() == '0'){
        this.mostrarSnackBar('Por favor seleccione la calidad');
      }
      else if(this.clasificacion.id){
        //Actualizar
        this.clasificacionService.actualizarClasificacion(this.clasificacion)
        .subscribe(clasificacion => {
          this.router.navigate(['/clasificacion/listado']);
          this.mostrarSnackBar('Clasificación Actualizada');    
        });
      }
      
      this.miFormulario.reset();
    }
  }
  