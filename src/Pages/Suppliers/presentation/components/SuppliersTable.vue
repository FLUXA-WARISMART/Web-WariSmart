<template>
  <div class="suppliers-table-container">
    <div class="table-header">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Buscar</label>
          <input v-model="searchQuery" type="text" placeholder="Buscar proveedor..." class="search-input">
        </div>
        <div class="filter-group">
          <label class="filter-label">Estado</label>
          <select v-model="selectedStatus" class="filter-select">
            <option value="">Todos</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Categoría</label>
          <select v-model="selectedCategory" class="filter-select">
            <option value="">Todas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Ropa">Ropa</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
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
          <tr v-for="supplier in paginatedSuppliers" :key="supplier.id">
            <td><input type="checkbox" /></td>
            <td>
              <div class="supplier-cell">
                <div class="supplier-icon" :style="{ backgroundColor: getIconColor(supplier.categoria).bg }">
                  <svg viewBox="0 0 24 24" fill="none" :stroke="getIconColor(supplier.categoria).color" stroke-width="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
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
              <span class="discount-value">{{ supplier.descuento }}%</span>
            </td>
            <td>
              <span :class="['status-badge', supplier.estado.toLowerCase()]">
                {{ supplier.estado }}
              </span>
            </td>
            <td>
              <div class="action-cell">
                <button class="action-button" @click="toggleDropdown(supplier.id)">⋯</button>
                <div v-if="activeDropdown === supplier.id" class="dropdown-menu">
                  <button class="dropdown-item" @click="editSupplier(supplier)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Editar
                  </button>
                  <button class="dropdown-item" @click="toggleStatus(supplier)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                    {{ supplier.estado === 'Activo' ? 'Desactivar' : 'Activar' }}
                  </button>
                  <button class="dropdown-item delete" @click="deleteSupplier(supplier)">
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
        Mostrando {{ startIndex + 1 }}-{{ endIndex }} de {{ filteredSuppliers.length }} proveedores
      </div>
      <div class="pagination">
        <button class="page-button" @click="goToPage(1)" :disabled="currentPage === 1" title="Primera página">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
        <button class="page-button" @click="previousPage" :disabled="currentPage === 1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
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
        <button class="page-button" @click="nextPage" :disabled="currentPage === totalPages">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <button class="page-button" @click="goToPage(totalPages)" :disabled="currentPage === totalPages" title="Última página">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';

const suppliers = ref([]);
const selectedStatus = ref('');
const selectedCategory = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const activeDropdown = ref(null);

// Obtener referencia al componente padre
const instance = getCurrentInstance();
const parent = instance?.parent;

// Cargar proveedores desde localStorage
const loadSuppliers = () => {
  try {
    const storedSuppliers = localStorage.getItem('suppliers');
    if (storedSuppliers) {
      suppliers.value = JSON.parse(storedSuppliers);
    } else {
      suppliers.value = [];
    }
  } catch (error) {
    console.error('Error al cargar proveedores:', error);
    suppliers.value = [];
  }
};

// Filtrar proveedores
const filteredSuppliers = computed(() => {
  let filtered = suppliers.value;
  
  // Filtro de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(s => 
      s.nombre.toLowerCase().includes(query) ||
      s.idCode.toLowerCase().includes(query) ||
      s.ruc?.toLowerCase().includes(query) ||
      s.contacto.nombre.toLowerCase().includes(query)
    );
  }
  
  // Filtro por estado
  if (selectedStatus.value) {
    filtered = filtered.filter(s => s.estado === selectedStatus.value);
  }
  
  // Filtro por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter(s => s.categoria === selectedCategory.value);
  }
  
  return filtered;
});

// Proveedores paginados
const paginatedSuppliers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredSuppliers.value.slice(start, end);
});

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredSuppliers.value.length / itemsPerPage.value) || 1;
});

// Índices
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredSuppliers.value.length));

// Páginas visibles
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

// Navegación
const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Obtener color de icono según categoría
const getIconColor = (categoria) => {
  const colors = {
    'Alimentos': { bg: '#dcfce7', color: '#10b981' },
    'Bebidas': { bg: '#e9d5ff', color: '#8b5cf6' },
    'Limpieza': { bg: '#fed7aa', color: '#f59e0b' },
    'Electrónicos': { bg: '#dbeafe', color: '#3b82f6' },
    'Ropa': { bg: '#fce7f3', color: '#ec4899' },
    'Otros': { bg: '#f3f4f6', color: '#6b7280' }
  };
  return colors[categoria] || colors['Otros'];
};

// Toggle dropdown
const toggleDropdown = (supplierId) => {
  activeDropdown.value = activeDropdown.value === supplierId ? null : supplierId;
};

// Cerrar dropdown al hacer click fuera
const closeDropdown = (event) => {
  if (!event.target.closest('.action-button') && !event.target.closest('.dropdown-menu')) {
    activeDropdown.value = null;
  }
};

// Editar proveedor
const editSupplier = (supplier) => {
  activeDropdown.value = null;
  if (parent && parent.exposed && parent.exposed.editSupplier) {
    parent.exposed.editSupplier(supplier);
  }
};

// Eliminar proveedor
const deleteSupplier = (supplier) => {
  activeDropdown.value = null;
  if (!confirm(`¿Eliminar el proveedor "${supplier.nombre}"?`)) return;
  
  try {
    const index = suppliers.value.findIndex(s => s.id === supplier.id);
    if (index !== -1) {
      suppliers.value.splice(index, 1);
      localStorage.setItem('suppliers', JSON.stringify(suppliers.value));
      window.dispatchEvent(new CustomEvent('suppliers-updated'));
    }
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
  }
};

// Cambiar estado
const toggleStatus = (supplier) => {
  activeDropdown.value = null;
  try {
    const index = suppliers.value.findIndex(s => s.id === supplier.id);
    if (index !== -1) {
      suppliers.value[index].estado = suppliers.value[index].estado === 'Activo' ? 'Inactivo' : 'Activo';
      localStorage.setItem('suppliers', JSON.stringify(suppliers.value));
      window.dispatchEvent(new CustomEvent('suppliers-updated'));
    }
  } catch (error) {
    console.error('Error al cambiar estado:', error);
  }
};

// Watch para resetear página
watch([searchQuery, selectedStatus, selectedCategory], () => {
  currentPage.value = 1;
});

onMounted(() => {
  loadSuppliers();
  window.addEventListener('suppliers-updated', loadSuppliers);
  document.addEventListener('click', closeDropdown);
});
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

.search-input {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:hover {
  border-color: #3b82f6;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

.action-cell {
  position: relative;
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

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 100;
  overflow: hidden;
  margin-top: 4px;
}

.dropdown-item {
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f9fafb;
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
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
}

.showing-text {
  font-size: 14px;
  color: #666;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
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
}
</style>
