export interface Reporteareademuestracalidad {
    labels: string [],
    datasets: CalidadesReporte[]
}

export interface CalidadesReporte{
    data: number[],
    label: string
}

export interface ReporteCalidadesPorVariedad{
    label: string,
    datasets: string
}