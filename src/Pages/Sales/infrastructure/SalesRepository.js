// Infrastructure - Sales Repository
export class SalesRepository {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async fetchSalesStats() {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/sales/stats');
        return null;
    }

    async fetchSales(filters) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/sales', { params: filters });
        return null;
    }

    async createSale(saleData) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.post('/api/sales', saleData);
        return null;
    }

    async fetchCustomers(filters) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/customers', { params: filters });
        return null;
    }

    async fetchCustomerHistory(customerId) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get(`/api/customers/${customerId}/history`);
        return null;
    }
}
