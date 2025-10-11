<template>
  <div class="suppliers-table-container">
    <div class="table-header">
      <div class="filters">
        <select class="filter-select">
          <option>Todos los proveedores (24)</option>
          <option>Activos</option>
          <option>Inactivos</option>
        </select>
        <select class="filter-select">
          <option>Todas las categorías</option>
          <option>Alimentos</option>
          <option>Bebidas</option>
          <option>Limpieza</option>
          <option>Electrónicos</option>
        </select>
        <button class="filter-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          Filtros
        </button>
      </div>
      <div class="view-toggle">
        <button class="view-button active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button class="view-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="suppliers-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Proveedor</th>
            <th>Categoría</th>
            <th>Contacto</th>
            <th>Órdenes</th>
            <th>Descuento</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in suppliers" :key="supplier.id">
            <td><input type="checkbox" /></td>
            <td>
              <div class="supplier-cell">
                <div class="supplier-icon" :style="{ backgroundColor: supplier.iconBg }">
                  <component :is="supplier.icon" />
                </div>
                <div>
                  <div class="supplier-name">{{ supplier.nombre }}</div>
                  <div class="supplier-id">ID: {{ supplier.idCode }}</div>
                </div>
              </div>
            </td>
            <td>
              <span :class="['category-badge', supplier.categoria.toLowerCase()]">
                {{ supplier.categoria }}
              </span>
            </td>
            <td>
              <div class="contact-info">
                <div>{{ supplier.contacto.nombre }}</div>
                <div class="contact-email">{{ supplier.contacto.email }}</div>
              </div>
            </td>
            <td>
              <span class="orders-count">{{ supplier.ordenes }} activas</span>
            </td>
            <td>
              <span class="discount-value">{{ supplier.descuento }}</span>
            </td>
            <td>
              <span :class="['status-badge', supplier.estado.toLowerCase()]">
                {{ supplier.estado }}
              </span>
            </td>
            <td>
              <button class="action-button">⋯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="showing-text">Mostrando 1 a 5 de 24 proveedores</div>
      <div class="pagination">
        <button class="page-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button class="page-button active">1</button>
        <button class="page-button">2</button>
        <button class="page-button">3</button>
        <button class="page-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const suppliers = ref([
  {
    id: 1,
    nombre: 'Distribuidora San Miguel',
    idCode: 'DSM001',
    categoria: 'Alimentos',
    contacto: { nombre: 'Carlos Mendoza', email: 'carlos@dsm.com' },
    ordenes: 8,
    descuento: '15%',
    estado: 'Activo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' },
    iconBg: '#dcfce7'
  },
  {
    id: 2,
    nombre: 'Bebidas Premium SA',
    idCode: 'BPR002',
    categoria: 'Bebidas',
    contacto: { nombre: 'Ana García', email: 'ana@bebidas.com' },
    ordenes: 3,
    descuento: '10%',
    estado: 'Activo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
    iconBg: '#e9d5ff'
  },
  {
    id: 3,
    nombre: 'Productos de Limpieza López',
    idCode: 'PLL003',
    categoria: 'Limpieza',
    contacto: { nombre: 'Roberto López', email: 'roberto@limpieza.com' },
    ordenes: 5,
    descuento: '8%',
    estado: 'Activo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
    iconBg: '#fed7aa'
  },
  {
    id: 4,
    nombre: 'TechnoMax Electronics',
    idCode: 'TME004',
    categoria: 'Electrónicos',
    contacto: { nombre: 'María Rodríguez', email: 'maria@techno.com' },
    ordenes: 2,
    descuento: '12%',
    estado: 'Activo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
    iconBg: '#dbeafe'
  },
  {
    id: 5,
    nombre: 'Carnes y Embutidos Central',
    idCode: 'CEC005',
    categoria: 'Alimentos',
    contacto: { nombre: 'José Martínez', email: 'jose@carnes.com' },
    ordenes: 0,
    descuento: '0%',
    estado: 'Inactivo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' },
    iconBg: '#fee2e2'
  }
]);
</script>

<style scoped>
.suppliers-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-button:hover {
  background: #f9fafb;
}

.filter-button svg {
  width: 16px;
  height: 16px;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-button {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.view-button:hover {
  background: #f9fafb;
}

.view-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.view-button svg {
  width: 18px;
  height: 18px;
}

.table-wrapper {
  overflow-x: auto;
}

.suppliers-table {
  width: 100%;
  border-collapse: collapse;
}

.suppliers-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.suppliers-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.suppliers-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1a1a1a;
}

.supplier-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.supplier-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.supplier-icon svg {
  width: 24px;
  height: 24px;
}

.supplier-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.supplier-id {
  font-size: 12px;
  color: #666;
}

.category-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.category-badge.alimentos {
  background: #dcfce7;
  color: #10b981;
}

.category-badge.bebidas {
  background: #e9d5ff;
  color: #8b5cf6;
}

.category-badge.limpieza {
  background: #fed7aa;
  color: #f59e0b;
}

.category-badge.electrónicos {
  background: #dbeafe;
  color: #3b82f6;
}

.contact-info {
  line-height: 1.5;
}

.contact-email {
  font-size: 12px;
  color: #666;
}

.orders-count {
  color: #666;
}

.discount-value {
  font-weight: 600;
  color: #10b981;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.activo {
  background: #dcfce7;
  color: #10b981;
}

.status-badge.inactivo {
  background: #f3f4f6;
  color: #666;
}

.action-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
}

.action-button:hover {
  color: #1a1a1a;
}

.table-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.showing-text {
  font-size: 14px;
  color: #666;
}

.pagination {
  display: flex;
  gap: 8px;
}

.page-button {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.page-button:hover {
  background: #f9fafb;
}

.page-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.page-button svg {
  width: 16px;
  height: 16px;
}
</style>
