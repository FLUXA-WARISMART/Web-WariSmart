<template>
  <div class="suppliers-view">
    <div class="suppliers-header">
      <div>
        <h1 class="page-title">Proveedores</h1>
        <p class="page-subtitle">Gestiona tus proveedores, negocia precios y controla órdenes de compra desde una sola plataforma</p>
      </div>
      <div class="header-actions">
        <button class="btn-export">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar
        </button>
        <button class="btn-new">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Proveedor
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <SuppliersStats :stats="stats" />

    <!-- Suppliers Table -->
    <SuppliersTable />

    <!-- Quick Actions -->
    <QuickActionsSuppliers />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SuppliersStats from '../components/SuppliersStats.vue';
import SuppliersTable from '../components/SuppliersTable.vue';
import QuickActionsSuppliers from '../components/QuickActionsSuppliers.vue';

const stats = ref({
  totalProveedores: 24,
  ordenesActivas: 12,
  pendientesPago: '$45,200',
  descuentosActivos: 8
});
</script>

<style scoped>
.suppliers-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.suppliers-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-export,
.btn-new {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-export {
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;
}

.btn-export:hover {
  background: #f9fafb;
}

.btn-new {
  background: #3b82f6;
  color: white;
}

.btn-new:hover {
  background: #2563eb;
}

.btn-export svg,
.btn-new svg {
  width: 18px;
  height: 18px;
}
</style>
