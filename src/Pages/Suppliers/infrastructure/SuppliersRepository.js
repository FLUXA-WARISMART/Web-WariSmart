// Infrastructure - Suppliers Repository
export class SuppliersRepository {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async fetchSuppliersStats() {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/suppliers/stats');
        return null;
    }

    async fetchSuppliers(filters) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/suppliers', { params: filters });
        return null;
    }

    async createSupplier(supplierData) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.post('/api/suppliers', supplierData);
        return null;
    }

    async updateSupplier(id, supplierData) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.put(`/api/suppliers/${id}`, supplierData);
        return null;
    }

    async deleteSupplier(id) {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.delete(`/api/suppliers/${id}`);
        return null;
    }
}
