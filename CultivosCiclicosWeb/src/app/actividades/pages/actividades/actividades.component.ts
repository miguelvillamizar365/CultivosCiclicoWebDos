import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Actividades } from '../../interfaces/actividades.interface';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: []
})
export class ActividadesComponent implements OnInit {
  
  actividad!: Actividades;
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, 
    private actividadService: ActividadesService,
    private router: Router) { }

  ngOnInit() :void  {
     this.routeSub = this.route.params.pipe(switchMap( ({id}) => this.actividadService.getActividadPorId(id) ))
     .subscribe( resp => { this.actividad = resp; });
    }

    regresar(){
      this.router.navigate(['/actividades/listado']);
    }
}
