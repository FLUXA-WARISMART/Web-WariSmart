// Infrastructure - Dashboard Repository
export class DashboardRepository {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async fetchDashboardStats() {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/dashboard/stats');
        return null;
    }

    async fetchRecentActivity() {
        // TODO: Implementar llamada a la API
        // return await this.apiClient.get('/api/dashboard/activity');
        return null;
    }
}
