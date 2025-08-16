import { createRouter, createWebHistory } from 'vue-router'

// Import halaman
import Home from '../pages/Home.vue'
import Explore from '../pages/Explore.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Home - Explore Countries' } },
  { path: '/explore', name: 'Explore', component: Explore ,meta: { title: ' Explore ' }},
  { path: '/about', name: 'About', component: About , meta: { title: 'About' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Explore Countries'
  next()
})
export default router
