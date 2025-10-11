// Domain Model - Sale
export class Sale {
    constructor({ id, boleta, cliente, productos, total, fecha, estado }) {
        this.id = id;
        this.boleta = boleta;
        this.cliente = cliente;
        this.productos = productos;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
    }

    isPaid() {
        return this.estado === 'Pagado';
    }

    isPending() {
        return this.estado === 'Pendiente';
    }
}

export class SalesStats {
    constructor({ ventasHoy, boletasEmitidas, clientesAtendidos, ticketPromedio }) {
        this.ventasHoy = ventasHoy;
        this.boletasEmitidas = boletasEmitidas;
        this.clientesAtendidos = clientesAtendidos;
        this.ticketPromedio = ticketPromedio;
    }
}

export class Customer {
    constructor({ id, nombre, tipo, totalCompras, ultimaCompra, productosFavoritos }) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.totalCompras = totalCompras;
        this.ultimaCompra = ultimaCompra;
        this.productosFavoritos = productosFavoritos;
    }

    isFrequent() {
        return this.tipo === 'Cliente frecuente';
    }

    isNew() {
        return this.tipo === 'Nuevo cliente';
    }
}
