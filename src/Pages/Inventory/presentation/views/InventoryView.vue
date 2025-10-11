<template>
  <div class="inventory-view">
    <div class="inventory-header">
      <div>
        <h1 class="page-title">Gestión de Inventario</h1>
        <p class="page-subtitle">Control completo de productos, stock y movimientos</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar
        </button>
        <button class="btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Producto
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <InventoryStats :stats="stats" />

    <!-- Tabs Navigation -->
    <div class="tabs-container">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Products Table -->
    <ProductsTable v-if="activeTab === 'products'" />

    <!-- Quick Actions -->
    <QuickActionsInventory />

    <!-- Recent Activity -->
    <div class="recent-activity">
      <h3 class="section-title">Actividad Reciente</h3>
      <div class="activity-list">
        <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
          <div class="activity-icon" :style="{ backgroundColor: activity.color }">
            <component :is="activity.icon" />
          </div>
          <div class="activity-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-description">{{ activity.description }}</div>
          </div>
          <div class="activity-time">{{ activity.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InventoryStats from '../components/InventoryStats.vue';
import ProductsTable from '../components/ProductsTable.vue';
import QuickActionsInventory from '../components/QuickActionsInventory.vue';

const stats = ref({
  totalProducts: 1247,
  lowStock: 23,
  expiring: 8,
  totalValue: 'S/89,450'
});

const activeTab = ref('products');

const tabs = [
  {
    id: 'products',
    label: 'Productos',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' }
  },
  {
    id: 'locations',
    label: 'Ubicaciones',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' }
  },
  {
    id: 'alerts',
    label: 'Alertas',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' }
  },
  {
    id: 'losses',
    label: 'Mermas',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' }
  },
  {
    id: 'audits',
    label: 'Auditorías',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' }
  },
  {
    id: 'receptions',
    label: 'Recepciones',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>' }
  },
  {
    id: 'returns',
    label: 'Devoluciones',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>' }
  }
];

const recentActivity = ref([
  {
    id: 1,
    title: 'Recepción de mercadería',
    description: '20 unidades de iPhone 14 Pro agregadas',
    time: 'Hace 2 horas',
    color: '#dcfce7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' }
  },
  {
    id: 2,
    title: 'Alerta de stock bajo',
    description: 'MacBook Air M2 tiene solo 3 unidades',
    time: 'Hace 4 horas',
    color: '#fed7aa',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>' }
  },
  {
    id: 3,
    title: 'Auditoría completada',
    description: 'Sección Electrónicos - Almacén Principal',
    time: 'Ayer',
    color: '#dbeafe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' }
  }
]);
</script>

<style scoped>
.inventory-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.inventory-header {
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

.btn-primary,
.btn-secondary {
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

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #10b981;
  color: white;
}

.btn-secondary:hover {
  background: #059669;
}

.btn-primary svg,
.btn-secondary svg {
  width: 18px;
  height: 18px;
}

.tabs-container {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e5e7eb;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab svg {
  width: 16px;
  height: 16px;
}

.tab:hover {
  color: #1a1a1a;
}

.tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 20px;
  height: 20px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.activity-description {
  font-size: 13px;
  color: #666;
}

.activity-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}
</style>
