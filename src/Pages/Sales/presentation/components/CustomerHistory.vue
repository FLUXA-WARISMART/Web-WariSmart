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

    <div class="search-box">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input type="text" placeholder="Buscar cliente..." class="search-input" />
    </div>

    <select class="filter-select">
      <option>Todos los clientes</option>
      <option>Clientes frecuentes</option>
      <option>Nuevos clientes</option>
    </select>

    <div class="customers-list">
      <div v-for="customer in customers" :key="customer.id" class="customer-item">
        <div class="customer-avatar">{{ customer.initials }}</div>
        <div class="customer-info">
          <div class="customer-name">{{ customer.nombre }}</div>
          <div class="customer-type">{{ customer.tipo }}</div>
        </div>
      </div>
    </div>

    <div class="customer-details" v-if="selectedCustomer">
      <div class="detail-row">
        <span>Total compras:</span>
        <strong>{{ selectedCustomer.totalCompras }}</strong>
      </div>
      <div class="detail-row">
        <span>Última compra:</span>
        <strong>{{ selectedCustomer.ultimaCompra }}</strong>
      </div>
      <div class="detail-row">
        <span>Productos favoritos:</span>
        <strong>{{ selectedCustomer.productosFavoritos }}</strong>
      </div>
      <button class="view-history-button">Ver historial completo</button>
    </div>

    <button class="view-all-button">Ver todos los clientes →</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const customers = ref([
  {
    id: 1,
    nombre: 'María González',
    tipo: 'Cliente frecuente',
    initials: 'MG',
    totalCompras: 'S/ 1,245.50',
    ultimaCompra: 'Hace 2 días',
    productosFavoritos: 'Electrónicos'
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    tipo: 'Cliente regular',
    initials: 'CR',
    totalCompras: 'S/ 678.90',
    ultimaCompra: 'Hace 1 día',
    productosFavoritos: 'Herramientas'
  },
  {
    id: 3,
    nombre: 'Ana Torres',
    tipo: 'Nuevo cliente',
    initials: 'AT',
    totalCompras: 'S/ 234.75',
    ultimaCompra: 'Hace 3 horas',
    productosFavoritos: 'Ropa'
  }
]);

const selectedCustomer = ref(customers.value[0]);
</script>

<style scoped>
.customer-history-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
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
  font-size: 16px;
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

.search-box {
  position: relative;
  margin-bottom: 12px;
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
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  margin-bottom: 16px;
}

.customers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.customer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.customer-item:hover {
  background: #f3f4f6;
}

.customer-avatar {
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

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.customer-type {
  font-size: 12px;
  color: #666;
}

.customer-details {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

.detail-row strong {
  color: #1a1a1a;
}

.view-history-button {
  width: 100%;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s;
}

.view-history-button:hover {
  background: #2563eb;
}

.view-all-button {
  width: 100%;
  padding: 10px;
  background: white;
  color: #3b82f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-all-button:hover {
  background: #f9fafb;
}
</style>
