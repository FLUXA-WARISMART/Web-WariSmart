// Domain Model - Settings
export class BusinessSettings {
    constructor({ nombre, direccion, telefono, email }) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
    }
}

export class InventorySettings {
    constructor({ alertasStockBajo, cantidadMinimaAlerta, codigosBarras, metodoValoracion }) {
        this.alertasStockBajo = alertasStockBajo;
        this.cantidadMinimaAlerta = cantidadMinimaAlerta;
        this.codigosBarras = codigosBarras;
        this.metodoValoracion = metodoValoracion;
    }
}

export class SalesSettings {
    constructor({ moneda, iva, descuentosAutomaticos, numeracionFacturas }) {
        this.moneda = moneda;
        this.iva = iva;
        this.descuentosAutomaticos = descuentosAutomaticos;
        this.numeracionFacturas = numeracionFacturas;
    }
}

export class SystemSettings {
    constructor({ zonaHoraria, idioma, respaldoAutomatico }) {
        this.zonaHoraria = zonaHoraria;
        this.idioma = idioma;
        this.respaldoAutomatico = respaldoAutomatico;
    }
}
