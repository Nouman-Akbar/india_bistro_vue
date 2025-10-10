<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MenuHighlight from './components/MenuHighlight.vue'
import GallerySection from './components/GallerySection.vue'
import AppFooter from './components/AppFooter.vue'

let scroll: LocomotiveScroll;

onMounted(async () => {
  await nextTick();

  const container = document.querySelector('#main');

  if (!container) {
    console.warn('[LocomotiveScroll] Container `#main` not found.');
    return;
  }

  scroll = new LocomotiveScroll({
    el: container as HTMLElement,
    smooth: true,
    direction: 'vertical',
    inertia: 0.5,
    multiplier: 1,
    class: 'locomotive',
    smoothMobile: true,
    tablet: {
      smooth: true,
      inertia: 0.5,
      multiplier: 1,
    },
    mobile: {
      smooth: true,
      inertia: 0.5,
      multiplier: 1,
    },
  });
})

onUnmounted(() => {
  if (scroll) {
    scroll.destroy();
  }
})
</script>

<template>
  <div class="bg-background font-sans" id="main" data-scroll-container>
    <AppHeader data-scroll-section />
    <main>
      <HeroSection class="section" data-scroll-section />
      <MenuHighlight class="section" data-scroll-section />
      <GallerySection class="section" data-scroll-section />
    </main>
    <AppFooter class="section" data-scroll-section />
  </div>
</template>
