import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario-tarjeta',
  templateUrl: './usuario-tarjeta.component.html',
  styles: [`
  mat-card{ 
    margin-top: 20px }
  `]
})
export class UsuarioTarjetaComponent implements OnInit {

  @Input() usuario!: Usuario;
  constructor() { }

  ngOnInit(): void {
  }

}
