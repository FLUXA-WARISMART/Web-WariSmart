<template>
  <div class="access-log-card">
    <div class="card-header">
      <h3 class="card-title">Registro de Accesos</h3>
      <p class="card-subtitle">Últimas sesiones iniciadas</p>
    </div>

    <div class="access-list">
      <div v-for="access in accessLog" :key="access.id" class="access-item">
        <div class="user-avatar">
          <img v-if="access.avatar" :src="access.avatar" :alt="access.nombre" />
          <span v-else>{{ access.initials }}</span>
        </div>
        <div class="access-info">
          <div class="user-name">{{ access.nombre }}</div>
          <div class="access-time">{{ access.tiempo }}</div>
        </div>
        <div class="access-status" :class="access.online ? 'online' : 'offline'"></div>
      </div>
    </div>

    <button class="view-all-button">Ver historial completo</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const accessLog = ref([
  { id: 1, nombre: 'Carlos Ruiz', initials: 'CR', tiempo: 'Hace 5 min', online: true },
  { id: 2, nombre: 'María López', initials: 'ML', tiempo: 'Hace 12 min', online: true },
  { id: 3, nombre: 'Diego Morales', initials: 'DM', tiempo: 'Hace 1 hora', online: false },
  { id: 4, nombre: 'Laura Jiménez', initials: 'LJ', tiempo: 'Hace 2 horas', online: false },
  { id: 5, nombre: 'Roberto Silva', initials: 'RS', tiempo: 'Hace 3 horas', online: false }
]);
</script>

<style scoped>
.access-log-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-subtitle {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.access-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.access-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.user-avatar {
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
  flex-shrink: 0;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.access-info {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.access-time {
  font-size: 12px;
  color: #666;
}

.access-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.access-status.online {
  background: #10b981;
}

.access-status.offline {
  background: #d1d5db;
}

.view-all-button {
  width: 100%;
  padding: 10px;
  background: white;
  color: #3b82f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-all-button:hover {
  background: #f9fafb;
}
</style>
