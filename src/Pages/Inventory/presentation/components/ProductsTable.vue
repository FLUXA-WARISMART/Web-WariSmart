<template>
  <div class="products-table-container">
    <div class="table-header">
      <div class="filters">
        <select class="filter-select">
          <option>Todas las categorías</option>
          <option>Electrónicos</option>
          <option>Ropa</option>
          <option>Hogar</option>
        </select>
        <select class="filter-select">
          <option>Todas las ubicaciones</option>
          <option>Almacén Principal</option>
          <option>Tienda 1</option>
          <option>Tienda 2</option>
        </select>
        <select class="filter-select">
          <option>Estado del stock</option>
          <option>En Stock</option>
          <option>Stock Bajo</option>
          <option>Sin Stock</option>
        </select>
      </div>
      <div class="table-actions">
        <button class="icon-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
        </button>
        <button class="icon-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button class="icon-button active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="products-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Producto</th>
            <th>Código/SKU</th>
            <th>Categoría</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Ubicación</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><input type="checkbox" /></td>
            <td>
              <div class="product-cell">
                <div class="product-image">
                  <component :is="product.icon" />
                </div>
                <div>
                  <div class="product-name">{{ product.name }}</div>
                  <div class="product-brand">{{ product.brand }}</div>
                </div>
              </div>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.category }}</td>
            <td :class="{ 'text-warning': product.stockActual <= product.stockMin }">
              {{ product.stockActual }}
            </td>
            <td>{{ product.stockMin }}</td>
            <td>{{ product.ubicacion }}</td>
            <td>{{ product.precio }}</td>
            <td>
              <span :class="['status-badge', product.estado.toLowerCase().replace(' ', '-')]">
                {{ product.estado }}
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
      <div class="showing-text">Mostrando 5 de {{ products.length }} productos</div>
      <div class="pagination">
        <button class="page-button">Anterior</button>
        <button class="page-button active">1</button>
        <button class="page-button">2</button>
        <button class="page-button">3</button>
        <span>...</span>
        <button class="page-button">125</button>
        <button class="page-button">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    code: 'IP-14PRO001',
    category: 'Electrónicos',
    stockActual: 45,
    stockMin: 10,
    ubicacion: 'Almacén Principal',
    precio: 'S/999.00',
    estado: 'En Stock',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' }
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    brand: 'Apple',
    code: 'MBA13M2001',
    category: 'Electrónicos',
    stockActual: 3,
    stockMin: 5,
    ubicacion: 'Tienda 1',
    precio: 'S/1,299.00',
    estado: 'Stock Bajo',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' }
  },
  {
    id: 3,
    name: 'Jeans Clásicos',
    brand: "Levi's",
    code: 'LV501BLU32',
    category: 'Ropa',
    stockActual: 120,
    stockMin: 20,
    ubicacion: 'Almacén Principal',
    precio: 'S/89.99',
    estado: 'En Stock',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' }
  },
  {
    id: 4,
    name: 'Taza Cerámica Premium',
    brand: 'HomeStyle',
    code: 'HS-MUG-001',
    category: 'Hogar',
    stockActual: 0,
    stockMin: 15,
    ubicacion: 'Tienda 2',
    precio: 'S/24.99',
    estado: 'Sin Stock',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' }
  },
  {
    id: 5,
    name: 'AirPods Pro',
    brand: 'Apple',
    code: 'APP-PRO-002',
    category: 'Electrónicos',
    stockActual: 28,
    stockMin: 8,
    ubicacion: 'Almacén Principal',
    precio: 'S/249.00',
    estado: 'En Stock',
    icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' }
  }
]);
</script>

<style scoped>
.products-table-container {
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
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.icon-button {
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

.icon-button:hover {
  background: #f9fafb;
}

.icon-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.icon-button svg {
  width: 18px;
  height: 18px;
}

.table-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.products-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.products-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1a1a1a;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 40px;
  height: 40px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image svg {
  width: 24px;
  height: 24px;
}

.product-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.product-brand {
  font-size: 12px;
  color: #666;
}

.text-warning {
  color: #f59e0b;
  font-weight: 600;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.en-stock {
  background: #dcfce7;
  color: #10b981;
}

.status-badge.stock-bajo {
  background: #fed7aa;
  color: #f59e0b;
}

.status-badge.sin-stock {
  background: #fee2e2;
  color: #ef4444;
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
  align-items: center;
}

.page-button {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover {
  background: #f9fafb;
}

.page-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
</style>
