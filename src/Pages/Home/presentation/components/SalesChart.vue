<template>
  <div class="sales-chart-card">
    <div class="chart-header">
      <h3 class="chart-title">Ventas de los últimos 7 días</h3>

    </div>
    <div class="chart-container">
      <svg class="chart-svg" viewBox="0 0 600 250" preserveAspectRatio="none">
        <!-- Grid lines -->
        <line v-for="i in 5" :key="'grid-' + i" 
          :x1="0" :y1="i * 50" :x2="600" :y2="i * 50" 
          stroke="#f0f0f0" stroke-width="1" />
        
        <!-- Area fill -->
        <path :d="areaPath" fill="url(#gradient)" opacity="0.3" />
        
        <!-- Line -->
        <path :d="linePath" fill="none" stroke="#3b82f6" stroke-width="3" />
        
        <!-- Points -->
        <circle v-for="(point, index) in chartPoints" :key="'point-' + index"
          :cx="point.x" :cy="point.y" r="5" 
          fill="#3b82f6" stroke="white" stroke-width="2" />
        
        <!-- Gradient definition -->
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
          </linearGradient>
        </defs>
      </svg>
      <div class="chart-labels">
        <span v-for="label in labels" :key="label" class="label">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const data = [7.5, 7.2, 6.8, 7.8, 8.5, 8.2, 7.5];
const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const chartPoints = computed(() => {
  const width = 600;
  const height = 250;
  const padding = 20;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  return data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((value - minValue) / range) * (height - 2 * padding) - padding;
    return { x, y };
  });
});

const linePath = computed(() => {
  if (chartPoints.value.length === 0) return '';
  return chartPoints.value.reduce((path, point, index) => {
    return path + (index === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
  }, '');
});

const areaPath = computed(() => {
  if (chartPoints.value.length === 0) return '';
  const line = linePath.value;
  const lastPoint = chartPoints.value[chartPoints.value.length - 1];
  const firstPoint = chartPoints.value[0];
  return `${line} L ${lastPoint.x},250 L ${firstPoint.x},250 Z`;
});
</script>

<style scoped>
.sales-chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.chart-container {
  position: relative;
}

.chart-svg {
  width: 100%;
  height: auto;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 20px;
}

.label {
  font-size: 12px;
  color: #999;
}
</style>
