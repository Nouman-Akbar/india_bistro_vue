<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DragonIcon from './icons/DragonIcon.vue';

const navLinks = ['Menu', 'About', 'Contact'];
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      scrolled ? 'bg-background/70 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center space-x-3">
          <DragonIcon class="h-8 w-8 text-accent" />
          <span class="text-xl font-serif font-bold text-text">India Bistro</span>
        </div>
        <nav class="hidden md:flex items-center space-x-8">
          <a v-for="link in navLinks" :key="link" href="#" class="text-text-muted hover:text-accent transition-colors duration-300">
            {{ link }}
          </a>
        </nav>
        <a href="#" class="hidden md:inline-block bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
          Reserve Table
        </a>
        <button class="md:hidden text-text">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
