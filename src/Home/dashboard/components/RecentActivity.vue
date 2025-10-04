<template>
  <div class="activity-card">
    <div class="card-header">
      <h3 class="section-title">Actividad Reciente</h3>
      <button class="view-all-link">Ver todo</button>
    </div>
    <div class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
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
</template>

<script setup>
import { ref } from 'vue';

const activities = ref([
  {
    id: 1,
    title: 'Nueva venta registrada',
    description: 'Venta #VT-2024-0847 por $125.50',
    time: 'Hace 5 min',
    color: '#dcfce7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>' }
  },
  {
    id: 2,
    title: 'Producto agregado al inventario',
    description: 'Leche Entera 1L - 30 unidades',
    time: 'Hace 15 min',
    color: '#dbeafe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' }
  },
  {
    id: 3,
    title: 'Pedido recibido de proveedor',
    description: 'Distribuidora Norte - Orden #PS-2024-15E',
    time: 'Hace 1 hora',
    color: '#ede9fe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' }
  },
  {
    id: 4,
    title: 'Alerta de stock bajo',
    description: 'Agua Mineral 500ml - Solo quedan 3 unidades',
    time: 'Hace 2 horas',
    color: '#fef3c7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' }
  }
]);
</script>

<style scoped>
.activity-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.view-all-link {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.view-all-link:hover {
  text-decoration: underline;
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
