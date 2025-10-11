<template>
  <div class="expiration-card">
    <div class="card-header">
      <h3 class="section-title">Alertas de Vencimiento</h3>
      <span class="badge">{{ alerts.length }} próximas</span>
    </div>
    <div class="alerts-list">
      <div v-for="alert in alerts" :key="alert.id" class="alert-item">
        <div class="alert-icon">
          <div class="icon-placeholder">⚠️</div>
        </div>
        <div class="alert-info">
          <div class="alert-name">{{ alert.name }}</div>
          <div class="alert-date" :class="alert.urgency">{{ alert.expiryText }}</div>
        </div>
        <div class="alert-stock">
          <div class="stock-value">{{ alert.units }} unidades</div>
          <div class="stock-date">{{ alert.date }}</div>
        </div>
      </div>
    </div>
    <button class="view-all-button">Ver todas las alertas</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const alerts = ref([
  { id: 1, name: 'Queso Fresco', expiryText: 'Vence hoy', urgency: 'critical', units: 15, date: '28/09/2024' },
  { id: 2, name: 'Manzanas Rojas', expiryText: 'Vence en 2 días', urgency: 'warning', units: 32, date: '30/09/2024' },
  { id: 3, name: 'Zanahorias', expiryText: 'Vence en 5 días', urgency: 'info', units: 28, date: '03/10/2024' }
]);
</script>

<style scoped>
.expiration-card {
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

.badge {
  background: #fef2f2;
  color: #dc2626;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fffbeb;
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}

.alert-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-placeholder {
  font-size: 20px;
}

.alert-info {
  flex: 1;
}

.alert-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.alert-date {
  font-size: 12px;
  font-weight: 600;
}

.alert-date.critical {
  color: #dc2626;
}

.alert-date.warning {
  color: #f59e0b;
}

.alert-date.info {
  color: #3b82f6;
}

.alert-stock {
  text-align: right;
}

.stock-value {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.stock-date {
  font-size: 11px;
  color: #999;
}

.view-all-button {
  width: 100%;
  padding: 10px;
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.view-all-button:hover {
  background: #f0f9ff;
}
</style>
