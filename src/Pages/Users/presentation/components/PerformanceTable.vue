<template>
  <div class="performance-card">
    <div class="card-header">
      <h3 class="card-title">Desempeño del Personal</h3>
      <div class="header-actions">
        <select class="period-select">
          <option>Esta semana</option>
          <option>Este mes</option>
          <option>Este año</option>
        </select>
        <button class="export-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="performance-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Horas Trabajadas</th>
            <th>Tareas Completadas</th>
            <th>Rendimiento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <div class="user-cell">
                <div class="user-avatar">{{ user.initials }}</div>
                <div>
                  <div class="user-name">{{ user.nombre }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <span :class="['role-badge', user.rol.toLowerCase()]">
                {{ user.rol }}
              </span>
            </td>
            <td>{{ user.horasTrabajadas }}</td>
            <td>{{ user.tareasCompletadas }}</td>
            <td>
              <div class="performance-bar">
                <div class="performance-fill" :style="{ width: user.rendimiento, backgroundColor: getPerformanceColor(user.rendimiento) }"></div>
                <span class="performance-text">{{ user.rendimiento }}</span>
              </div>
            </td>
            <td>
              <span :class="['status-badge', user.estado.toLowerCase()]">
                <span class="status-dot"></span>
                {{ user.estado }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  {
    id: 1,
    nombre: 'Ana García',
    email: 'ana.garcia@warismart.com',
    initials: 'AG',
    rol: 'Administrador',
    horasTrabajadas: '42h',
    tareasCompletadas: '28/30',
    rendimiento: '93%',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    email: 'carlos.ruiz@warismart.com',
    initials: 'CR',
    rol: 'Gerente',
    horasTrabajadas: '40h',
    tareasCompletadas: '22/25',
    rendimiento: '88%',
    estado: 'Activo'
  },
  {
    id: 3,
    nombre: 'María López',
    email: 'maria.lopez@warismart.com',
    initials: 'ML',
    rol: 'Vendedor',
    horasTrabajadas: '38h',
    tareasCompletadas: '35/40',
    rendimiento: '87%',
    estado: 'Activo'
  },
  {
    id: 4,
    nombre: 'Diego Morales',
    email: 'diego.morales@warismart.com',
    initials: 'DM',
    rol: 'Almacenista',
    horasTrabajadas: '38h',
    tareasCompletadas: '18/20',
    rendimiento: '90%',
    estado: 'Inactivo'
  }
]);

const getPerformanceColor = (performance) => {
  const value = parseInt(performance);
  if (value >= 90) return '#10b981';
  if (value >= 80) return '#10b981';
  if (value >= 70) return '#f59e0b';
  return '#ef4444';
};
</script>

<style scoped>
.performance-card {
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

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.period-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.export-button {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.export-button:hover {
  background: #f9fafb;
}

.export-button svg {
  width: 18px;
  height: 18px;
  color: #666;
}

.table-wrapper {
  overflow-x: auto;
}

.performance-table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.performance-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.performance-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1a1a1a;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.user-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.user-email {
  font-size: 12px;
  color: #666;
}

.role-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.role-badge.administrador {
  background: #fee2e2;
  color: #dc2626;
}

.role-badge.gerente {
  background: #dbeafe;
  color: #2563eb;
}

.role-badge.vendedor {
  background: #dcfce7;
  color: #16a34a;
}

.role-badge.almacenista {
  background: #fef3c7;
  color: #ca8a04;
}

.performance-bar {
  position: relative;
  width: 120px;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.performance-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
}

.performance-text {
  position: absolute;
  right: -40px;
  top: -8px;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.activo {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.inactivo {
  background: #f3f4f6;
  color: #6b7280;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
</style>
