import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListasGenericasService } from 'src/app/services/listasGenericas.service';
import { SiembraService } from 'src/app/services/siembra.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AreaMuestra } from 'src/app/usuarios/interfaces/areamuestra.interface';
import { AreaSiembra } from 'src/app/usuarios/interfaces/areasiembra.interface';
import { Siembra } from 'src/app/usuarios/interfaces/siembra.interface';
import { Usuario } from 'src/app/usuarios/interfaces/usuarios.interface';
import { Variedad } from 'src/app/usuarios/interfaces/variedad.interface';

@Component({
  selector: 'app-listado',
  template: '',  
  templateUrl: './listado.component.html',
  styleUrls: []
})
export class ListadoComponent implements OnInit {

  public listaSiembra:       Siembra[] = [];
  public listaAreaSiembra:   AreaSiembra[] = [];  
  public listaAreaMuestraGlobal:  AreaMuestra[] = [];
  public listaAreaMuestra:   AreaMuestra[] = [];
  
  public listaUsuarios:      Usuario[] = [];
  public listaVariedad:      Variedad[] = [];
    
  public miFormulario: FormGroup = this.fb.group({
    usuario: [<Usuario| null>(null), [Validators.required ]],
    areamuestra_Id: ['0', [Validators.required ]],
    areasiembra_Id: ['0', [Validators.required ]],
    variedad_Id: ['0', [Validators.required ]]
  });

  constructor(private siembraService: SiembraService,
    private router: Router,
    private fb: FormBuilder,
    private usuarioServicio: UsuariosService,
    private listasService: ListasGenericasService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void 
  {
    this.listasService.getTodasListasGenericas()
    .subscribe(result => {
      this.listaAreaMuestraGlobal = result.listaAreaMuestra;
      this.listaVariedad = result.listaVariedad;
      this.listaAreaSiembra = result.listaAreaSiembra;
    });

    this.usuarioServicio.getUsuarios()
    .subscribe(result => {
      this.listaUsuarios = result; 
    });
  }

  buscarByFiltros()
  {
    if(this.miFormulario.value.areamuestra_Id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione el área de muestra');
    }
    else if(this.miFormulario.value.variedad_Id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione la variedad');
    }
    else if(this.miFormulario.value.usuario.id.toString() == '0'){
      this.mostrarSnackBar('Por favor seleccione el usuario');
    }
    else if(this.miFormulario.status != 'INVALID')
    {
      this.consultaFiltrosListaRegistroSiembra(
        parseInt(this.miFormulario.value.usuario.id),
        parseInt(this.miFormulario.value.areamuestra_Id),
        parseInt(this.miFormulario.value.variedad_Id));
    }
  }
  
  consultaFiltrosListaRegistroSiembra(usuario: number, areaMuestra_id : number, variedad_id: number)
  {
    this.siembraService.getListadoRegistroSiembra(usuario, areaMuestra_id, variedad_id)
    .subscribe( resp => {
      this.listaSiembra = resp;
    });
  }
  
  verDetalle(value: any)
  {
    this.router.navigate(['/registro-siembra', value]);  
  }

  EditarRegistro(value: any)
  {
    this.router.navigate(['/registro-siembra/editar', value]);
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
}
