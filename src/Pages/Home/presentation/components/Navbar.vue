<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h1 class="brand-name">WARISMART</h1>
    </div>
    
    <div class="navbar-menu">
      <router-link 
        v-for="item in menuItems" 
        :key="item.id"
        :to="item.to"
        :class="['menu-item']"
        active-class="active"
      >
        {{ item.label }}
      </router-link>
    </div>
    
    <div class="navbar-actions">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Buscar..." class="search-input" />
      </div>
      
      <button class="notification-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="notification-badge">4</span>
      </button>
      
      <div class="user-menu">
        <div class="user-avatar">JD</div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { id: 'dashboard', label: 'Dashboard', to: '/' },
  { id: 'inventory', label: 'Inventario', to: '/inventario' },
  { id: 'sales', label: 'Ventas', to: '/ventas' },
  { id: 'suppliers', label: 'Proveedores', to: '/proveedores' },
  { id: 'reports', label: 'Reportes', to: '#' },
  { id: 'users', label: 'Gestión de usuarios', to: '#' },
  { id: 'config', label: 'Configuración', to: '#' }
]);
</script>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
  letter-spacing: -0.5px;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.menu-item {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.menu-item:hover {
  background: #f3f4f6;
  color: #1a1a1a;
}

.menu-item.active {
  background: #eff6ff;
  color: #3b82f6;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #9ca3af;
}

.search-input {
  padding: 8px 12px 8px 38px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  width: 280px;
}

.notification-button {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.notification-button:hover {
  background: #f3f4f6;
}

.notification-button svg {
  width: 20px;
  height: 20px;
  color: #666;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.user-menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
</style>
