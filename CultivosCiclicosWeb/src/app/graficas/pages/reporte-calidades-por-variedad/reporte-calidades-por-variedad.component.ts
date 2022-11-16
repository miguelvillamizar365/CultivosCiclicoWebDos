import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-reporte-calidades-por-variedad',
  templateUrl: './reporte-calidades-por-variedad.component.html',
  styles: [
  ]
})
export class ReporteCalidadesPorVariedadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 // Doughnut
 public doughnutChartLabels: string[] = [ 'Fancy', 'Select', 'Standard' ];
 public doughnutChartData: ChartData<'doughnut'> = {
   labels: this.doughnutChartLabels,
   datasets: [
     { data: [ 19743  ,9210, 14443 ] }
   ]
 };
 
 public doughnutChartType: ChartType = 'doughnut';

 // events
 public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }
}