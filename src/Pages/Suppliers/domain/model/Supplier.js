// Domain Model - Supplier
export class Supplier {
    constructor({ id, nombre, idCode, categoria, contacto, ordenes, descuento, estado, icon }) {
        this.id = id;
        this.nombre = nombre;
        this.idCode = idCode;
        this.categoria = categoria;
        this.contacto = contacto;
        this.ordenes = ordenes;
        this.descuento = descuento;
        this.estado = estado;
        this.icon = icon;
    }

    isActive() {
        return this.estado === 'Activo';
    }

    isInactive() {
        return this.estado === 'Inactivo';
    }

    hasActiveOrders() {
        return this.ordenes > 0;
    }
}

export class SuppliersStats {
    constructor({ totalProveedores, ordenesActivas, pendientesPago, descuentosActivos }) {
        this.totalProveedores = totalProveedores;
        this.ordenesActivas = ordenesActivas;
        this.pendientesPago = pendientesPago;
        this.descuentosActivos = descuentosActivos;
    }
}
