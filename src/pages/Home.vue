<template>
  <!-- Hero Section -->
  <section 
    class="position-relative overflow-hidden" 
    :style="`background: url(${heroBg}) no-repeat center/cover; min-height: 70vh;`"
  >
    <div class="container py-5 d-flex flex-column flex-lg-row align-items-center justify-content-between">
      
      <!-- Left Content -->
      <div ref="heroTitle" class="text-center text-lg-start mb-4 mb-lg-0">
        <h1 class="fw-normal display-4">
          Documenting the <span class="highlight">world</span><br/>one country at a time.
        </h1>
        <p class="lead">Your first stop before the journey begins.</p>
        <router-link to="/explore" class="btn btn-warning btn-lg text-dark fw-semibold mt-2">
          Explore Now
        </router-link>
      </div>

      <!-- Right Image Wrapper -->
      <div class="hero-image-wrapper position-relative ms-auto" ref="heroImg">
        <!-- Kotak Dekorasi -->
        <img 
          :src="kotakImg" 
          alt="Kotak Dekorasi" 
          class="kotak-dekor position-absolute"
        />
        <!-- Gambar Koper -->
        <img 
          :src="koperImg" 
          alt="Koper" 
          class="koper-img position-relative" 
        />
      </div>
    </div>
  </section>

  <!-- What We Offer Section -->
  <section class="py-5">
    <div class="container text-center">
        <h2 class="fw-semibold mb-4">What We Offer</h2>
        <div class="row g-4">
        <div 
            v-for="(item, index) in offers" 
            :key="index" 
            class="col-md-4" 
            ref="offerCards"
        >
            <a :href="item.link" target="_blank" class="text-decoration-none">
            <div class="p-4 border rounded h-100 shadow-sm" style="border-color: blueviolet;">
            <i :class="item.icon + ' display-4'" style="color: blueviolet;"></i>
            <h5 class="mt-3 fw-bold" style="color: blueviolet;">{{ item.title }}</h5>
            <p class="text-muted" style="color: blueviolet;">{{ item.description }}</p>
            </div>
            </a>
        </div>
        </div>
    </div>
  </section>

  <!-- Our Mission Section -->
  <section class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-end">
            <!-- Kolom teks di kanan -->
            <div class="col-lg-9 text-lg-end text-center" ref="missionText">
                <h2 class="fw-semibold mb-3">
                Our <span class="text-accent">Mission</span>
                </h2>
                <p class="text-muted fs-4">
                At <span  class="highlight">Atlas & Ink</span>, we believe the world is best understood one country at a time.
                Our mission is to bring you reliable information, stunning visuals,
                and fascinating cultural facts whether you’re a traveler,
                student, or just curious about the world.
                </p>
            </div>
            </div>
        </div>
    </section>

    <!-- Section Our Testimonials -->
    <section class="py-5" style="background-color:aliceblue;">
        <div class="container text-center">
            <h2 class="fw-seminormal mb-5">Our Testimonials</h2>
            <div class="row g-4">
            <div
                v-for="(testimonial, index) in testimonials"
                :key="index"
                class="col-md-4"
                ref="testimonialCards"
            >
                <div class="p-4 bg-white shadow-sm rounded h-100">
                <img
                    :src="testimonial.image"
                    alt="User"
                    class="rounded-circle mb-3"
                    width="80"
                    height="80"
                />
                <h5 class="fw-bold" style="color: blueviolet;">{{ testimonial.name }}</h5>
                <p class="text-muted small">{{ testimonial.email }}</p>
                <p class="fst-italic">"{{ testimonial.text }}"</p>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = ref([])
const testimonialCards = ref([])

onMounted(async () => {
  // Fetch API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  const komen = await res.json()

  const resUsers = await fetch('https://randomuser.me/api/?results=3')
  const users = await resUsers.json()

  testimonials.value = komen.slice(0, 3).map((item, i) => ({
    name: `${users.results[i].name.first} ${users.results[i].name.last}`,
    email: item.email,
    text: item.body,
    image: users.results[i].picture.large
  }))

  // Tunggu sampai DOM testimonialCards selesai dirender
  await nextTick()

  gsap.from(testimonialCards.value, {
    scrollTrigger: {
      trigger: testimonialCards.value[0]?.parentElement,
      start: "top 85%",
      toggleActions: "play none none reset"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  })
})

// Register plugin
gsap.registerPlugin(ScrollTrigger)

// Refs untuk animasi
const heroTitle = ref(null)
const heroImg = ref(null)
const offerCards = ref([])
const missionText = ref(null)

// Import gambar
import heroBg from '../assets/images/Vektor1.png'
import koperImg from '../assets/images/koper.png'
import kotakImg from '../assets/images/kotak.png'

// Data konten What We Offer
const offers = ref([
  {
    title: "Global Snapshots",
    description: "Key details about every recognized country, always updated.",
    icon: "bi bi-globe",
    link: "#"
  },
  {
    title: "Plan Your Adventure",
    description: "Insights that help you prepare or inspire your next trip.",
    icon: "bi bi-airplane",
    link: "#"
  },
  {
    title: "Discover Cultures",
    description: "From languages to local currencies, learn what makes each place unique",
    icon: "bi bi-search",
    link: "#"
  }
])

onMounted(() => {
  // Hero Title
  gsap.from(heroTitle.value, {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })

  // Hero Image
  gsap.from(heroImg.value, {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.3,
  })

  // Offer Cards
  gsap.from(offerCards.value, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    delay: 0.2,
    scrollTrigger: {
      trigger: offerCards.value[0]?.parentElement,
      start: "top 88%",
      toggleActions: "play none none reset"
    }
  })

  // Mission Text
  gsap.from(missionText.value, {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: missionText.value,
      start: "top 85%",
      toggleActions: "play none none reset"
    }
  })
})
</script>

<style scoped>
.hero-image-wrapper {
  margin-left: auto;
}

.highlight {
  color: blueviolet;
}

/* Kotak dekorasi  */
.kotak-dekor {
  width: 350px;
  z-index: 0;
  top: 60%;          
  left: 65%;
  transform: translate(-50%, -50%);
}

/* Koper  */
.koper-img {
  max-width: 400px;
  z-index: 1;
  position: relative; 
  left: -140px;        
  top: 45px;         
}

/* Responsif */
@media (max-width: 768px) {
  .kotak-dekor {
    width: 250px;
    top: 50%;
    left: 90%;
    transform: translate(-50%, -50%);
  }
  .koper-img {
    max-width: 250px;
    left: -50px;         
    top: 5px;         
  }
}
</style>
