<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Total Productos</div>
        <div class="stat-value">{{ stats.totalProducts }}</div>
      </div>
      <div class="stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Stock Bajo</div>
        <div class="stat-value warning">{{ stats.lowStock }}</div>
      </div>
      <div class="stat-icon red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Sin Stock</div>
        <div class="stat-value danger">{{ stats.outOfStock }}</div>
      </div>
      <div class="stat-icon orange">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-content">
        <div class="stat-label">Valor Total</div>
        <div class="stat-value success">{{ stats.totalValue }}</div>
      </div>
      <div class="stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stats = ref({
  totalProducts: 0,
  lowStock: 0,
  outOfStock: 0,
  totalValue: 'S/0.00'
});

// Función para actualizar estadísticas
const updateStats = (event) => {
  if (event && event.detail) {
    stats.value = {
      totalProducts: event.detail.totalProducts || 0,
      lowStock: event.detail.lowStock || 0,
      outOfStock: event.detail.outOfStock || 0,
      totalValue: event.detail.totalValue || 'S/0.00'
    };
  }
};

// Escuchar eventos de actualización de estadísticas
onMounted(() => {
  // Cargar datos iniciales
  loadInitialStats();
  
  // Escuchar eventos de actualización
  window.addEventListener('update-stats', updateStats);
  
  // También escuchar cuando se actualicen productos
  window.addEventListener('product-updated', loadInitialStats);
  
  // Limpiar el event listener cuando el componente se desmonte
  return () => {
    window.removeEventListener('update-stats', updateStats);
    window.removeEventListener('product-updated', loadInitialStats);
  };
});

// Cargar estadísticas iniciales desde LocalStorage
const loadInitialStats = () => {
  try {
    const storedProducts = localStorage.getItem('inventory_products');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const totalProducts = products.length;
      const lowStock = products.filter(p => p.stock <= 10 && p.stock > 0).length;
      const outOfStock = products.filter(p => p.stock === 0).length;
      
      // Calcular valor total: precio * cantidad de cada producto
      const totalValue = products.reduce((sum, p) => {
        const precio = parseFloat(p.precioVenta) || 0;
        const cantidad = parseInt(p.stock) || 0;
        return sum + (precio * cantidad);
      }, 0);
      
      console.log('📊 Estadísticas calculadas:', {
        totalProducts,
        lowStock,
        outOfStock,
        totalValue
      });
      
      stats.value = {
        totalProducts,
        lowStock,
        outOfStock,
        totalValue: `S/${totalValue.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      };
    } else {
      // Si no hay productos, resetear a 0
      stats.value = {
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
        totalValue: 'S/0.00'
      };
    }
  } catch (error) {
    console.error('Error al cargar estadísticas iniciales:', error);
  }
};
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.stat-value.danger {
  color: #ef4444;
}

.stat-value.warning {
  color: #f59e0b;
}

.stat-value.success {
  color: #10b981;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.blue {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-icon.red {
  background: #fee2e2;
  color: #ef4444;
}

.stat-icon.orange {
  background: #fed7aa;
  color: #f59e0b;
}

.stat-icon.green {
  background: #dcfce7;
  color: #10b981;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}
</style>
