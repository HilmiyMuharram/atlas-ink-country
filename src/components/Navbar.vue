<template>
  <nav 
    class="navbar navbar-expand-lg fixed-top "
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container">
      <!-- Brand -->
      <router-link to="/" class="navbar-brand fw-semibold">Atlas & Ink</router-link>

      <!-- Toggle Button (Mobile) -->
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMenu"
        aria-controls="navbarNav"
        :aria-expanded="isMenuOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu Items -->
      <div 
        class="collapse navbar-collapse"
        :class="{ show: isMenuOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" @click="closeMenu">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/explore" class="nav-link" active-class="active" @click="closeMenu">Explore</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active" @click="closeMenu">About Us</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Default navbar transparan */
.navbar {
  background-color: transparent;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Saat discroll */
.navbar-scrolled {
  background-color: white !important;
}

/* Link aktif */
.nav-link.active {
  font-weight: bold;
  color: blueviolet !important;
}

/* Hamburger tanpa border */
.navbar-toggler {
  border: none;
}

/* Icon hamburger custom */
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.7)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>
