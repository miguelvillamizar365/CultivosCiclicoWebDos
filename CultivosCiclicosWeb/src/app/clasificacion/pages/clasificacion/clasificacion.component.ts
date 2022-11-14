import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ClasificacionService } from 'src/app/services/clasificacion.service';
import { ListaClasificacion } from 'src/app/usuarios/interfaces/listadoClasificacionSiembra.interface';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: []
})
export class ClasificacionComponent implements OnInit {

  clasificacion!: ListaClasificacion;
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, 
    private clasificacionService: ClasificacionService,
    private router: Router) { }

  ngOnInit() :void  {
     this.routeSub = this.route.params.pipe(switchMap( ({id}) => this.clasificacionService.getClasificacionPorId(id) ))
     .subscribe( resp => { this.clasificacion = resp; });
    }

    regresar(){
      this.router.navigate(['/clasificacion/listado']);
    }
}
