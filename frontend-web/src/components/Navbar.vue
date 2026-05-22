<template>
  <nav class="navbar">
    <div class="navbar-sup">
        <h1 class="logo">Gestión Docente</h1>
        <span class="colegio" v-if="colegio">{{ colegio }}</span>
    </div>
    <div class="divisor"></div>
    <nav class="menu">
        <RouterLink to="/dashboard" class="menu-item">
            Dashboard
        </RouterLink>
        <RouterLink to="/materias" class="menu-item">
            Materias
        </RouterLink>
        <RouterLink to="/documentacion" class="menu-item">
            Documentación
        </RouterLink>
        <RouterLink to="/calendario" class="menu-item">
            Calendario
        </RouterLink>
    </nav>
    <div class="navbar-right">
        <button class="logout-btn" @click="logout">
            Cerrar sesión
        </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const router = useRouter()
    const colegio = ref<string | null>(null)

    onMounted(() => {
        colegio.value = localStorage.getItem('colegio')
    })

    const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('colegio')
    router.push('/')
    }
</script>

<style scoped>
    .navbar {
        width: 240px;
        height: 100%;
        padding: 1.25rem 1rem;
        background: #023047;
        backdrop-filter: blur(14px);
        border-right: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 18px 0 0 18px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .navbar-sup {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .navbar-sup h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        color: #444;
    }
    .colegio {
        font-size: 0.8rem;
        opacity: 0.9;
    }
    .divisor{
        height: 1px;
        background: linear-gradient(
            to right,
            transparent,
            rgba(0,0,0,0.15),
            transparent
        );
    }
    .menu {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }
    .menu-item {
        margin: 0;
        padding: 0.55rem 0.75rem;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 500;
        color: #555;
        text-decoration: none;
        font-size: large;
        transition: background 0.2s ease, color 0.2s ease;
    }
    .menu-item:hover {
        background: rgba(255, 183, 213, 0.35);
    }

    .router-link-active {
        background: #ffb7d5;
        color: #333;
        font-weight: 600;
    }

    .logout-btn {
        background-color: rgba(175, 108, 195, 0.15);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        color: rgb(0, 0, 0);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .logout-btn:hover {
        background-color: rgba(124, 52, 154, 0.25);
    }
</style>