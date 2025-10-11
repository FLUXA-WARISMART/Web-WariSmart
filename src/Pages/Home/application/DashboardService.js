// Application Service - Dashboard
export class DashboardService {
    constructor() {
        // Aquí se inyectarán los repositorios cuando estén disponibles
    }

    async getDashboardStats() {
        // TODO: Implementar llamada al repositorio
        return {
            salesToday: 'S/8,450',
            productsSold: 127,
            totalStock: 2847,
            activeSuppliers: 24
        };
    }

    async getRecentActivity() {
        // TODO: Implementar llamada al repositorio
        return [];
    }
}
