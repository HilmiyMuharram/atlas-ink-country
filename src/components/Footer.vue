<template>
  <footer class="pt-4 pb-2 mt-auto" style="background-color: blueviolet; color: white;">
    <div class="container">
      <div class="row">
        <!-- Brand Info -->
        <div class="col-md-3 mb-3">
          <h5 class="fw-bold display-6">Atlas & Ink</h5>
          <p>Documenting the world one country at a time.</p>
        </div>

        <!-- Navigation -->
        <div class="col-md-3 mb-3">
          <h5 class="fw-bold fs-5">Pages</h5>
          <ul class="list-unstyled">
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/">Home</router-link></li>
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/explore">Explore</router-link></li>
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/about">About Us</router-link></li>
          </ul>
        </div>
        <div class="col-md-3 mb-3">
          <h5 class="fw-bold fs-5">Services & Support</h5>
          <ul class="list-unstyled">
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/">Contact Us</router-link></li>
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/explore">Term Conditions</router-link></li>
            <li><router-link class="text-white text-decoration-none fw-semibold" to="/about">Privacy Policy</router-link></li>
          </ul>
        </div>
        <!-- Social Media -->
        <div class="col-md-3 mb-3">
          <h5 class="fw-bold fs-5">Follow Us</h5>
          <div class="d-flex gap-3 fs-4">
            <a href="#" class="text-white"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-white"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="text-white"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="text-white"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
      </div>

      <div class="text-center border-top border-light pt-2 mt-3">
        <small>&copy; 2025 Atlas & Ink. All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
a:hover {
  opacity: 0.8;
}
</style>
