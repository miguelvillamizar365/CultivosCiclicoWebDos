import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { graficaService } from 'src/app/services/graficas.service';

@Component({
  selector: 'app-reporte-area-demuestra-calidad',
  templateUrl: './reporte-area-demuestra-calidad.component.html',
  styles: [
  ]
})
export class ReporteAreaDemuestraCalidadComponent implements OnInit {
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  
  constructor(private graficaService: graficaService) { } 
  ngOnInit(): void {   
    
    this.graficaService.getReporteareademuestracalidad()
    .subscribe(result => {
    this.barChartData = result;
  });
  }
  
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    
  }
}
