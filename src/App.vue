<script setup>
import Footer from './components/layout/Footer.vue'
import NavBar from './components/layout/NavBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg-soft">
    <NavBar />
    <router-view class="flex-1" />
    <Footer />
  </div>
</template>
