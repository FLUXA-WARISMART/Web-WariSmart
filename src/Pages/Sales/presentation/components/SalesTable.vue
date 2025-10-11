<template>
  <div class="sales-section">
    <div class="section-header">
      <h3 class="section-title">Registro de Ventas</h3>
      <button class="btn-new-sale" @click="openNewSaleModal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Nueva Venta
      </button>
    </div>

    <div class="search-filter-bar">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por cliente, producto o número de boleta..." 
          class="search-input" 
        />
      </div>
      <div class="filter-group">
        <label class="filter-label">Período</label>
        <select v-model="selectedPeriod" class="filter-select">
          <option value="">Todos</option>
          <option value="today">Hoy</option>
          <option value="yesterday">Ayer</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Estado</label>
        <select v-model="selectedStatus" class="filter-select">
          <option value="">Todos</option>
          <option value="Completada">Completada</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="sales-table">
        <thead>
          <tr>
            <th>Boleta</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sale in paginatedSales" :key="sale.id">
            <td>
              <a :href="`#${sale.boleta}`" class="boleta-link">{{ sale.boleta }}</a>
            </td>
            <td>
              <div class="client-info">
                <strong>{{ sale.cliente }}</strong>
                <span class="dni-text">{{ sale.dni }}</span>
              </div>
            </td>
            <td>{{ sale.cantidadProductos }} productos</td>
            <td class="total-cell">S/{{ sale.total.toFixed(2) }}</td>
            <td>
              <div class="date-info">
                <span>{{ sale.fechaTexto }}</span>
                <span class="time-text">{{ sale.hora }}</span>
              </div>
            </td>
            <td>
              <span :class="['status-badge', sale.estado.toLowerCase()]">
                {{ sale.estado }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="action-icon" @click="viewSale(sale)" title="Ver">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button class="action-icon" @click="printSale(sale)" title="Imprimir">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </button>
                <button class="action-icon delete" @click="deleteSale(sale)" title="Eliminar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="showing-text">
        Mostrando {{ startIndex + 1 }}-{{ endIndex }} de {{ filteredSales.length }} ventas
      </div>
      <div class="pagination">
        <button class="page-button" @click="goToPage(1)" :disabled="currentPage === 1" title="Primera página">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
        <button class="page-button" @click="previousPage" :disabled="currentPage === 1">Anterior</button>
        <button 
          v-for="page in visiblePages" 
          :key="page"
          class="page-button" 
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button class="page-button" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
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

const sales = ref([]);
const searchQuery = ref('');
const selectedPeriod = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Obtener referencia al componente padre
const instance = getCurrentInstance();
const parent = instance?.parent;

// Abrir modal de nueva venta
const openNewSaleModal = () => {
  if (parent && parent.exposed && parent.exposed.openSaleModal) {
    parent.exposed.openSaleModal();
  }
};

// Cargar ventas desde localStorage
const loadSales = () => {
  try {
    const storedSales = localStorage.getItem('sales');
    if (storedSales) {
      sales.value = JSON.parse(storedSales);
    } else {
      sales.value = [];
    }
  } catch (error) {
    console.error('Error al cargar ventas:', error);
    sales.value = [];
  }
};

// Filtrar ventas
const filteredSales = computed(() => {
  let filtered = sales.value;
  
  // Filtro de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(sale => 
      sale.cliente.toLowerCase().includes(query) ||
      sale.boleta.toLowerCase().includes(query) ||
      sale.productosTexto.toLowerCase().includes(query)
    );
  }
  
  // Filtro de período
  if (selectedPeriod.value) {
    const now = new Date();
    filtered = filtered.filter(sale => {
      const saleDate = new Date(sale.fecha);
      
      switch (selectedPeriod.value) {
        case 'today':
          return saleDate.toDateString() === now.toDateString();
        case 'yesterday':
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          return saleDate.toDateString() === yesterday.toDateString();
        case 'week':
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return saleDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return saleDate >= monthAgo;
        default:
          return true;
      }
    });
  }
  
  // Filtro de estado
  if (selectedStatus.value) {
    filtered = filtered.filter(sale => sale.estado === selectedStatus.value);
  }
  
  return filtered;
});

// Ventas paginadas
const paginatedSales = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredSales.value.slice(start, end);
});

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredSales.value.length / itemsPerPage.value) || 1;
});

// Índices
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredSales.value.length));

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

// Ver venta
const viewSale = (sale) => {
  const details = `
Boleta: ${sale.boleta}
Cliente: ${sale.cliente}
DNI: ${sale.dni}
Productos: ${sale.productosTexto}
Total: S/${sale.total.toFixed(2)}
Método de Pago: ${sale.metodoPago}
Fecha: ${sale.fechaTexto} ${sale.hora}
  `;
  alert(details);
};

// Imprimir venta
const printSale = (sale) => {
  alert(`Imprimiendo boleta ${sale.boleta}...`);
};

// Eliminar venta
const deleteSale = (sale) => {
  if (!confirm(`¿Eliminar la venta ${sale.boleta}?`)) return;
  
  try {
    const index = sales.value.findIndex(s => s.id === sale.id);
    if (index !== -1) {
      sales.value.splice(index, 1);
      localStorage.setItem('sales', JSON.stringify(sales.value));
      window.dispatchEvent(new CustomEvent('sales-updated'));
    }
  } catch (error) {
    console.error('Error al eliminar venta:', error);
  }
};

// Watch para resetear página
watch([searchQuery, selectedPeriod, selectedStatus], () => {
  currentPage.value = 1;
});

// Escuchar actualizaciones
onMounted(() => {
  loadSales();
  window.addEventListener('sales-updated', loadSales);
});
</script>

<style scoped>
.sales-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.btn-new-sale {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-new-sale:hover {
  background: #2563eb;
}

.btn-new-sale svg {
  width: 18px;
  height: 18px;
}

.search-filter-bar {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 150px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-box {
  position: relative;
  flex: 1;
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
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
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
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-button:hover {
  background: #f9fafb;
}

.filter-button svg {
  width: 18px;
  height: 18px;
  color: #666;
}

.table-wrapper {
  overflow-x: auto;
}

.sales-table {
  width: 100%;
  border-collapse: collapse;
}

.sales-table thead {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.sales-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.sales-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1a1a1a;
}

.boleta-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.boleta-link:hover {
  text-decoration: underline;
}

.total-cell {
  font-weight: 600;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.completada {
  background: #dcfce7;
  color: #10b981;
}

.status-badge.pendiente {
  background: #fef3c7;
  color: #f59e0b;
}

.client-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.client-info strong {
  font-weight: 600;
  color: #1f2937;
}

.dni-text {
  font-size: 12px;
  color: #6b7280;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-text {
  font-size: 12px;
  color: #6b7280;
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
}

.page-button:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #3b82f6;
  color: #3b82f6;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-button svg {
  width: 16px;
  height: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-icon {
  width: 32px;
  height: 32px;
  border: none;
  background: #f9fafb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.action-icon:hover {
  background: #f3f4f6;
}

.action-icon.delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.action-icon svg {
  width: 16px;
  height: 16px;
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
</style>
