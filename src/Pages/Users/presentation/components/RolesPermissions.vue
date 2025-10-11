<template>
  <div class="roles-card">
    <div class="card-header">
      <h3 class="card-title">Roles y Permisos</h3>
      <button class="btn-new-role">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Nuevo Rol
      </button>
    </div>

    <div class="roles-list">
      <div v-for="role in roles" :key="role.id" class="role-item">
        <div class="role-icon" :style="{ backgroundColor: role.color }">
          <component :is="role.icon" />
        </div>
        <div class="role-info">
          <div class="role-name">{{ role.nombre }}</div>
          <div class="role-description">{{ role.descripcion }}</div>
        </div>
        <div class="role-users">
          <span class="users-badge" :style="{ backgroundColor: role.badgeColor }">
            {{ role.usuariosCount }} usuarios
          </span>
        </div>
        <button class="role-edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const roles = ref([
  {
    id: 1,
    nombre: 'Administrador',
    descripcion: 'Acceso completo al sistema',
    usuariosCount: 3,
    color: '#fee2e2',
    badgeColor: '#fecaca',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10 4 4 0 0 1-5 5 4 4 0 0 1-5-5 4 4 0 0 1-5 5 4 4 0 0 1-5-5 10 10 0 0 1 10-10z"/></svg>' }
  },
  {
    id: 2,
    nombre: 'Gerente',
    descripcion: 'Gestión de inventario y reportes',
    usuariosCount: 5,
    color: '#dbeafe',
    badgeColor: '#bfdbfe',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' }
  },
  {
    id: 3,
    nombre: 'Vendedor',
    descripcion: 'Gestión de ventas y clientes',
    usuariosCount: 12,
    color: '#dcfce7',
    badgeColor: '#bbf7d0',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>' }
  },
  {
    id: 4,
    nombre: 'Almacenista',
    descripcion: 'Control de inventario únicamente',
    usuariosCount: 4,
    color: '#fef3c7',
    badgeColor: '#fde68a',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' }
  }
]);
</script>

<style scoped>
.roles-card {
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

.btn-new-role {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-new-role:hover {
  background: #2563eb;
}

.btn-new-role svg {
  width: 16px;
  height: 16px;
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 10px;
  transition: background 0.2s;
}

.role-item:hover {
  background: #f3f4f6;
}

.role-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-icon svg {
  width: 24px;
  height: 24px;
}

.role-info {
  flex: 1;
}

.role-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.role-description {
  font-size: 13px;
  color: #666;
}

.role-users {
  margin-right: 8px;
}

.users-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;
}

.role-edit {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.role-edit:hover {
  background: #e5e7eb;
}

.role-edit svg {
  width: 16px;
  height: 16px;
  color: #666;
}
</style>
