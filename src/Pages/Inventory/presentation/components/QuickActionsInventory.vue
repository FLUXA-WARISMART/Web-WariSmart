<template>
  <div class="quick-actions-grid">
    <div v-for="action in actions" :key="action.id" class="action-card">
      <div class="action-icon" :style="{ backgroundColor: action.color }">
        <component :is="action.icon" />
      </div>
      <div class="action-content">
        <h4 class="action-title">{{ action.title }}</h4>
        <p class="action-description">{{ action.description }}</p>
        <button class="action-link">{{ action.linkText }} →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const actions = ref([
  {
    id: 1,
    title: 'Recepción de Mercadería',
    description: 'Registra la entrada de nuevos productos al inventario',
    linkText: 'Iniciar recepción',
    color: '#dbeafe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>' }
  },
  {
    id: 2,
    title: 'Auditoría de Inventario',
    description: 'Verifica y ajusta el stock físico vs sistema',
    linkText: 'Nueva auditoría',
    color: '#fef3c7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' }
  },
  {
    id: 3,
    title: 'Registro de Mermas',
    description: 'Documenta productos dañados o vencidos',
    linkText: 'Registrar merma',
    color: '#fee2e2',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' }
  },
  {
    id: 4,
    title: 'Devoluciones',
    description: 'Procesa productos devueltos por clientes',
    linkText: 'Nueva devolución',
    color: '#dcfce7',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>' }
  }
]);
</script>

<style scoped>
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 16px;
}

.action-icon svg {
  width: 28px;
  height: 28px;
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
  line-height: 1.5;
}

.action-link {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.action-link:hover {
  color: #2563eb;
}
</style>
