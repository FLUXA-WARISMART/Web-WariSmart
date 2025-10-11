<template>
  <div class="users-view">
    <div class="users-header">
      <div>
        <h1 class="page-title">{{ $t('users.title') }}</h1>
        <p class="page-subtitle">{{ $t('users.subtitle') }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <UsersStats :stats="stats" />

    <!-- Roles and Access Grid -->
    <div class="roles-access-grid">
      <RolesPermissions />
      <AccessLog />
    </div>

    <!-- Performance Table -->
    <PerformanceTable />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UsersStats from '../components/UsersStats.vue';
import RolesPermissions from '../components/RolesPermissions.vue';
import AccessLog from '../components/AccessLog.vue';
import PerformanceTable from '../components/PerformanceTable.vue';

const stats = ref({
  totalUsuarios: 24,
  rolesActivos: 6,
  sesionesHoy: 18,
  rendimiento: '92%'
});
</script>

<style scoped>
.users-view {
  padding: 32px;
  background: #f9fafb;
  min-height: 100vh;
}

.users-header {
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

.roles-access-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 1200px) {
  .roles-access-grid {
    grid-template-columns: 1fr;
  }
}
</style>
