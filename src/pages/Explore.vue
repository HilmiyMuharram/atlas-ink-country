<template>
  <!-- Explore Hero Section -->
  <section class="bg-warning py-5">
    <div class="container d-flex flex-column flex-lg-row align-items-center">
      <div class="text-center text-lg-start mb-4 mb-lg-0">
        <h1 class="fw-semibold display-6 text-dark">Explore Countries</h1>
        <p class="lead text-dark fs-3">Browse by region or search for a specific country.</p>

        <!-- Search Bar -->
        <div class="input-group mt-3 search-wrapper">
          <input 
            type="text" 
            class="form-control searchku" 
            placeholder="Search for a country..." 
            v-model="searchQuery"
            @keyup.enter="filterCountries"
          />
          <button class="btn btnku" @click="filterCountries">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <!-- Right Image -->
      <div class="ms-lg-5">
        <img src="../assets/images/koper2.png" alt="Suitcase" class="img-fluid" style="max-width: 400px;" />
      </div>
    </div>
  </section>

  <!-- Filter Tools -->
  <section class="bg-light py-3">
    <div class="container d-flex justify-content-end align-items-center">
      <!-- Dropdown Region -->
      <div class="dropdown m-2">
        <button 
          class="btn btnfilter btn-sm dropdown-toggle" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          Filter by Region
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('')">All</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Asia')">Asia</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Europe')">Europe</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Africa')">Africa</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Americas')">Americas</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Antarctic')">Antarctic</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="filterByRegion('Oceania')">Oceania</a></li>
        </ul>
      </div>
      <i class="bi bi-funnel" style="font-size: 24px; color: blueviolet;"></i> Filters
    </div>
  </section>

  <!-- Countries Grid -->
  <section class="py-5">
    <div class="container">
      <div class="row g-4">
        <div 
          v-for="country in paginatedCountries" 
          :key="country.name.common" 
          class="col-md-4 col-lg-3 country-card"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-img-wrapper">
              <img :src="country.flags.png" class="card-img-top" :alt="country.name.common" />
              <div class="card-hover-overlay"></div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ country.name.common }}</h5>
              <p class="card-text">
                <strong>Region:</strong> {{ country.region }} <br>
                <strong>Population:</strong> {{ country.population.toLocaleString() }}
              </p>
              <button 
                class="btn btn-warning btn-sm text-dark fw-bold"
                @click="openModal(country)"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center flex-wrap">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link ms-2" @click="changePage(1)">First</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link ms-2" @click="changePage(currentPage - 1)">Previous</button>
          </li>

          <li 
            v-for="page in visiblePages" 
            :key="page" 
            class="page-item" 
            :class="{ active: currentPage === page, disabled: page === '...'}"
          >
            <button class="page-link ms-2" @click="page !== '...' && changePage(page)">{{ page }}</button>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link ms-2" @click="changePage(currentPage + 1)">Next</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link ms-2" @click="changePage(totalPages)">Last</button>
          </li>
        </ul>
      </nav>
    </div>
  </section>

  <!-- Country Modal -->
  <div 
    class="modal fade" 
    id="countryModal" 
    tabindex="-1" 
    aria-labelledby="countryModalLabel" 
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="countryModalLabel">Additional Information</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="selectedCountry">
          <p><strong>Official Name:</strong> {{ selectedCountry.name.official }}</p>
          <p><strong>Languages:</strong> {{ getLanguages(selectedCountry) }}</p>
          <p><strong>Currency:</strong> {{ getCurrencies(selectedCountry) }}</p>
          <p><strong>Timezones:</strong> {{ selectedCountry.timezones.join(', ') }}</p>
          <a 
            :href="selectedCountry?.maps.googleMaps" 
            target="_blank" 
            class="btn btnview"
          >
            View Maps
          </a>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning fw-bold" data-bs-dismiss="modal">Okay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import * as bootstrap from 'bootstrap'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const countries = ref([])
