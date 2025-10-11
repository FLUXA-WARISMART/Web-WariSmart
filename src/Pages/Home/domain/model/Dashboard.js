// Domain Model - Dashboard
export class DashboardStats {
    constructor({ salesToday, productsSold, totalStock, activeSuppliers }) {
        this.salesToday = salesToday;
        this.productsSold = productsSold;
        this.totalStock = totalStock;
        this.activeSuppliers = activeSuppliers;
    }
}

export class QuickAction {
    constructor({ id, title, subtitle, icon, color }) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.icon = icon;
        this.color = color;
    }
}
