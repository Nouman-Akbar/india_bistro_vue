<template>
  <section
    class="parallax-wrapper"
    :style="{
      backgroundImage: `url(${sectionBgPattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center'
    }"
  >
    <div class="parallax-icon-overlay" aria-hidden="true">
      <img :src="bigBgIcon" alt="" class="parallax-icon" />
    </div>

    <div class="parallax-gallery" ref="container">
      <div class="parallax-sticky">
        <div
          v-for="(image, index) in resolvedImages"
          :key="image.id ?? `${image.src}-${index}`"
          class="parallax-item"
          :style="imageStyles[index]"
        >
          <div class="parallax-card" :class="positionClasses[index]">
            <img :src="image.src" :alt="image.alt" class="parallax-image" />
          </div>
        </div>
      </div>
    </div>

    <div class="parallax-outro" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const sectionBgPattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href;
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href;

interface ParallaxItemInput {
  id?: number | string;
  image?: string;
  src?: string;
  title?: string;
  category?: string;
  alt?: string;
}

interface ResolvedParallaxItem {
  id: number | string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

const props = defineProps<{
  items?: ParallaxItemInput[];
}>();

const fallbackImages: ResolvedParallaxItem[] = [
  {
    id: 'fallback-1',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Modern architecture building',
    title: 'Modern Architecture',
    category: 'Design',
  },
  {
    id: 'fallback-2',
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Urban cityscape at sunset',
    title: 'Cityscape',
    category: 'Sunset',
  },
  {
    id: 'fallback-3',
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Abstract geometric pattern',
    title: 'Geometric Pattern',
    category: 'Art',
  },
  {
    id: 'fallback-4',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Mountain landscape',
    title: 'Mountain Vista',
    category: 'Nature',
  },
  {
    id: 'fallback-5',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Minimalist design elements',
    title: 'Minimalist Elements',
    category: 'Design',
  },
  {
    id: 'fallback-6',
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Ocean waves and beach',
    title: 'Ocean Waves',
    category: 'Nature',
  },
  {
    id: 'fallback-7',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Forest trees and sunlight',
    title: 'Forest Light',
    category: 'Nature',
  },
];

const resolvedImages = computed<ResolvedParallaxItem[]>(() => {
  if (props.items && props.items.length) {
    return props.items
      .map((item, index) => {
        const src = item.image || item.src;
        if (!src) {
          return undefined;
        }
        return {
          id: item.id ?? `item-${index}`,
          src,
          alt: item.alt ?? item.title ?? `Parallax image ${index + 1}`,
          title: item.title,
          category: item.category,
        };
      })
      .filter((item): item is ResolvedParallaxItem => Boolean(item));
  }

  return fallbackImages;
});

const desktopScaleTargets = [2.5, 3, 3.5, 3, 3.5, 4, 4.5];
const mobileScaleTargets = [1.15, 1.25, 1.35, 1.25, 1.35, 1.45, 1.55];
const MOBILE_BREAKPOINT = 768;

const container = ref<HTMLElement | null>(null);
const progress = ref(0);
const displayProgress = ref(0);
const isMobile = ref(false);
let frameId: number | null = null;
const easingFactor = 0.18;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const updateProgress = () => {
  const el = container.value;
  if (!el) {
    progress.value = 0;
    return;
  }

  const rect = el.getBoundingClientRect();
  const doc = document.documentElement;
  const body = document.body;
  const scrollY =
    window.scrollY ??
    window.pageYOffset ??
    doc?.scrollTop ??
    body?.scrollTop ??
    0;

  const viewportHeight = window.innerHeight;
  const containerTop = scrollY + rect.top;
  const containerHeight = rect.height;
  const start = containerTop;
  const end = containerTop + containerHeight - viewportHeight;

  if (end <= start) {
    progress.value = 1;
    return;
  }

  const rawProgress = (scrollY - start) / (end - start);
  progress.value = clamp(rawProgress, 0, 1);
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
};

onMounted(() => {
  let initialized = false;

  const tick = () => {
    updateProgress();
    const delta = progress.value - displayProgress.value;

    if (!initialized) {
      displayProgress.value = progress.value;
      initialized = true;
    } else {
      displayProgress.value += delta * easingFactor;
      if (Math.abs(delta) < 0.001) {
        displayProgress.value = progress.value;
      }
    }

    frameId = requestAnimationFrame(tick);
  };

  updateProgress();
  handleResize();
  displayProgress.value = progress.value;
  frameId = requestAnimationFrame(tick);
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress);
  window.removeEventListener('resize', updateProgress);
  window.removeEventListener('resize', handleResize);
  if (frameId !== null) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
});

const imageStyles = computed(() =>
  resolvedImages.value.map((_, index) => {
    const targets = isMobile.value ? mobileScaleTargets : desktopScaleTargets;
    const baseScale = targets[index % targets.length];
    const eased = Math.min(displayProgress.value, 1);
    const scale = 1 + eased * (baseScale - 1);
    return {
      transform: `scale(${scale.toFixed(4)})`,
    };
  }),
);

const positionClasses = [
  'position-default',
  'position-one',
  'position-two',
  'position-three',
  'position-four',
  'position-five',
  'position-six',
];
</script>

<style scoped>
.parallax-wrapper {
  background-color: #f5f1e8;
  overflow: hidden;
  position: relative;
  padding: clamp(3rem, 6vw, 5rem) 0;
}

.parallax-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 820px;
  z-index: 1;
  pointer-events: none;
}

.parallax-icon {
  width: 100%;
  height: auto;
  opacity: 0.65;
}

.parallax-gallery {
  height: 120vh;
  margin: 0 auto;
  position: relative;
  width: 100%;
  z-index: 2;
}

.parallax-sticky {
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100%;
}

.parallax-item {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: center center;
  transition: transform 0.1s ease-out;
  width: 100%;
  will-change: transform;
}

.parallax-card {
  height: 25vh;
  position: relative;
  width: 25vw;
}

.parallax-card::after {
  border: 12px solid rgba(32, 42, 44, 0.16);
  content: '';
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: scale(1.02);
  width: 100%;
}

.parallax-image {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.parallax-outro {
  height: 0;
}

.position-default {
  top: 0;
}

.position-one {
  height: 30vh;
  left: 5vw;
  top: -30vh;
  width: 35vw;
}

.position-two {
  height: 45vh;
  left: -25vw;
  top: -10vh;
  width: 20vw;
}

.position-three {
  height: 25vh;
  left: 27.5vw;
  top: 0;
  width: 25vw;
}

.position-four {
  height: 25vh;
  left: 5vw;
  top: 27.5vh;
  width: 20vw;
}

.position-five {
  height: 25vh;
  left: -22.5vw;
  top: 27.5vh;
  width: 30vw;
}

.position-six {
  height: 15vh;
  left: 25vw;
  top: 22.5vh;
  width: 15vw;
}

@media (max-width: 768px) {
  .parallax-wrapper {
    padding: clamp(2rem, 6vw, 3rem) 0;
  }

  .parallax-gallery {
    height: auto;
    width: min(92vw, 320px);
    margin: 0 auto;
  }

  .parallax-sticky {
    position: static;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: clamp(90px, 16vh, 130px);
    gap: clamp(0.6rem, 2vw, 1rem);
    align-items: stretch;
    justify-items: stretch;
    grid-auto-flow: dense;
    height: auto;
    top: auto;
    left: auto;
    overflow: visible;
    padding-bottom: clamp(1rem, 3vh, 2rem);
  }

  .parallax-item {
    position: relative;
    width: 100%;
    height: 100%;
    transform: none !important;
    left: auto;
    top: auto;
  }

  .parallax-card {
    position: relative;
    width: 100%;
    height: 100%;
    left: auto;
    top: auto;
  }

  .parallax-card::after {
    border-width: 4px;
  }

  .parallax-item:nth-child(1) { grid-column: 1; grid-row: 1 / span 3; }
  .parallax-item:nth-child(2) { grid-column: 2 / span 2; grid-row: 1; }
  .parallax-item:nth-child(3) { grid-column: 2; grid-row: 2; }
  .parallax-item:nth-child(4) { grid-column: 3; grid-row: 2; }
  .parallax-item:nth-child(5) { grid-column: 2; grid-row: 3; }
  .parallax-item:nth-child(6) { grid-column: 3; grid-row: 3; }
  .parallax-item:nth-child(7) { grid-column: 3; grid-row: 4; }
}

@media (max-width: 560px) {
  .parallax-gallery {
    width: min(94vw, 280px);
  }

  .parallax-sticky {
    grid-auto-rows: clamp(80px, 18vh, 120px);
    gap: clamp(0.5rem, 2.5vw, 0.9rem);
  }
}
</style>
