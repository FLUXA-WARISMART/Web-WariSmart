// Domain Model - Report
export class ReportStats {
    constructor({ ventasHoy, productosVendidos, stockBajo, proveedoresActivos }) {
        this.ventasHoy = ventasHoy;
        this.productosVendidos = productosVendidos;
        this.stockBajo = stockBajo;
        this.proveedoresActivos = proveedoresActivos;
    }
}

export class FinancialSummary {
    constructor({ ingresos, gastos, ganancia }) {
        this.ingresos = ingresos;
        this.gastos = gastos;
        this.ganancia = ganancia;
    }
}
