<template>
  <div class="customer-history-card">
    <div class="card-header">
      <h3 class="section-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a10 10 0 0 1 10 10 4 4 0 0 1-5 5 4 4 0 0 1-5-5 4 4 0 0 1-5 5 4 4 0 0 1-5-5 10 10 0 0 1 10-10z"/>
        </svg>
        Historial de Compras de Clientes
      </h3>
      <button class="more-button">⋯</button>
    </div>

    <div class="filters-row">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Buscar cliente..." class="search-input" />
      </div>

      <select v-model="filterType" class="filter-select">
        <option value="">Todos los clientes</option>
        <option value="frecuente">Clientes frecuentes</option>
        <option value="nuevo">Nuevos clientes</option>
      </select>
    </div>

    <div v-if="filteredCustomers.length > 0" class="customers-grid">
      <div v-for="customer in filteredCustomers" :key="customer.id" class="customer-card">
        <div class="customer-header">
          <div class="customer-avatar">{{ customer.initials }}</div>
          <div class="customer-info">
            <div class="customer-name">{{ customer.nombre }}</div>
            <div class="customer-type">{{ customer.tipo }}</div>
          </div>
        </div>
        
        <div class="customer-details">
          <div class="detail-row">
            <span class="detail-label">Total compras:</span>
            <span class="detail-value">S/{{ customer.totalCompras.toFixed(2) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Última compra:</span>
            <span class="detail-value">{{ customer.ultimaCompra }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Compras realizadas:</span>
            <span class="detail-value">{{ customer.cantidadCompras }}</span>
          </div>
        </div>

        <button class="view-history-link" @click="viewCustomerHistory(customer)">Ver historial completo</button>
      </div>
    </div>

    <div v-else class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <p>No hay clientes registrados aún</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const customers = ref([]);
const searchQuery = ref('');
const filterType = ref('');

// Cargar historial de clientes
const loadCustomerHistory = () => {
  try {
    const sales = JSON.parse(localStorage.getItem('sales') || '[]');
    
    // Agrupar ventas por cliente
    const clientesMap = new Map();
    
    sales.forEach(sale => {
      if (!clientesMap.has(sale.cliente)) {
        clientesMap.set(sale.cliente, {
          nombre: sale.cliente,
          dni: sale.dni,
          ventas: [],
          totalCompras: 0,
          cantidadCompras: 0
        });
      }
      
      const cliente = clientesMap.get(sale.cliente);
      cliente.ventas.push(sale);
      cliente.totalCompras += sale.total;
      cliente.cantidadCompras++;
    });
    
    // Convertir a array y agregar información adicional
    customers.value = Array.from(clientesMap.values()).map((cliente, index) => {
      const initials = cliente.nombre
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
      
      // Determinar tipo de cliente
      let tipo = 'Nuevo cliente';
      if (cliente.cantidadCompras >= 5) {
        tipo = 'Cliente frecuente';
      } else if (cliente.cantidadCompras >= 2) {
        tipo = 'Cliente regular';
      }
      
      // Última compra
      const ultimaVenta = cliente.ventas[0];
      const ultimaCompra = ultimaVenta ? `${ultimaVenta.fechaTexto} ${ultimaVenta.hora}` : 'N/A';
      
      return {
        id: index + 1,
        nombre: cliente.nombre,
        dni: cliente.dni,
        tipo,
        initials,
        totalCompras: cliente.totalCompras,
        cantidadCompras: cliente.cantidadCompras,
        ultimaCompra,
        ventas: cliente.ventas
      };
    });
    
    // Ordenar por total de compras (descendente)
    customers.value.sort((a, b) => b.totalCompras - a.totalCompras);
    
  } catch (error) {
    console.error('Error al cargar historial de clientes:', error);
  }
};

// Filtrar clientes
const filteredCustomers = computed(() => {
  let filtered = customers.value;
  
  // Filtro de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(c => 
      c.nombre.toLowerCase().includes(query) ||
      c.dni.toLowerCase().includes(query)
    );
  }
  
  // Filtro por tipo
  if (filterType.value) {
    if (filterType.value === 'frecuente') {
      filtered = filtered.filter(c => c.tipo === 'Cliente frecuente');
    } else if (filterType.value === 'nuevo') {
      filtered = filtered.filter(c => c.tipo === 'Nuevo cliente');
    }
  }
  
  return filtered.slice(0, 6); // Mostrar solo los primeros 6
});

// Ver historial del cliente
const viewCustomerHistory = (customer) => {
  const historial = customer.ventas.map(v => 
    `Boleta: ${v.boleta} - S/${v.total.toFixed(2)} - ${v.fechaTexto}`
  ).join('\n');
  
  alert(`Historial de ${customer.nombre}:\n\n${historial}`);
};

onMounted(() => {
  loadCustomerHistory();
  window.addEventListener('customer-history-updated', loadCustomerHistory);
  window.addEventListener('sales-updated', loadCustomerHistory);
});
</script>

<style scoped>
.customer-history-card {
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

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.section-title svg {
  width: 20px;
  height: 20px;
  color: #8b5cf6;
}

.more-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
}

.filters-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
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
  min-width: 180px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.customer-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.customer-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.customer-type {
  font-size: 13px;
  color: #666;
}

.menu-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.customer-details {
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.detail-label {
  color: #666;
}

.detail-value {
  color: #1a1a1a;
  font-weight: 600;
}

.view-history-link {
  width: 100%;
  padding: 0;
  background: none;
  color: #3b82f6;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s;
}

.view-history-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.view-all-button {
  width: 100%;
  padding: 12px;
  background: white;
  color: #3b82f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.view-all-button:hover {
  background: #f9fafb;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}
</style>
