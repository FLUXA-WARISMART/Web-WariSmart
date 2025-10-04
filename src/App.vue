<script setup>
import Navbar from './Home/shared/components/Navbar.vue';
import DashboardView from './Home/dashboard/views/DashboardView.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <DashboardView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  background: #f9fafb;
}

.main-content {
  width: 100%;
}
</style>
