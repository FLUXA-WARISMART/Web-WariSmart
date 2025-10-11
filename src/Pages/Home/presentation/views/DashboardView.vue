<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="page-title">{{ $t('dashboard.title') }}</h1>
        <p class="page-subtitle">{{ $t('dashboard.subtitle') }} • {{ $t('dashboard.today') }}, {{ fechaFormatoHoy }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <StatCard
        :title="$t('dashboard.salesToday')"
        :value="totalVentasHoy"
        :changeText="`${cambioVentasVsAyer} ${$t('dashboard.vsYesterday')}`"
        :changeType="tipoVentasVsAyer"
        :icon="salesIcon"
        iconBgColor="#dcfce7"
      />
      <StatCard
        :title="$t('dashboard.productsSold')"
        :value="productosVendidosHoy.toString()"
        :changeText="`${cambioProductosVsAyer} ${$t('dashboard.vsYesterday')}`"
        :changeType="tipoProductosVsAyer"
        :icon="productsIcon"
        iconBgColor="#dbeafe"
      />
      <StatCard
        :title="$t('dashboard.totalStock')"
        :value="stockTotal.toLocaleString('es-PE')"
        :changeText="`${productosConBajoStock} ${$t('dashboard.lowStockProducts')}`"
        :changeType="productosConBajoStock > 0 ? 'negative' : 'neutral'"
        :icon="stockIcon"
        iconBgColor="#fed7aa"
      />
      <StatCard
        :title="$t('dashboard.activeSuppliers')"
        :value="proveedoresActivos.toString()"
        :changeText="`${pedidosPendientes} ${$t('dashboard.pendingOrders')}`"
        changeType="neutral"
        :icon="suppliersIcon"
        iconBgColor="#e9d5ff"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Sales Chart -->
      <div class="chart-section">
        <SalesChart />
      </div>

      <!-- Quick Actions -->
      <div class="actions-section">
        <QuickActions @action="handleQuickAction" />
      </div>

      <!-- Low Stock Products -->
      <div class="products-section">
        <LowStockProducts />
      </div>

      <!-- Expiration Alerts -->
      <div class="alerts-section">
        <ExpirationAlerts />
      </div>

      <!-- Recent Activity -->
      <div class="activity-section">
        <RecentActivity />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from '../components/StatCard.vue';
import SalesChart from '../components/SalesChart.vue';
import QuickActions from '../components/QuickActions.vue';
import LowStockProducts from '../components/LowStockProducts.vue';
import ExpirationAlerts from '../components/ExpirationAlerts.vue';
import RecentActivity from '../components/RecentActivity.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const fechaFormatoHoy = ref('');
const productos = ref([]);
const ventas = ref([]);
const proveedores = ref([]);

// Cargar todos los datos desde localStorage
const loadAllData = () => {
  loadProductos();
  loadVentas();
  loadProveedores();
};

// Cargar productos desde localStorage
const loadProductos = () => {
  try {
    const stored = localStorage.getItem('inventory_products');
    if (stored) {
      productos.value = JSON.parse(stored);
      console.log('📊 Dashboard: Productos cargados:', productos.value.length);
    } else {
      productos.value = [];
    }
  } catch (error) {
    console.error('Error cargando productos en Dashboard:', error);
    productos.value = [];
  }
};

// Cargar ventas desde localStorage
const loadVentas = () => {
  try {
    const stored = localStorage.getItem('sales');
    if (stored) {
      ventas.value = JSON.parse(stored);
      console.log('💰 Dashboard: Ventas cargadas:', ventas.value.length);
    } else {
      ventas.value = [];
    }
  } catch (error) {
    console.error('Error cargando ventas en Dashboard:', error);
    ventas.value = [];
  }
};

// Cargar proveedores desde localStorage
const loadProveedores = () => {
  try {
    const stored = localStorage.getItem('suppliers');
    if (stored) {
      proveedores.value = JSON.parse(stored);
      console.log('🏢 Dashboard: Proveedores cargados:', proveedores.value.length);
    } else {
      proveedores.value = [];
    }
  } catch (error) {
    console.error('Error cargando proveedores en Dashboard:', error);
    proveedores.value = [];
  }
};

// ========== ESTADÍSTICAS CALCULADAS ==========

// Total de productos en inventario
const totalProductos = computed(() => {
  return productos.value.length;
});

// Stock total
const stockTotal = computed(() => {
  return productos.value.reduce((sum, p) => sum + (p.stock || 0), 0);
});

// Productos con bajo stock (stock <= 10 y > 0)
const productosConBajoStock = computed(() => {
  return productos.value.filter(p => p.stock > 0 && p.stock <= 10).length;
});

// Productos sin stock
const productosSinStock = computed(() => {
  return productos.value.filter(p => p.stock === 0).length;
});

// Ventas de hoy
const ventasHoy = computed(() => {
  const hoy = new Date().toLocaleDateString('es-PE');
  return ventas.value.filter(v => v.fechaTexto === hoy);
});

// Total de ventas de hoy en soles
const totalVentasHoy = computed(() => {
  const total = ventasHoy.value.reduce((sum, v) => sum + (v.total || 0), 0);
  return `S/${total.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});

// Productos vendidos hoy
const productosVendidosHoy = computed(() => {
  return ventasHoy.value.reduce((sum, v) => sum + (v.cantidadProductos || 0), 0);
});

// Ventas de ayer para comparación
const ventasAyer = computed(() => {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  const ayerStr = ayer.toLocaleDateString('es-PE');
  return ventas.value.filter(v => v.fechaTexto === ayerStr);
});

// Total de ventas de ayer
const totalVentasAyer = computed(() => {
  return ventasAyer.value.reduce((sum, v) => sum + (v.total || 0), 0);
});

// Productos vendidos ayer
const productosVendidosAyer = computed(() => {
  return ventasAyer.value.reduce((sum, v) => sum + (v.cantidadProductos || 0), 0);
});

// Cambio porcentual de ventas vs ayer
const cambioVentasVsAyer = computed(() => {
  if (totalVentasAyer.value === 0) {
    return ventasHoy.value.length > 0 ? '+100%' : '0%';
  }
  const cambio = ((ventasHoy.value.reduce((sum, v) => sum + v.total, 0) - totalVentasAyer.value) / totalVentasAyer.value * 100);
  return cambio >= 0 ? `+${cambio.toFixed(1)}%` : `${cambio.toFixed(1)}%`;
});

// Cambio porcentual de productos vendidos vs ayer
const cambioProductosVsAyer = computed(() => {
  if (productosVendidosAyer.value === 0) {
    return productosVendidosHoy.value > 0 ? '+100%' : '0%';
  }
  const cambio = ((productosVendidosHoy.value - productosVendidosAyer.value) / productosVendidosAyer.value * 100);
  return cambio >= 0 ? `+${cambio.toFixed(1)}%` : `${cambio.toFixed(1)}%`;
});

// Tipo de cambio (positivo, negativo o neutral)
const tipoVentasVsAyer = computed(() => {
  const cambio = parseFloat(cambioVentasVsAyer.value);
  return cambio > 0 ? 'positive' : cambio < 0 ? 'negative' : 'neutral';
});

const tipoProductosVsAyer = computed(() => {
  const cambio = parseFloat(cambioProductosVsAyer.value);
  return cambio > 0 ? 'positive' : cambio < 0 ? 'negative' : 'neutral';
});

// Proveedores activos
const proveedoresActivos = computed(() => {
  return proveedores.value.filter(p => p.estado === 'Activo' || !p.estado).length;
});

// Pedidos pendientes (simulado - puedes agregar lógica real después)
const pedidosPendientes = computed(() => {
  // Por ahora retornamos 0, pero puedes implementar lógica de pedidos
  return 0;
});

onMounted(() => {
  const fecha = new Date();
  fechaFormatoHoy.value = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fecha);
  
  // Cargar todos los datos
  loadAllData();
  
  // Escuchar actualizaciones
  window.addEventListener('product-updated', loadProductos);
  window.addEventListener('sales-updated', loadVentas);
  window.addEventListener('supplier-updated', loadProveedores);
});

onUnmounted(() => {
  // Limpiar event listeners
  window.removeEventListener('product-updated', loadProductos);
  window.removeEventListener('sales-updated', loadVentas);
  window.removeEventListener('supplier-updated', loadProveedores);
});

// Icons as components
const salesIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
};

const productsIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>'
};

const stockIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
};

const suppliersIcon = {
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
};

const handleQuickAction = (actionId) => {
  console.log('Quick action clicked:', actionId);
  // Handle action navigation or modal opening
};
</script>

<style scoped>
.dashboard {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.chart-section {
  grid-column: span 8;
}

.actions-section {
  grid-column: span 4;
}

.products-section {
  grid-column: span 6;
}

.alerts-section {
  grid-column: span 6;
}

.activity-section {
  grid-column: span 12;
}

@media (max-width: 1200px) {
  .chart-section,
  .actions-section,
  .products-section,
  .alerts-section,
  .activity-section {
    grid-column: span 12;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .content-grid {
    gap: 16px;
  }
}
</style>
