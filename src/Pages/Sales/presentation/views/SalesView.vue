<template>
  <div class="sales-view">
    <div class="sales-header">
      <div>
        <h1 class="page-title">Gestión de Ventas</h1>
        <p class="page-subtitle">Administra todas tus ventas, boletas electrónicas, precios y historial de clientes desde una sola plataforma</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <SalesStats :stats="stats" />

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Sales Table -->
      <div class="main-section">
        <SalesTable />
      </div>

      <!-- Sidebar -->
      <div class="sidebar-section">
        <ElectronicInvoices />
        <PricingDiscounts />
      </div>
    </div>

    <!-- Customer History -->
    <CustomerHistory />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SalesStats from '../components/SalesStats.vue';
import SalesTable from '../components/SalesTable.vue';
import ElectronicInvoices from '../components/ElectronicInvoices.vue';
import PricingDiscounts from '../components/PricingDiscounts.vue';
import CustomerHistory from '../components/CustomerHistory.vue';

const stats = ref({
  ventasHoy: 'S/ 2,450',
  boletasEmitidas: 48,
  clientesAtendidos: 32,
  ticketPromedio: 'S/ 76.50'
});
</script>

<style scoped>
.sales-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.sales-header {
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  margin-bottom: 24px;
}

.main-section {
  min-width: 0;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
