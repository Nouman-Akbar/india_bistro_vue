<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MenuHighlight from './components/MenuHighlight.vue'
import GallerySection from './components/GallerySection.vue'
import AppFooter from './components/AppFooter.vue'

let scroll: LocomotiveScroll;

onMounted(() => {
  scroll = new LocomotiveScroll({
    el: document.querySelector('#main') as HTMLElement,
    smooth: true,
  });
})

onUnmounted(() => {
  if (scroll) {
    scroll.destroy();
  }
})
</script>

<template>
  <div class="bg-background font-sans" id="main">
    <AppHeader />
    <main>
      <HeroSection class="section" />
      <MenuHighlight class="section" />
      <GallerySection class="section" />
    </main>
    <AppFooter class="section" />
  </div>
</template>
