// Domain Model - Product
export class Product {
    constructor({ id, name, code, category, stockActual, stockMin, ubicacion, precio, estado, image }) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.category = category;
        this.stockActual = stockActual;
        this.stockMin = stockMin;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.estado = estado;
        this.image = image;
    }

    isLowStock() {
        return this.stockActual <= this.stockMin;
    }

    isOutOfStock() {
        return this.stockActual === 0;
    }
}

export class InventoryStats {
    constructor({ totalProducts, lowStock, expiring, totalValue }) {
        this.totalProducts = totalProducts;
        this.lowStock = lowStock;
        this.expiring = expiring;
        this.totalValue = totalValue;
    }
}
