<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const galleryImages = [
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Noodles' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Soup' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Dim sum' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Restaurant interior' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Plated dish' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Another dish' },
];

const bg_section = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href;

const parallaxContainer = ref<HTMLElement | null>(null);
const rawScrollProgress = ref(0);
const smoothScrollProgress = ref(0);

const scaleTargets = [4, 5, 6, 5, 6, 8, 9];
const frameBaseStyle = Object.freeze({
  height: 'clamp(200px, 35vh, 360px)',
  width: 'clamp(240px, 32vw, 520px)',
});

const layoutOverrides = [
  null,
  { top: '-30vh', left: '5vw', height: '30vh', width: '35vw' },
  { top: '-10vh', left: '-25vw', height: '45vh', width: '20vw' },
  { top: '0', left: '27.5vw', height: '25vh', width: '25vw' },
  { top: '27.5vh', left: '5vw', height: '25vh', width: '20vw' },
  { top: '27.5vh', left: '-22.5vw', height: '25vh', width: '30vw' },
];

const imageTransforms = computed(() =>
  galleryImages.map((_, index) => {
    const targetScale = scaleTargets[index % scaleTargets.length];
    const scale = 1 + (targetScale - 1) * smoothScrollProgress.value;

    return {
      transform: `scale3d(${scale}, ${scale}, 1)`,
      transformOrigin: 'center center',
      willChange: 'transform',
    };
  }),
);

const frameStyles = computed(() =>
  galleryImages.map((_, index) => {
    const overrides = layoutOverrides[index] ?? null;

    if (!overrides) {
      return {
        ...frameBaseStyle,
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
      };
    }

    return {
      ...frameBaseStyle,
      height: overrides.height ?? frameBaseStyle.height,
      width: overrides.width ?? frameBaseStyle.width,
      top: overrides.top ?? '50%',
      left: overrides.left ?? '50%',
      transform: 'translate(-50%, -50%)',
    };
  }),
);

let updateFrameId: number | null = null;
let animationFrameId: number | null = null;

const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0;

  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
};

const updateScrollProgress = () => {
  if (typeof window === 'undefined') return;

  const element = parallaxContainer.value;
  if (!element) {
    rawScrollProgress.value = 0;
    return;
  }

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const elementHeight = rect.height || 1;

  const scrollY = getScrollPosition();
  const elementTop = rect.top + scrollY;
  const elementBottom = elementTop + elementHeight;

  const start = elementTop - viewportHeight;
  const end = elementBottom;
  const range = end - start;

  if (range <= 0) {
    rawScrollProgress.value = scrollY >= end ? 1 : 0;
    return;
  }

  const progress = (scrollY - start) / range;
  rawScrollProgress.value = Math.min(1, Math.max(0, progress));
};

const scheduleUpdate = () => {
  if (typeof window === 'undefined') return;
  if (updateFrameId !== null) return;

  updateFrameId = window.requestAnimationFrame(() => {
    updateFrameId = null;
    updateScrollProgress();
  });
};

// Mimics the smooth easing Lenis + Framer Motion provide in the reference implementation.
const animateScrollProgress = () => {
  if (typeof window === 'undefined') return;

  const delta = rawScrollProgress.value - smoothScrollProgress.value;
  // Small threshold avoids endless frame queuing when the values are in sync.
  if (Math.abs(delta) > 0.0001) {
    smoothScrollProgress.value += delta * 0.08;
  } else {
    smoothScrollProgress.value = rawScrollProgress.value;
  }

  animationFrameId = window.requestAnimationFrame(animateScrollProgress);
};

onMounted(() => {
  updateScrollProgress();
  smoothScrollProgress.value = rawScrollProgress.value;
  if (typeof window !== 'undefined') {
    animationFrameId = window.requestAnimationFrame(animateScrollProgress);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
  }
});

onBeforeUnmount(() => {
  if (updateFrameId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(updateFrameId);
    updateFrameId = null;
  }
  if (animationFrameId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
  }
});
</script>

<template>
  <section class="py-20 sm:py-32 bg-background/95" :style="{ '--bg-image': 'url(' + bg_section + ')' }">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-text">A Feast for the Eyes</h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-text-muted">Discover the ambiance and culinary artistry of The Golden Dragon.</p>
      </div>

      <div
        ref="parallaxContainer"
        class="relative h-[220vh] md:h-[300vh]"
      >
        <div
          class="sticky top-24 md:top-32 h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] w-full overflow-visible"
          v-motion
          :initial="{ opacity: 0, y: 80 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 150,
              duration: 600,
              ease: 'easeOut',
            },
          }"
        >
          <div class="relative h-full w-full">
            <div
              v-for="(image, index) in galleryImages"
              :key="index"
              class="absolute inset-0 flex items-center justify-center"
              :style="imageTransforms[index]"
            >
              <div
                class="relative overflow-hidden rounded-3xl bg-background shadow-[0_25px_80px_-40px_rgba(0,0,0,0.55)] transition-transform duration-500"
                :style="frameStyles[index]"
              >
                <img
                  :src="image.src"
                  :alt="image.alt"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/25"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
