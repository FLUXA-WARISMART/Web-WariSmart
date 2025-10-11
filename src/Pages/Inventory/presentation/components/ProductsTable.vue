<template>
  <div class="products-table-container">
    <div class="table-header">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Categoría</label>
          <select v-model="selectedCategory" class="filter-select">
            <option value="">Todas las categorías</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Ropa">Ropa</option>
            <option value="Hogar">Hogar</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Deportes">Deportes</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Ubicación</label>
          <select v-model="selectedLocation" class="filter-select">
            <option value="">Todas las ubicaciones</option>
            <option value="Almacén Principal">Almacén Principal</option>
            <option value="Tienda 1">Tienda 1</option>
            <option value="Tienda 2">Tienda 2</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Estado</label>
          <select v-model="selectedStock" class="filter-select">
            <option value="">Todos los estados</option>
            <option value="En Stock">En Stock</option>
            <option value="Stock Bajo">Stock Bajo</option>
            <option value="Sin Stock">Sin Stock</option>
          </select>
        </div>
      </div>
      <div class="table-actions">
        <button class="icon-button" @click="viewMode = 'compact'" :class="{ active: viewMode === 'compact' }" title="Vista compacta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
        <button class="icon-button" @click="viewMode = 'table'" :class="{ active: viewMode === 'table' }" title="Vista tabla">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
        <button class="icon-button" @click="exportData" title="Exportar datos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
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
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td><input type="checkbox" /></td>
            <td>
              <div class="product-cell">
                <div class="product-image">
                  <img v-if="product.imagen" :src="product.imagen" :alt="product.name" class="product-img" />
                  <div v-else class="product-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                  </div>
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
              <div class="actions-dropdown">
                <button class="action-button" @click="toggleDropdown(product.id)">⋯</button>
                <div v-if="activeDropdown === product.id" class="dropdown-menu">
                  <button @click="editProduct(product)" class="dropdown-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Editar
                  </button>
                  <button @click="deleteProduct(product)" class="dropdown-item delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="showing-text">
        Mostrando {{ startIndex + 1 }}-{{ endIndex }} de {{ filteredProducts.length }} productos
      </div>
      <div class="pagination">
        <button 
          class="page-button" 
          @click="goToPage(1)" 
          :disabled="currentPage === 1"
          title="Primera página"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="11 17 6 12 11 7"/>
            <polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
        <button 
          class="page-button" 
          @click="previousPage" 
          :disabled="currentPage === 1"
        >
          Anterior
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          class="page-button" 
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        
        <button 
          class="page-button" 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          Siguiente
        </button>
        <button 
          class="page-button" 
          @click="goToPage(totalPages)" 
          :disabled="currentPage === totalPages"
          title="Última página"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="13 17 18 12 13 7"/>
            <polyline points="6 17 11 12 6 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, defineEmits } from 'vue';

const emit = defineEmits(['edit-product']);

const products = ref([]);
const activeDropdown = ref(null);

// Filtros
const selectedCategory = ref('');
const selectedLocation = ref('');
const selectedStock = ref('');

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(5);
const viewMode = ref('table');

// Función para cargar productos desde LocalStorage
const loadProducts = () => {
  try {
    console.log('🔄 ProductsTable: Cargando productos...');
    const storedProducts = localStorage.getItem('inventory_products');
    console.log('📦 ProductsTable: Datos en localStorage:', storedProducts);
    
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      console.log('📋 ProductsTable: Productos parseados:', parsedProducts.length, parsedProducts);
      
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
        imagen: p.imagen || null // Incluir la imagen del producto
      }));
      
      console.log('✅ ProductsTable: Productos mapeados:', products.value.length);
      
      // Actualizar estadísticas
      updateStats(parsedProducts);
    } else {
      console.log('⚠️ ProductsTable: No hay productos en localStorage');
      products.value = [];
    }
  } catch (error) {
    console.error('❌ ProductsTable: Error al cargar productos:', error);
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
const handleProductUpdate = () => {
  console.log('📢 ProductsTable: Evento product-updated recibido');
  loadProducts();
};

window.addEventListener('product-updated', handleProductUpdate);

// Cargar productos al montar el componente
onMounted(() => {
  console.log('🚀 ProductsTable: Componente montado');
  loadProducts();
  
  // Agregar event listener para cerrar dropdown
  document.addEventListener('click', closeDropdown);
});

// Limpiar event listener al desmontar
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown);
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

// Toggle dropdown
const toggleDropdown = (productId) => {
  activeDropdown.value = activeDropdown.value === productId ? null : productId;
};

// Cerrar dropdown al hacer click fuera
const closeDropdown = (event) => {
  if (!event.target.closest('.actions-dropdown')) {
    activeDropdown.value = null;
  }
};

