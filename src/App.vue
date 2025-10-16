<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const router = useRouter()

let scroll: any;  
const containerSelector = '#main';
const handleScrollTriggerRefresh = () => {
  scroll?.update();
};

// Reinitialize scroll on route change
watch(() => router.currentRoute.value.path, async () => {
  await nextTick()
  scroll?.update()
  ScrollTrigger.refresh()
})

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
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 351 27"  fill="none">
      <clipPath id="curvedDiamond" clipPathUnits="userSpaceOnUse">
        <path d="M276.519 54C281.345 44.94 288.288 38.1 293.232 33.9C298.351 29.58 302.529 27.24 303 27C302.47 26.7 298.292 24.3 293.232 20.1C288.23 15.96 281.286 9.06 276.519 0H26.4809C21.6555 9.06 14.7116 15.9 9.7685 20.1C4.64886 24.42 0.470771 26.76 0 27C0.529617 27.3 4.70771 29.7 9.7685 33.9C14.7704 38.04 21.7143 44.94 26.4809 54H276.519Z" fill="currentColor"/>
      </clipPath>
    </svg>
    
    <AppHeader />
    <main data-scroll-section>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter data-scroll-section />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
