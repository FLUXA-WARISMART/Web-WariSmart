<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Ventas Hoy</div>
        <div class="stat-value">{{ stats.ventasHoy }}</div>
        <div class="stat-change positive">↑ +12.5%</div>
      </div>
      <div class="stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Productos Vendidos</div>
        <div class="stat-value">{{ stats.productosVendidos }}</div>
        <div class="stat-change positive">↑ +8.2%</div>
      </div>
      <div class="stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Stock Bajo</div>
        <div class="stat-value danger">{{ stats.stockBajo }}</div>
        <div class="stat-change negative">Crítico</div>
      </div>
      <div class="stat-icon red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Proveedores Activos</div>
        <div class="stat-value">{{ stats.proveedoresActivos }}</div>
        <div class="stat-change neutral">Sin cambios</div>
      </div>
      <div class="stat-icon purple">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      ventasHoy: 'S/15,247',
      productosVendidos: 342,
      stockBajo: 23,
      proveedoresActivos: 18
    })
  }
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.stat-value.danger {
  color: #ef4444;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-change.neutral {
  color: #666;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.green {
  background: #dcfce7;
  color: #10b981;
}

.stat-icon.blue {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-icon.red {
  background: #fee2e2;
  color: #ef4444;
}

.stat-icon.purple {
  background: #e9d5ff;
  color: #8b5cf6;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}
</style>