const filteredCountries = ref([])
const searchQuery = ref('')
const selectedCountry = ref(null)
const modalRef = ref(null)
let modalInstance = null

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12
const totalPages = computed(() =>
  Math.ceil(filteredCountries.value.length / itemsPerPage)
)

const paginatedCountries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCountries.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  } else {
    if (currentPage.value <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages.value)
    } else if (currentPage.value >= totalPages.value - 3) {
      pages.push(1, '...', totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value)
    } else {
      pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', totalPages.value)
    }
  }
  return pages
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    animateCards()
  }
}

const filterCountries = () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    filteredCountries.value = countries.value;
  } else {
    filteredCountries.value = countries.value.filter(c =>
      c.name.common.toLowerCase().includes(query)
    );
  }
  currentPage.value = 1;
  animateCards();
}

const filterByRegion = (region) => {
  if (!region) {
    filteredCountries.value = countries.value
  } else {
    filteredCountries.value = countries.value.filter(c => c.region === region)
  }
  currentPage.value = 1
}

const openModal = (country) => {
  selectedCountry.value = country
  modalInstance.show()
}

const getLanguages = (country) => {
  return country.languages ? Object.values(country.languages).join(', ') : 'N/A'
}

const getCurrencies = (country) => {
  if (!country.currencies) return 'N/A'
  return Object.values(country.currencies)
    .map(c => `${c.name} (${c.symbol})`)
    .join(', ')
}

const animateCards = async () => {
  await nextTick()
  gsap.from(".country-card", {
    scrollTrigger: {
      trigger: ".country-card",
      start: "top 91%",
      once: true
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  })
}

onMounted(async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies,timezones,maps')
  countries.value = await res.json()
  filteredCountries.value = countries.value

  modalInstance = new bootstrap.Modal(modalRef.value)

  animateCards()

  // Animasi GSAP untuk Hero Section
  gsap.from(".bg-warning h1", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  })

  gsap.from(".bg-warning p", {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  })

  gsap.from(".bg-warning .input-group", {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out"
  })

  gsap.from(".bg-warning img", {
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out"
  })
})
</script>

<style scoped>

.btnview{
  background-color: blueviolet;
  color: white;
}

section.bg-light {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.btnfilter {
  height: 40px;
  border-radius: 6px;
  background-color: blueviolet;
  color: white;
  font-size: 0.9rem;
}

.btnfilter:hover {
  background-color: indigo;
  color: white;
}

.dropdown-menu {
  min-width: 150px;
}



/*bagian hero*/
.bg-warning.py-5 {
  background-color: #FFCC00 !important;
}

.search-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

.form-control.searchku {
  height: 50px;
  font-size: 1rem;
  border: 2px solid blueviolet;
  border-radius: 6px 0 0 6px;
}

.btnku {
  height: 50px;
  border-radius: 0 6px 6px 0;
  background-color: blueviolet;
  color: white;
  font-size: 1.1rem;
}

.btnku:hover {
  background-color: indigo;
}

.bg-warning.py-5 .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.bg-warning.py-5 .text-lg-start {
  text-align: center !important;
}

.bg-warning.py-5 img {
  margin-top: 20px;
}

.card {
  overflow: hidden;
  max-width: 280px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 4px solid blueviolet;
}

.card-img-wrapper {
  position: relative;
  overflow: hidden;
  border: 5px solid whitesmoke;
  height: 180px;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-body .btn {
  align-self: flex-end;
  margin-top: auto;
  padding: 8px 16px;
  font-size: 1rem;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.card-hover-overlay {
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-hover-overlay {
  opacity: 1;
}

.pagination .page-link:hover {
  background-color: blueviolet;
  color: white;
  border-color: blueviolet;
}

.pagination .page-item.active .page-link {
  background-color: blueviolet;
  border-color: blueviolet;
  color: white;
}
</style>
