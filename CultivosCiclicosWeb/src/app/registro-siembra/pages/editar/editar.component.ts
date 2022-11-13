import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { ListasGenericasService } from 'src/app/services/listasGenericas.service';
import { SiembraService } from 'src/app/services/siembra.service';
import { AreaMuestra } from 'src/app/usuarios/interfaces/areamuestra.interface';
import { AreaSiembra } from 'src/app/usuarios/interfaces/areasiembra.interface';
import { Siembra } from 'src/app/usuarios/interfaces/siembra.interface';
import { Estados } from 'src/app/usuarios/interfaces/usuarios.interface';
import { Variedad } from 'src/app/usuarios/interfaces/variedad.interface';
import { Actividades } from '../../../actividades/interfaces/actividades.interface';
import { TipoActividad } from '../../../usuarios/interfaces/tipoActividad.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: []
})

export class EditarComponent implements OnInit 
{
  public listaAreaSiembra:        AreaSiembra[] = [];  
  public listaAreaMuestraGlobal:  AreaMuestra[] = [];
  public listaAreaMuestra:        AreaMuestra[] = [];  
  public listaVariedad:           Variedad[] = [];
  public listaActividad:          TipoActividad[] = [];
   
  siembra: Siembra = {
    id:                     0,
    areaSiembraId:          0,
    areaSiembraNombre:      '',
    areaMuestraId:          0,
    variedadId:             0,
    estadoId:               Number.parseInt(Estados.Activo),
    fechaRegistroSiembra:   new Date,
    usuario:                '',
    observaciones:          '',
    cantidad:               0,
    actividadId:            0,
    actividad_Nombre:       ''
   };
    
  public miFormulario: FormGroup = this.fb.group({
    areamuestra_Id: ['0', [Validators.required ]],
    areasiembra_Id: ['0', [Validators.required ]],
    variedad_Id: ['0', [Validators.required ]],
    actividadId: ['0', [Validators.required ]],
    cantidad: ['', [Validators.required ]],
    observaciones: ['', [Validators.required, Validators.maxLength(300) ]]
  });
  
  constructor(private siembraService: SiembraService,
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
      this.listaActividad = result.listaTipoActividad;      
        
      this.activatedRoute.params.pipe(
        switchMap( ({id}) => this.siembraService.getSiembraPorId(id))
        )
      .subscribe(siembra => {
        this.siembra = siembra;
        
        this.listaAreaMuestra = [];
        this.listaAreaMuestra = this.listaAreaMuestraGlobal.filter(n=> n.areaSiembraId == siembra.areaSiembraId);

        this.miFormulario.reset({
          areasiembra_Id:         siembra.areaSiembraId,
          areamuestra_Id:         this.listaAreaMuestra[0].id,
          variedad_Id:            siembra.variedadId,
          actividadId:            siembra.actividadId,
          FechaRegistroSiembra:   siembra.fechaRegistroSiembra,
          cantidad:               siembra.cantidad,
          observaciones:          siembra.observaciones
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

    this.siembra.areaMuestraId = this.miFormulario.value.areamuestra_Id;
    this.siembra.variedadId = this.miFormulario.value.variedad_Id;
    this.siembra.estadoId = Number.parseInt(Estados.Activo),
    this.siembra.observaciones = this.miFormulario.value.observaciones;
    this.siembra.cantidad  = this.miFormulario.value.cantidad;
    this.siembra.actividadId  = this.miFormulario.value.actividadId;    

    if(this.miFormulario.value.areamuestra_Id.toString() == '0'){
        this.mostrarSnackBar('Por favor seleccione el área de siembra');
    }
    else if(this.miFormulario.value.variedad_Id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione la variedad');
    }
    else if(this.miFormulario.value.actividadId.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione la actividad');
    }
    else if(this.siembra.id){
      //Actualizar
      this.siembraService.actualizarSiembra(this.siembra)
      .subscribe(siembra => {
        this.router.navigate(['/registro-siembra/listado']);
        this.mostrarSnackBar('Siembra Actualizada');    
      });
    }
    
    this.miFormulario.reset();
  }
}
