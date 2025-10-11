<template>
  <div class="quick-actions-card">
    <h3 class="section-title">Accesos Rápidos</h3>
    <div class="actions-list">
      <button 
        v-for="action in actions" 
        :key="action.id"
        class="action-button"
        @click="handleAction(action.id)"
      >
        <div class="action-icon" :style="{ backgroundColor: action.color }">
          <component :is="action.icon" />
        </div>
        <div class="action-content">
          <div class="action-title">{{ action.title }}</div>
          <div class="action-subtitle">{{ action.subtitle }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['action']);

const actions = [
  {
    id: 'new-sale',
    title: 'Nueva Venta',
    subtitle: 'Registrar venta rápida',
    color: '#3b82f6',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' }
  },
  {
    id: 'add-product',
    title: 'Agregar Producto',
    subtitle: 'Nuevo producto al inventario',
    color: '#10b981',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' }
  },
  {
    id: 'new-supplier',
    title: 'Nuevo Proveedor',
    subtitle: 'Registrar proveedor',
    color: '#8b5cf6',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
  },
  {
    id: 'reports',
    title: 'Ver Reportes',
    subtitle: 'Análisis detallado',
    color: '#f59e0b',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' }
  }
];

const handleAction = (actionId) => {
  emit('action', actionId);
};
</script>

<style scoped>
.quick-actions-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: none;
  background: #f9fafb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.action-button:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.action-subtitle {
  font-size: 13px;
  color: #666;
}
</style>
