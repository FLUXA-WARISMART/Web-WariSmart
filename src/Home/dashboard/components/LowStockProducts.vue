<template>
  <div class="low-stock-card">
    <div class="card-header">
      <h3 class="section-title">Productos con Stock Bajo</h3>
      <span class="badge">{{ products.length }} productos</span>
    </div>
    <div class="products-list">
      <div v-for="product in products" :key="product.sku" class="product-item">
        <div class="product-icon">
          <div class="icon-placeholder">📦</div>
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-sku">SKU: {{ product.sku }}</div>
        </div>
        <div class="product-stock">
          <div class="stock-value">{{ product.stock }} unidades</div>
          <div class="stock-min">Mín: {{ product.min }}</div>
        </div>
      </div>
    </div>
    <button class="view-all-button">Ver todos los productos</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  { name: 'Agua Mineral 500ml', sku: 'AGM500', stock: 3, min: 20 },
  { name: 'Galletas Oreo', sku: 'GAL001', stock: 8, min: 15 },
  { name: 'Pan Integral', sku: 'PAN002', stock: 12, min: 25 }
]);
</script>

<style scoped>
.low-stock-card {
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
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.badge {
  background: #fef3c7;
  color: #d97706;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fef9f3;
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}

.product-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-placeholder {
  font-size: 20px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.product-sku {
  font-size: 12px;
  color: #666;
}

.product-stock {
  text-align: right;
}

.stock-value {
  font-size: 14px;
  font-weight: 700;
  color: #f59e0b;
  margin-bottom: 2px;
}

.stock-min {
  font-size: 11px;
  color: #999;
}

.view-all-button {
  width: 100%;
  padding: 10px;
  border: none;
  background: transparent;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.view-all-button:hover {
  background: #f0f9ff;
}
</style>
