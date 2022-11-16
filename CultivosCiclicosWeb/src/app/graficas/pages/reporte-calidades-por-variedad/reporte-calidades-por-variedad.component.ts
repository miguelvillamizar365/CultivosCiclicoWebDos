import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { graficaService } from 'src/app/services/graficas.service';

@Component({
  selector: 'app-reporte-calidades-por-variedad',
  templateUrl: './reporte-calidades-por-variedad.component.html',
  styles: [
  ]
})
export class ReporteCalidadesPorVariedadComponent implements OnInit {

  constructor(private graficaService: graficaService) { }

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: string[] = [' Select', ' Fancy', ' Standard'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };

  ngOnInit(): void {
    
    this.graficaService.getReporteCalidadesPorVariedad()
    .subscribe(result => {
      var lstData: number[] = [];
      var lstlabel: string[] = result.label.split(",");
      var lstString: string[] = result.datasets.split(",");
      lstString.forEach(element => {
        lstData.push(Number.parseInt(element));
      });
      lstlabel.forEach(element => {
        this.doughnutChartData.labels?.push(element);
      });
       
       this.doughnutChartData.datasets.push({data:lstData});
  });
  }
 

 // events
 public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }
}