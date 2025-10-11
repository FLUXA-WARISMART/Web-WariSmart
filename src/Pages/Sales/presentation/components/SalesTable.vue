<template>
  <div class="sales-section">
    <div class="section-header">
      <h3 class="section-title">Registro de Ventas</h3>
      <button class="btn-new-sale">
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
        <input type="text" placeholder="Buscar por cliente, producto o número de boleta..." class="search-input" />
      </div>
      <select class="filter-select">
        <option>Hoy</option>
        <option>Ayer</option>
        <option>Esta semana</option>
        <option>Este mes</option>
      </select>
      <button class="filter-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
      </button>
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
          <tr v-for="sale in sales" :key="sale.id">
            <td>
              <a :href="`#${sale.boleta}`" class="boleta-link">{{ sale.boleta }}</a>
            </td>
            <td>{{ sale.cliente }}</td>
            <td>{{ sale.productos }}</td>
            <td class="total-cell">{{ sale.total }}</td>
            <td>{{ sale.fecha }}</td>
            <td>
              <span :class="['status-badge', sale.estado.toLowerCase()]">
                {{ sale.estado }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="action-icon" title="Ver">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button class="action-icon" title="Imprimir">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </button>
                <button class="action-icon delete" title="Eliminar">
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
      <div class="showing-text">Mostrando 1-3 de 48 ventas</div>
      <div class="pagination">
        <button class="page-button">Anterior</button>
        <button class="page-button active">1</button>
        <button class="page-button">2</button>
        <button class="page-button">3</button>
        <button class="page-button">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sales = ref([
  {
    id: 1,
    boleta: '#B001-245',
    cliente: 'María González',
    productos: '3 productos',
    total: 'S/ 125.50',
    fecha: '12:45 PM',
    estado: 'Pagado'
  },
  {
    id: 2,
    boleta: '#B001-244',
    cliente: 'Carlos Ruiz',
    productos: '2 productos',
    total: 'S/ 89.00',
    fecha: '11:30 AM',
    estado: 'Pagado'
  },
  {
    id: 3,
    boleta: '#B001-243',
    cliente: 'Ana Torres',
    productos: '5 productos',
    total: 'S/ 234.75',
    fecha: '10:15 AM',
    estado: 'Pendiente'
  }
]);
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
  gap: 12px;
  align-items: center;
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

.status-badge.pagado {
  background: #dcfce7;
  color: #10b981;
}

.status-badge.pendiente {
  background: #fef3c7;
  color: #f59e0b;
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
  gap: 8px;
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
