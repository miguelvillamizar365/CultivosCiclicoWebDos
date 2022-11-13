import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { SiembraService } from 'src/app/services/siembra.service';
import { Siembra } from '../../../usuarios/interfaces/siembra.interface';

@Component({
  selector: 'app-registro-siembra',
  templateUrl: './registro-siembra.component.html',
  styleUrls: []
})
export class RegistroSiembraComponent implements OnInit {

  siembra!: Siembra;
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, 
    private siembraService: SiembraService,
    private router: Router) { }

  ngOnInit() :void  {
     this.routeSub = this.route.params.pipe(switchMap( ({id}) => this.siembraService.getSiembraPorId(id) ))
     .subscribe( resp => { this.siembra = resp; });
    }

    regresar(){
      this.router.navigate(['/registro-siembra/listado']);
    }
}
