<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Resumen general de tu negocio • Hoy, {{ fechaFormatoHoy }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <StatCard
        title="Ventas Hoy"
        value="S/8,450"
        changeText="+16,5% vs ayer"
        changeType="positive"
        :icon="salesIcon"
        iconBgColor="#dcfce7"
      />
      <StatCard
        title="Productos Vendidos"
        value="127"
        changeText="+12,3% vs ayer"
        changeType="positive"
        :icon="productsIcon"
        iconBgColor="#dbeafe"
      />
      <StatCard
        title="Stock Total"
        value="2,847"
        changeText="10 productos bajo stock"
        changeType="negative"
        :icon="stockIcon"
        iconBgColor="#fed7aa"
      />
      <StatCard
        title="Proveedores Activos"
        value="24"
        changeText="3 pedidos pendientes"
        changeType="neutral"
        :icon="suppliersIcon"
        iconBgColor="#e9d5ff"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Sales Chart -->
      <div class="chart-section">
        <SalesChart />
      </div>

      <!-- Quick Actions -->
      <div class="actions-section">
        <QuickActions @action="handleQuickAction" />
      </div>

      <!-- Low Stock Products -->
      <div class="products-section">
        <LowStockProducts />
      </div>

      <!-- Expiration Alerts -->
      <div class="alerts-section">
        <ExpirationAlerts />
      </div>

      <!-- Recent Activity -->
      <div class="activity-section">
        <RecentActivity />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from '../components/StatCard.vue';
import SalesChart from '../components/SalesChart.vue';
import QuickActions from '../components/QuickActions.vue';
import LowStockProducts from '../components/LowStockProducts.vue';
import ExpirationAlerts from '../components/ExpirationAlerts.vue';
import RecentActivity from '../components/RecentActivity.vue';
import { ref, onMounted } from 'vue';

const fechaFormatoHoy = ref('');

onMounted(() => {
  const fecha = new Date();
  fechaFormatoHoy.value = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fecha);
});

// Icons as components
const salesIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
};

const productsIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>'
};

const stockIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
};

const suppliersIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
};

const handleQuickAction = (actionId) => {
  console.log('Quick action clicked:', actionId);
  // Handle action navigation or modal opening
};
</script>

<style scoped>
.dashboard {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.chart-section {
  grid-column: span 8;
}

.actions-section {
  grid-column: span 4;
}

.products-section {
  grid-column: span 6;
}

.alerts-section {
  grid-column: span 6;
}

.activity-section {
  grid-column: span 12;
}

@media (max-width: 1200px) {
  .chart-section,
  .actions-section,
  .products-section,
  .alerts-section,
  .activity-section {
    grid-column: span 12;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .content-grid {
    gap: 16px;
  }
}
</style>
