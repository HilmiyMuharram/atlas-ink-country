import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// Import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Import JS Bootstrap bundle 
import * as bootstrap from 'bootstrap'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(router)

app.config.globalProperties.$bootstrap = bootstrap

app.mount('#app')