// Editar producto
const editProduct = (product) => {
  console.log('✏️ Editando producto:', product);
  activeDropdown.value = null;
  
  // Obtener el producto original desde localStorage
  const storedProducts = localStorage.getItem('inventory_products');
  if (storedProducts) {
    const productos = JSON.parse(storedProducts);
    const productoOriginal = productos.find(p => p.id === product.id);
    
    if (productoOriginal) {
      // Emitir evento al componente padre con el producto original
      emit('edit-product', productoOriginal);
    }
  }
};

// Eliminar producto
const deleteProduct = (product) => {
  console.log('🗑️ Eliminando producto:', product);
  
  if (!confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`)) {
    activeDropdown.value = null;
    return;
  }
  
  try {
    // Obtener productos del localStorage
    const storedProducts = localStorage.getItem('inventory_products');
    if (storedProducts) {
      let productos = JSON.parse(storedProducts);
      
      // Encontrar el producto a eliminar
      const productoAEliminar = productos.find(p => p.id === product.id);
      
      // Filtrar el producto eliminado
      productos = productos.filter(p => p.id !== product.id);
      
      // Guardar en localStorage
      localStorage.setItem('inventory_products', JSON.stringify(productos));
      
      // Registrar en historial
      if (productoAEliminar) {
        addToHistory(productoAEliminar, 'eliminado');
      }
      
      // Recargar productos
      loadProducts();
      
      // Disparar evento para actualizar estadísticas
      window.dispatchEvent(new CustomEvent('product-updated'));
      
      activeDropdown.value = null;
      
      console.log('✅ Producto eliminado exitosamente');
    }
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    alert('Error al eliminar el producto');
  }
};

// Agregar al historial
const addToHistory = (producto, accion) => {
  try {
    const actividades = JSON.parse(localStorage.getItem('recent_activity') || '[]');
    const nuevaActividad = {
      id: Date.now(),
      title: `Producto ${accion}`,
      description: `${producto.nombre} (${producto.codigo}) - ${producto.categoria}`,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      color: accion === 'eliminado' ? '#fee2e2' : '#dcfce7',
      icon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' }
    };
    
    actividades.unshift(nuevaActividad);
    if (actividades.length > 10) actividades.pop();
    
    localStorage.setItem('recent_activity', JSON.stringify(actividades));
  } catch (error) {
    console.error('Error al agregar al historial:', error);
  }
};

// Función para exportar datos
const exportData = () => {
  try {
    const dataStr = JSON.stringify(products.value, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productos_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar datos:', error);
    alert('Error al exportar los datos');
  }
};

// Productos filtrados
const filteredProducts = computed(() => {
  let filtered = products.value;
  
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value);
  }
  
  if (selectedLocation.value) {
    filtered = filtered.filter(p => p.ubicacion === selectedLocation.value);
  }
  
  if (selectedStock.value) {
    filtered = filtered.filter(p => {
      const status = getStockStatus(p.stockActual, p.stockMinimo);
      return status === selectedStock.value;
    });
  }
  
  return filtered;
});

// Productos paginados
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value) || 1;
});

// Índices para mostrar
const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredProducts.value.length);
});

// Páginas visibles en la paginación
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

// Funciones de navegación
const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Watch para resetear página cuando cambien los filtros
watch([selectedCategory, selectedLocation, selectedStock], () => {
  currentPage.value = 1;
});
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
  gap: 16px;
  flex-wrap: wrap;
  flex: 1;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  color: #374151;
}

.filter-select:hover {
  border-color: #3b82f6;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
  width: 48px;
  height: 48px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.product-placeholder svg {
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

.actions-dropdown {
  position: relative;
}

.action-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
  transition: all 0.2s;
}

.action-button:hover {
  color: #1a1a1a;
  background: #f9fafb;
  border-radius: 4px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
  margin-top: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
}

.dropdown-item:hover {
  background: #f9fafb;
}

.dropdown-item.delete {
  color: #ef4444;
}

.dropdown-item.delete:hover {
  background: #fef2f2;
}

.table-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.pagination {
  display: flex;
  gap: 6px;
  align-items: center;
}

.page-button {
  min-width: 36px;
  height: 36px;
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
}

.page-button:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #3b82f6;
  color: #3b82f6;
}

.page-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
}

.page-button svg {
  width: 16px;
  height: 16px;
}

.showing-text {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .table-actions {
    justify-content: center;
  }
  
  .table-footer {
    flex-direction: column;
    gap: 12px;
  }
  
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .page-button {
    min-width: 32px;
    height: 32px;
    padding: 4px 8px;
    font-size: 13px;
  }
}
</style>
