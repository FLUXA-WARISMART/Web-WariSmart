<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Total Usuarios</div>
        <div class="stat-value">{{ stats.totalUsuarios }}</div>
        <div class="stat-change positive">+2 este mes</div>
      </div>
      <div class="stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Roles Activos</div>
        <div class="stat-value">{{ stats.rolesActivos }}</div>
        <div class="stat-change neutral">Sin cambios</div>
      </div>
      <div class="stat-icon orange">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a10 10 0 0 1 10 10 4 4 0 0 1-5 5 4 4 0 0 1-5-5 4 4 0 0 1-5 5 4 4 0 0 1-5-5 10 10 0 0 1 10-10z"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Sesiones Hoy</div>
        <div class="stat-value">{{ stats.sesionesHoy }}</div>
        <div class="stat-change positive">+5 vs ayer</div>
      </div>
      <div class="stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Rendimiento</div>
        <div class="stat-value">{{ stats.rendimiento }}</div>
        <div class="stat-change positive">+3% esta semana</div>
      </div>
      <div class="stat-icon purple">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
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
      totalUsuarios: 24,
      rolesActivos: 6,
      sesionesHoy: 18,
      rendimiento: '92%'
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

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
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

.stat-icon.blue {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-icon.orange {
  background: #fed7aa;
  color: #f59e0b;
}

.stat-icon.green {
  background: #dcfce7;
  color: #10b981;
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
