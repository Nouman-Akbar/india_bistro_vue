<script setup lang="ts">
import { ref } from 'vue';
import { useParallax } from '@vueuse/core';

const target = ref(null);
const parallax = useParallax(target);
</script>

<template>
  <section ref="target" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div 
      class="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
      :style="{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1585518202020-99155d53c399?q=80&w=2940&auto=format&fit=crop)',
        transform: `scale(1.1) translate(${parallax.tilt * 10}px, ${parallax.roll * 10}px)`
      }"
    >
      <div class="absolute inset-0 bg-black/60"></div>
    </div>
    
    <div class="relative z-10 text-center text-white px-4">
      <h1 
        class="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-text tracking-wider"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        The Art of Flavor
      </h1>
      <p 
        class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-muted"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800, ease: 'easeOut' } }"
      >
        Experience the pinnacle of authentic Chinese cuisine, where tradition meets modern elegance.
      </p>
      <a 
        href="#" 
        class="mt-8 inline-block bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800, ease: 'easeOut' } }"
      >
        Explore The Menu
      </a>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
      <div class="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center items-start p-1">
        <div class="w-1 h-2 bg-text-muted rounded-full animate-bounce"></div>
      </div>
    </div>
  </section>
</template>
