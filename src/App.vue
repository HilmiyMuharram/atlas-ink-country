<template>
  <div>
    <!-- Navbar tetap fixed -->
    <Navbar />

    <!-- Konten semua halaman -->
    <main>
      <router-view />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
/* Default untuk layar kecil (HP) */
.page-content {
  padding-top: 70px; /* tinggi navbar di HP */
}

/* Untuk layar besar (tablet/desktop) */
@media (min-width: 992px) {
  .page-content {
    padding-top: auto; /* tinggi navbar di desktop */
  }
}
</style>
