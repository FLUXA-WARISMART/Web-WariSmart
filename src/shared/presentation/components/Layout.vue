<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../../../Pages/Home/presentation/components/Navbar.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: #f9fafb;
}
</style>
