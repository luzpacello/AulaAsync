<script setup lang="ts">
import Navbar from '../components/Navbar.vue';

</script>

<template>
    <div class="main-layout">
      <Navbar />
        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
  .main-layout{
    min-height: 100vh;
    background-color: #5374a5; /* 👈 fondo fijo */
    display: flex;
    flex-direction: column;
  }
  .content{
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
  }
</style>