import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-actividad-component',
  templateUrl: './listado-actividad.component.html',
  styleUrls: ['./listado-actividad.component.css']
})

export class ListadoActividadComponent implements OnInit {
  options = {};
  columns: any = {};
  rows=[
    {
      name:"mercy",age:10,town:"Nairobi",country:"kenya"
    },
    {
      name:"Vincent",age:40,town:"Kampala",country:"Uganda"
    },
    {    
      name:"Wesley",age:41,town:"Cairo",country:"Egypt"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
