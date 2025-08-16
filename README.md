# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


# 🌍 Atlas & Ink Country  

Atlas & Ink Country adalah aplikasi berbasis Vue.js yang menampilkan informasi negara-negara di dunia.  
Project ini menggunakan beberapa API publik untuk data negara, testimonial, dan user profile.  

## ✨ Fitur Utama
- 🔍 **Search & Filter**: Cari negara berdasarkan nama atau filter berdasarkan region.  
- 🌐 **Detail Negara**: Tampilkan informasi detail seperti bahasa, mata uang, populasi, dan timezone.  
- 📑 **Pagination**: Navigasi data negara dengan pagination.  
- 🎨 **Animasi**: Animasi interaktif menggunakan **GSAP** dan **ScrollTrigger**.  
- 👥 **Testimonials**: Data komentar dari **JSONPlaceholder** dan profil dari **RandomUser API**.  

## 📡 API yang Digunakan
- **Rest Countries API**  
  👉 [https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies,timezones,maps](https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies,timezones,maps)  
  Untuk menampilkan daftar negara, bendera, populasi, region, bahasa, mata uang, dan link Google Maps.  

- **JSONPlaceholder API**  
  👉 [https://jsonplaceholder.typicode.com/posts/1/comments](https://jsonplaceholder.typicode.com/posts/1/comments)  
  Digunakan untuk mengambil data komentar (email & body teks).  

- **RandomUser API**  
  👉 [https://randomuser.me/api/?results=3](https://randomuser.me/api/?results=3)  
  Digunakan untuk menampilkan foto profil dan nama pengguna testimonial.  

## 🛠️ Teknologi yang Digunakan
- [Vue 3 + Vite](https://vitejs.dev/)  
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)  
- [GSAP + ScrollTrigger](https://gsap.com/) untuk animasi  
- [RestCountries API](https://restcountries.com/)  
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)  
- [RandomUser](https://randomuser.me/)  

## 🚀 Instalasi & Menjalankan Project

1. Clone repository
   ```bash
   git clone https://github.com/HilmiyMuharram/atlas-ink-country.git
   cd atlas-ink-country
2. Install dependencies
    npm install
3. Install tambahan (GSAP, Bootstrap, BootstrapIcons)
   npm install gsap bootstrap bootstrap-icons

4. Jalankan aplikasi
   npm run dev

