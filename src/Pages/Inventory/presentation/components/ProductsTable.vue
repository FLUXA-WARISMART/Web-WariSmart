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
            <td :class="{ 'text-warning': product.stockActual <= product.stockMinimo, 'text-danger': product.stockActual === 0 }">
              {{ product.stockActual }}
            </td>
            <td>{{ product.stockMinimo }}</td>
            <td>{{ product.ubicacion }}</td>
            <td>{{ formatPrice(product.precio) }}</td>
            <td>
              <span :class="['status-badge', getStockStatus(product.stockActual, product.stockMinimo).toLowerCase().replace(' ', '-')]">
                {{ getStockStatus(product.stockActual, product.stockMinimo) }}
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
import { ref, onMounted, watch } from 'vue';

const products = ref([]);

// Función para cargar productos desde LocalStorage
const loadProducts = () => {
  try {
    const storedProducts = localStorage.getItem('inventory_products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      // Mapear los productos a la estructura esperada por la tabla
      products.value = parsedProducts.map(p => ({
        id: p.id,
        name: p.nombre,
        code: p.codigo,
        category: p.categoria,
        stockActual: p.stock,
        stockMinimo: 10, // Valor por defecto
        ubicacion: 'Almacén Principal', // Valor por defecto
        precio: p.precioVenta,
        brand: p.categoria,
        icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' }
      }));
      
      // Actualizar estadísticas
      updateStats(parsedProducts);
    }
  } catch (error) {
    console.error('Error al cargar productos desde LocalStorage:', error);
  }
};

// Función para actualizar estadísticas
const updateStats = (productList) => {
  const totalProducts = productList.length;
  const lowStock = productList.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStock = productList.filter(p => p.stock === 0).length;
  const totalValue = productList.reduce((sum, p) => sum + (p.precioVenta * p.stock), 0);
  
  // Emitir evento para actualizar las estadísticas en el componente padre
  window.dispatchEvent(new CustomEvent('update-stats', {
    detail: {
      totalProducts,
      lowStock,
      outOfStock,
      totalValue: `S/${totalValue.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }));
};

// Escuchar eventos de actualización de productos
window.addEventListener('product-updated', loadProducts);

// Cargar productos al montar el componente
onMounted(() => {
  loadProducts();
  
  // Configurar un intervalo para verificar actualizaciones (cada 5 segundos)
  const intervalId = setInterval(loadProducts, 5000);
  
  // Limpiar el intervalo cuando el componente se desmonte
  return () => clearInterval(intervalId);
});

// Función para formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(price).replace('PEN', 'S/');
};

// Función para determinar el estado del stock
const getStockStatus = (stockActual, stockMinimo) => {
  if (stockActual === 0) return 'Sin Stock';
  if (stockActual <= stockMinimo) return 'Stock Bajo';
  return 'En Stock';
};
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

.text-danger {
  color: #ef4444;
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
