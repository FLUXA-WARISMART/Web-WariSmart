<template>
  <div class="reports-view">
    <div class="reports-header">
      <div>
        <h1 class="page-title">Reportes</h1>
        <p class="page-subtitle">Análisis completo de tu negocio en tiempo real</p>
      </div>
      <div class="header-actions">
        <select class="period-select">
          <option>Últimos 30 días</option>
          <option>Últimos 7 días</option>
          <option>Este mes</option>
          <option>Este año</option>
        </select>
        <button class="btn-export">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <ReportsStats :stats="stats" />

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Daily Sales Chart -->
      <div class="chart-card">
        <div class="card-header">
          <h3 class="card-title">Ventas Diarias</h3>
          <select class="chart-period">
            <option>7 días</option>
            <option>30 días</option>
            <option>90 días</option>
          </select>
        </div>
        <div class="chart-placeholder">
          <svg viewBox="0 0 600 250" class="line-chart">
            <line v-for="i in 5" :key="'grid-' + i" 
              :x1="0" :y1="i * 50" :x2="600" :y2="i * 50" 
              stroke="#f0f0f0" stroke-width="1" />
            <polyline
              points="50,180 120,150 190,120 260,90 330,60 400,100 470,140 540,110"
              fill="none"
              stroke="#3b82f6"
              stroke-width="3"
            />
            <circle v-for="(point, i) in [50,120,190,260,330,400,470,540]" :key="i"
              :cx="point" :cy="[180,150,120,90,60,100,140,110][i]" r="5" 
              fill="#3b82f6" stroke="white" stroke-width="2" />
          </svg>
          <div class="chart-labels">
            <span v-for="label in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" :key="label">{{ label }}</span>
          </div>
        </div>
      </div>

      <!-- Inventory Status -->
      <div class="chart-card">
        <div class="card-header">
          <h3 class="card-title">Estado del Inventario</h3>
          <button class="details-button">Ver detalles</button>
        </div>
        <div class="pie-chart-container">
          <svg viewBox="0 0 200 200" class="pie-chart">
            <circle cx="100" cy="100" r="80" fill="#10b981" stroke="white" stroke-width="2"/>
            <path d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z" fill="#f59e0b" stroke="white" stroke-width="2"/>
            <path d="M 100 100 L 180 100 A 80 80 0 0 1 140 170 Z" fill="#ef4444" stroke="white" stroke-width="2"/>
          </svg>
          <div class="pie-legend">
            <div class="legend-item">
              <span class="legend-dot" style="background: #10b981"></span>
              <span>En Stock</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #f59e0b"></span>
              <span>Stock Bajo</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #ef4444"></span>
              <span>Agotado</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Financial and Staff Grid -->
    <div class="financial-staff-grid">
      <!-- Financial Summary -->
      <div class="financial-card">
        <h3 class="card-title">Resumen Financiero</h3>
        <div class="financial-grid">
          <div class="financial-item">
            <div class="financial-label">Ingresos</div>
            <div class="financial-value positive">S/45,230</div>
            <div class="financial-note">Este mes</div>
          </div>
          <div class="financial-item">
            <div class="financial-label">Gastos</div>
            <div class="financial-value negative">S/12,840</div>
            <div class="financial-note">Este mes</div>
          </div>
          <div class="financial-item">
            <div class="financial-label">Ganancia</div>
            <div class="financial-value success">S/32,390</div>
            <div class="financial-note">Este mes</div>
          </div>
        </div>
        <div class="bar-chart">
          <div v-for="month in ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']" :key="month" class="bar-group">
            <div class="bar income" :style="{ height: Math.random() * 100 + 50 + 'px' }"></div>
            <div class="bar expense" :style="{ height: Math.random() * 50 + 20 + 'px' }"></div>
            <div class="bar-label">{{ month }}</div>
          </div>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background: #10b981"></span>
            <span>Ingresos</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background: #ef4444"></span>
            <span>Gastos</span>
          </div>
        </div>
      </div>

      <!-- Staff Performance -->
      <div class="section-card staff-card">
        <h3 class="card-title">Desempeño del Personal</h3>
        <div class="staff-list">
          <div v-for="staff in staffPerformance" :key="staff.id" class="staff-item">
            <div class="staff-avatar">{{ staff.initials }}</div>
            <div class="staff-info">
              <div class="staff-name">{{ staff.name }}</div>
              <div class="staff-role">{{ staff.role }}</div>
            </div>
            <div class="staff-sales">
              <div class="sales-amount">{{ staff.sales }}</div>
              <div class="sales-count">{{ staff.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Grid -->
    <div class="bottom-grid">
      <!-- Demand Predictions -->
      <div class="section-card predictions-card">
        <h3 class="card-title">Predicciones de Demanda</h3>
        <div class="predictions-list">
          <div v-for="prediction in demandPredictions" :key="prediction.id" class="prediction-item" :class="prediction.trend">
            <div class="prediction-header">
              <div class="prediction-name">{{ prediction.name }}</div>
              <div class="prediction-badge" :class="prediction.trend">
                {{ prediction.change }}
              </div>
            </div>
            <div class="prediction-note">{{ prediction.note }}</div>
            <div class="prediction-timeline">{{ prediction.timeline }}</div>
          </div>
        </div>
        <div class="prediction-chart">
          <svg viewBox="0 0 400 150" class="trend-chart">
            <polyline v-for="(product, i) in demandPredictions" :key="i"
              :points="product.chartPoints"
              fill="none"
              :stroke="product.color"
              stroke-width="2"
            />
          </svg>
          <div class="chart-legend">
            <div v-for="product in demandPredictions" :key="product.id" class="legend-item">
              <span class="legend-line" :style="{ background: product.color }"></span>
              <span>{{ product.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="section-card products-card">
        <h3 class="card-title">Productos Más Vendidos</h3>
        <div class="products-list">
          <div v-for="(product, index) in topProducts" :key="product.id" class="product-item">
            <div class="product-rank">{{ index + 1 }}</div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-units">{{ product.units }} unidades vendidas</div>
            </div>
            <div class="product-revenue">{{ product.revenue }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ReportsStats from '../components/ReportsStats.vue';

const stats = ref({
  ventasHoy: 'S/15,247',
  productosVendidos: 342,
  stockBajo: 23,
  proveedoresActivos: 18
});

const staffPerformance = ref([
  { id: 1, name: 'María García', role: 'Vendedor', initials: 'MG', sales: 'S/8,450', count: '45 ventas' },
  { id: 2, name: 'Carlos López', role: 'Vendedor', initials: 'CL', sales: 'S/6,230', count: '37 ventas' },
  { id: 3, name: 'Ana Rodríguez', role: 'Cajera', initials: 'AR', sales: 'S/4,890', count: '28 ventas' },
  { id: 4, name: 'Luis Martínez', role: 'Vendedor', initials: 'LM', sales: 'S/3,670', count: '22 ventas' }
]);

const topProducts = ref([
  { id: 1, name: 'Producto Premium A', units: 245, revenue: 'S/12,250' },
  { id: 2, name: 'Producto Básico B', units: 189, revenue: 'S/9,450' },
  { id: 3, name: 'Producto Especial C', units: 156, revenue: 'S/7,800' },
  { id: 4, name: 'Producto Standard D', units: 134, revenue: 'S/6,700' },
  { id: 5, name: 'Producto Económico E', units: 98, revenue: 'S/4,900' }
]);

const demandPredictions = ref([
  {
    id: 1,
    name: 'Producto A',
    note: 'Demanda alta esperada',
    change: '+35%',
    trend: 'up',
    timeline: 'Próximos 7 días',
    color: '#f59e0b',
    chartPoints: '20,100 60,80 100,70 140,60 180,50 220,45 260,40 300,35 340,30 380,25'
  },
  {
    id: 2,
    name: 'Producto B',
    note: 'Demanda estable',
    change: '+5%',
    trend: 'stable',
    timeline: 'Próximos 7 días',
    color: '#10b981',
    chartPoints: '20,90 60,88 100,85 140,83 180,80 220,78 260,75 300,73 340,70 380,68'
  },
  {
    id: 3,
    name: 'Producto C',
    note: 'Demanda baja esperada',
    change: '-20%',
    trend: 'down',
    timeline: 'Próximos 7 días',
    color: '#ef4444',
    chartPoints: '20,70 60,75 100,80 140,85 180,90 220,95 260,100 300,105 340,110 380,115'
  }
]);
</script>

<style scoped>
.reports-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.period-select {
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.btn-export {
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

.btn-export:hover {
  background: #2563eb;
}

.btn-export svg {
  width: 18px;
  height: 18px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card,
.financial-card,
.section-card {
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

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.chart-period,
.details-button {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
}

.chart-placeholder {
  margin-bottom: 12px;
}

.line-chart {
  width: 100%;
  height: auto;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.pie-chart-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 40px;
}

.pie-chart {
  width: 200px;
  height: 200px;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.financial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.financial-item {
  text-align: center;
}

.financial-label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.financial-value {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.financial-value.positive {
  color: #10b981;
}

.financial-value.negative {
  color: #ef4444;
}

.financial-value.success {
  color: #3b82f6;
}

.financial-note {
  font-size: 12px;
  color: #999;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  margin-bottom: 16px;
  padding: 20px 0;
  border-top: 1px solid #e5e7eb;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bar {
  width: 30px;
  border-radius: 4px 4px 0 0;
}

.bar.income {
  background: #10b981;
}

.bar.expense {
  background: #ef4444;
}

.bar-label {
  font-size: 11px;
  color: #666;
  margin-top: 8px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.financial-staff-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.predictions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.prediction-item {
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.prediction-item.up {
  background: #fffbeb;
  border-left-color: #f59e0b;
}

.prediction-item.stable {
  background: #f0fdf4;
  border-left-color: #10b981;
}

.prediction-item.down {
  background: #fef2f2;
  border-left-color: #ef4444;
}

.prediction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.prediction-name {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.prediction-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.prediction-badge.up {
  background: #f59e0b;
  color: white;
}

.prediction-badge.stable {
  background: #10b981;
  color: white;
}

.prediction-badge.down {
  background: #ef4444;
  color: white;
}

.prediction-note {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}

.prediction-timeline {
  font-size: 12px;
  color: #999;
}

.prediction-chart {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.trend-chart {
  width: 100%;
  height: auto;
  margin-bottom: 12px;
}

.legend-line {
  width: 20px;
  height: 3px;
  display: inline-block;
  border-radius: 2px;
}

.staff-list,
.products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.staff-item,
.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.staff-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.staff-info,
.product-info {
  flex: 1;
}

.staff-name,
.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.staff-role,
.product-units {
  font-size: 12px;
  color: #666;
}

.staff-sales,
.product-revenue {
  text-align: right;
}

.sales-amount,
.product-revenue {
  font-size: 14px;
  font-weight: 700;
  color: #10b981;
}

.sales-count {
  font-size: 11px;
  color: #666;
}

.product-rank {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .content-grid,
  .bottom-grid,
  .financial-staff-grid {
    grid-template-columns: 1fr;
  }
  
  .financial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
