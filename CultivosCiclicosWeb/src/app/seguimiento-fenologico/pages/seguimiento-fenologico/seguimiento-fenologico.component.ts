import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { SeguimientofenologicoService } from 'src/app/services/seguimientofenologico.service';
import { Seguimientofenologico } from '../../../usuarios/interfaces/seguimientofenologico.interface';
@Component({
  selector: 'app-seguimiento-fenologico',  
  templateUrl: './seguimiento-fenologico.component.html',
  styleUrls: []
})
export class SeguimientoFenologicoComponent implements OnInit {
  seguimientofenologico!: Seguimientofenologico;
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, 
    private seguimientofenologicoService: SeguimientofenologicoService,
    private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(switchMap( ({id}) => this.seguimientofenologicoService.getSeguimientoPorId(id) ))
     .subscribe( resp => { this.seguimientofenologico = resp; });
  }
  regresar(){
    this.router.navigate(['/seguimiento-fenologico/listado']);
  }
}
