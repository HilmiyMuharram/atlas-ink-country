<template>
  <!-- Hero / Banner Section -->
  <section ref="bannerRef" class="bg-success bg-opacity-25 text-center d-flex align-items-center justify-content-center banner-section">
    <div class="container">
      <h1 class="fw-bold text-dark">ABOUT US</h1>
    </div>
  </section>

  <!-- Profile Image -->
  <section class="text-center">
    <img 
      ref="profileRef"
      src="../assets/images/team9.jpg" 
      alt="Profile" 
      class="rounded-circle border border-white shadow profileimg" 
    />
  </section>

  <!-- Content Section -->
  <section class="py-5">
    <div class="container">
      <div class="row g-4">
        <div 
          class="col-md-6" 
          v-for="(box, idx) in contentBoxes" 
          :key="idx"
          ref="contentRefs"
        >
          <div class="p-4 bg-light rounded shadow-sm h-100">
            <h4 class="fw-bold">{{ box.title }}</h4>
            <p class="text-muted">{{ box.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// Refs
const bannerRef = ref(null)
const profileRef = ref(null)
const contentRefs = ref([])

// Data konten
const contentBoxes = [
  { 
    title: "Our Story", 
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Vivamus himenaeos netus arcu non pretium 
            rhoncus nibh vitae vulputate accumsan gravida. Consectetur vulputate malesuada
            leo suscipit tellus imperdiet augue at etiam egestas nisi suscipit elit interdum aenean. 
            Aenean dictum cras tortor primis vehicula quam vulputate habitant conubia elit dolor primis fermentum. 
            Nullam turpis consectetur elementum per pellentesque himenaeos orci vel vestibulum.
            Consectetur litora sodales lobortis nunc iaculis sollicitudin curae suspendisse fermentum. 
            Rutrum augue aptent laoreet dui sed habitasse sit augue etiam semper laoreet.
            Convallis duis malesuada aenean maecenas dapibus.`
  },
  { 
    title: "Our Vision", 
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Vivamus himenaeos netus arcu non pretium 
            rhoncus nibh vitae vulputate accumsan gravida. Consectetur vulputate malesuada
            leo suscipit tellus imperdiet augue at etiam egestas nisi suscipit elit interdum aenean. 
            Aenean dictum cras tortor primis vehicula quam vulputate habitant conubia elit dolor primis fermentum. 
            Nullam turpis consectetur elementum per pellentesque himenaeos orci vel vestibulum.
            Consectetur litora sodales lobortis nunc iaculis sollicitudin curae suspendisse fermentum. 
            Rutrum augue aptent laoreet dui sed habitasse sit augue etiam semper laoreet.
            Convallis duis malesuada aenean maecenas dapibus.`
  }
]

onMounted(async () => {
  // Fade down banner
  gsap.from(bannerRef.value, { y: -50, opacity: 0, duration: 1, ease: "power3.out" })

  // Fade up profile image
  gsap.from(profileRef.value, { y: 50, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" })

  // Tunggu DOM content selesai dirender
  await nextTick()

  // Fade up konten "Our Story" dan "Our Vision"
  gsap.from(contentRefs.value, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    delay: 0.6,
    ease: "power3.out"
  })
})
</script>

<style scoped>
.banner-section {
  min-height: 50vh; /* tinggi hero */
}

.profileimg {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: -100px; 
  position: relative;
  border: 8px solid white !important;
}
</style>
