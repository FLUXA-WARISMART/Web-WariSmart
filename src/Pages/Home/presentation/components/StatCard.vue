<template>
  <div class="stat-card">
    <div class="stat-header">
      <div class="stat-info">
        <h3 class="stat-title">{{ title }}</h3>
        <div class="stat-value">{{ value }}</div>
        <div class="stat-change" :class="changeClass">
          <span class="change-icon">{{ changeIcon }}</span>
          <span>{{ changeText }}</span>
        </div>
      </div>
      <div class="stat-icon" :style="{ backgroundColor: iconBgColor }">
        <component :is="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  changeText: String,
  changeType: {
    type: String,
    default: 'positive' // positive, negative, neutral
  },
  icon: Object,
  iconBgColor: {
    type: String,
    default: '#e3f2fd'
  }
});

const changeClass = computed(() => {
  return {
    'positive': props.changeType === 'positive',
    'negative': props.changeType === 'negative',
    'neutral': props.changeType === 'neutral'
  };
});

const changeIcon = computed(() => {
  if (props.changeType === 'positive') return '↑';
  if (props.changeType === 'negative') return '↓';
  return '⚠';
});
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.stat-change {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-change.neutral {
  color: #f59e0b;
}

.change-icon {
  font-size: 14px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>
