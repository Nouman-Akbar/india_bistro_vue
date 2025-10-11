<script setup lang="ts">
import { nextTick, onMounted, onUnmounted } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MenuHighlight from './components/MenuHighlight.vue'
import StorySection from './components/StorySection.vue'
import SliderSection from './components/SliderSection.vue'
import GallerySection from './components/GallerySection.vue'
import AppFooter from './components/AppFooter.vue'
import { favouritesSection, specialtiesSection, dessertsSection } from './data/sliderSections'

let scroll: any;  
const containerSelector = '#main';
const handleScrollTriggerRefresh = () => {
  scroll?.update();
};

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger);
  await nextTick();

  const container = document.querySelector(containerSelector);

  if (!container) {
    console.warn('[LocomotiveScroll] Container `#main` not found.');
    return;
  }

  const locoOptions = {
    el: container as HTMLElement,
    smooth: true,
    multiplier: 1,
    lerp: 0.08,
    smoothMobile: true,
  } as Record<string, unknown>;

  scroll = new LocomotiveScroll(locoOptions as any);

  (window as typeof window & { locoScroll?: any }).locoScroll = scroll;

  const globalWindow = window as typeof window & { __gsapLocoProxySetup?: boolean };
  const containerElement = container as HTMLElement;

  if (!globalWindow.__gsapLocoProxySetup) {
    ScrollTrigger.scrollerProxy(containerSelector, {
      scrollTop(value) {
        if (typeof value === 'number') {
          scroll.scrollTo(value, { duration: 0, disableLerp: true });
          return;
        }

        return scroll.scroll?.instance?.scroll?.y ?? 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: containerElement.style.transform ? 'transform' : 'fixed',
    });

    globalWindow.__gsapLocoProxySetup = true;
  }

  scroll.on('scroll', ScrollTrigger.update);
  ScrollTrigger.addEventListener('refresh', handleScrollTriggerRefresh);
  ScrollTrigger.refresh();
})

onUnmounted(() => {
  if (scroll) {
    scroll.off?.('scroll', ScrollTrigger.update);
    scroll.destroy();
  }

  ScrollTrigger.removeEventListener('refresh', handleScrollTriggerRefresh);
  (window as typeof window & { locoScroll?: any }).locoScroll = undefined;
})
</script>

<template>
  <div class="bg-background font-sans" id="main" data-scroll-container>
    <AppHeader data-scroll-section />
    <main>
      <HeroSection class="section" data-scroll-section />
      <MenuHighlight class="section" data-scroll-section />
      <StorySection class="section" data-scroll-section />
      
      <!-- Dynamic Slider Sections -->
      <SliderSection 
        :section-data="favouritesSection" 
        class="section" 
        data-scroll-section 
      />
      <SliderSection 
        :section-data="specialtiesSection" 
        class="section" 
        data-scroll-section 
      />
      <SliderSection 
        :section-data="dessertsSection" 
        class="section" 
        data-scroll-section 
      />
      
      <GallerySection class="section" data-scroll-section />
    </main>
    <AppFooter class="section" data-scroll-section />
  </div>
</template>
