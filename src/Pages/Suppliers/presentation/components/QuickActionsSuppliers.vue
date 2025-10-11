<template>
  <div class="quick-actions-grid">
    <div v-for="action in actions" :key="action.id" class="action-card">
      <div class="action-icon" :style="{ backgroundColor: action.color }">
        <component :is="action.icon" />
      </div>
      <div class="action-content">
        <h4 class="action-title">{{ action.title }}</h4>
        <p class="action-description">{{ action.description }}</p>
        <button class="action-button">{{ action.buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const actions = ref([
  {
    id: 1,
    title: 'Crear Orden de Compra',
    description: 'Generar nueva orden a proveedores',
    buttonText: 'Crear Orden',
    color: '#dbeafe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>' }
  },
  {
    id: 2,
    title: 'Negociar Descuentos',
    description: 'Gestionar precios por volumen',
    buttonText: 'Ver Negociaciones',
    color: '#dcfce7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' }
  },
  {
    id: 3,
    title: 'Gestionar Devoluciones',
    description: 'Procesar devoluciones pendientes',
    buttonText: 'Ver Devoluciones',
    color: '#fed7aa',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>' }
  }
]);
</script>

<style scoped>
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon svg {
  width: 28px;
  height: 28px;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.action-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
}

.action-button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.action-button:hover {
  background: #2563eb;
}
</style>
