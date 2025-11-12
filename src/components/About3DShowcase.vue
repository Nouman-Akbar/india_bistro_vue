<template>
  <section class="relative overflow-hidden lg:overflow-visible py-20 px-4 sm:py-18 sm:px-6 md:px-12">
    <div
      class="absolute inset-0 bg-repeat opacity-[0.96]"
      :style="{
        backgroundImage: `url(${sectionBgPattern})`,
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }"
    />

    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>

    <div class="pointer-events-none absolute inset-0 z-[1]">
      <div class="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#f3c9b5]/45 blur-[120px]" />
      <div class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#f7e9e2]/35 blur-[130px]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,124,82,0.15),transparent_65%)]" />
    </div>

    <div class="relative z-10 mx-auto grid max-w-6xl items-center gap-10 grid-cols-1 md:grid-cols-2 px-4 py-10 sm:gap-12 sm:px-6 sm:py-12 md:gap-16 md:px-10 md:py-6">
      <div class="space-y-6 text-center md:text-left md:max-w-xl mx-auto md:mx-0">
        <div class="hero-diamond-divider">
          <img :src="assets.svgs.diamond" alt="" class="hero-diamond-image" />
        </div>
        <h2 class="section-title">OUR STORY</h2>
        <p class="section-description">
          India is not a single story - it is millions of them, simmering in bustling kitchens, whispered in ancient recipes, carried across coasts, mountains, and cities.
        </p>

        <div class="narrative-card">
          <div
            v-for="(paragraph, index) in narrativeParagraphs"
            :key="`narrative-${index}`"
            class="narrative-item"
          >
            <div class="narrative-emblem">
              <span class="narrative-emblem-dot" />
              <span class="narrative-emblem-line" />
            </div>
            <p class="narrative-text">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <div class="relative flex items-center justify-center md:justify-end">
        <div class="absolute -top-10 -right-6 hidden h-32 w-32 rounded-full bg-[#c87c52]/40 blur-[90px] sm:block" />
        <div class="relative w-full max-w-[520px] md:max-w-none md:sticky md:top-20">
          <div class="pointer-events-none absolute inset-0 -translate-y-6 scale-110 rounded-full bg-[radial-gradient(circle,rgba(200,124,82,0.35),transparent_65%)] blur-2xl" />

          <div class="relative flex items-center justify-center rounded-[32px] bg-transparent">
            <ModelViewer
              class="mx-auto md:mx-0"
              :url="chickenPaprikaModel"
              :width="modelDimensions.width"
              :height="modelDimensions.height"
              :auto-rotate="true"
              :auto-rotate-speed="0.22"
              :enable-manual-rotation="true"
              :enable-mouse-parallax="true"
              :enable-hover-rotation="true"
              :enable-manual-zoom="true"
              :default-rotation-x="-28"
              :default-rotation-y="32"
              :default-zoom="0.9"
              :min-zoom-distance="0.5"
              :max-zoom-distance="1.8"
              :ambient-intensity="0.45"
              :key-light-intensity="0.9"
              :fill-light-intensity="0.5"
              :rim-light-intensity="0.75"
              environment-preset="forest"
              :show-screenshot-button="false"
              :fade-in="true"
            />

          
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ModelViewer from './ModelViewer.vue'

const chickenPaprikaModel = '/models/chicken_paprika.glb'
const sectionBgPattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

const assets = {
  svgs: {
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href
  }
}

const isClient = typeof window !== 'undefined'
const windowWidth = ref(isClient ? window.innerWidth : 1024)

const updateWindowWidth = () => {
  if (!isClient) return
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  if (!isClient) return
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  if (!isClient) return
  window.removeEventListener('resize', updateWindowWidth)
})

const modelDimensions = computed(() => {
  if (windowWidth.value < 480) {
    return { width: 260, height: 260 }
  }

  if (windowWidth.value < 768) {
    return { width: 320, height: 320 }
  }

  if (windowWidth.value < 1024) {
    return { width: 420, height: 420 }
  }

  return { width: 500, height: 500 }
})

const narrativeParagraphs = [
  'At India Bistro UK, we gather these stories - from smoky tandoors in the North to coastal spice trails in the South - and reimagine them for today\'s table. Every dish is a piece of our homeland\'s living, breathing culinary map: soulful, unexpected, and meant to be shared. Experience authentic Indian cuisine and traditional Indian flavors crafted with love for diners across the UK.',
  'Our kitchen is where heritage meets curiosity - the warmth of your grandmother\'s curry, the crunch of a street-side chaat, the comfort of a meal that feels like home, yet surprises you every time. This is more than just dining. This is India - generous, diverse, alive - served on a plate. Discover the best Indian food in the UK with every bite.'
]
</script>

<style scoped>
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 820px;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
}

.hero-diamond-divider {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-diamond-image {
  width: 100%;
  max-width: 180px;
  height: auto;
  object-fit: contain;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 24px 45px rgba(17, 17, 17, 0.35));
}

@media (max-width: 1024px) {
  .big-bg-icon-overlay {
    max-width: 640px;
  }
}

@media (max-width: 768px) {
  .big-bg-icon-overlay {
    display: none;
  }
  .hero-diamond-divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}
  .section-description {
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.04em;
  }

  .narrative-card {
    gap: 1.25rem;
    padding: 1.5rem 1.4rem;
  }

  .narrative-item {
    gap: 1rem;
  }

  .narrative-emblem-line {
    height: 3.5rem;
  }

  .narrative-text {
    font-size: 17px;
    line-height: 28px;
  }
}

@media (max-width: 480px) {
  .section-description {
    font-size: 15px;
    line-height: 26px;
  }

  .narrative-card {
    padding: 1.2rem 1.1rem;
  }

  .narrative-text {
    font-size: 16px;
    line-height: 26px;
  }
}

.section-tag {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.55);
}

.section-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  line-height: 1.1;
}

.section-description {
  max-width: 36rem;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.06em;
  color: rgba(17, 17, 17, 0.82);
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .section-description {
    margin: 0;
  }
}

.section-description.secondary {
  max-width: 34rem;
  font-size: 17px;
  line-height: 30px;
  letter-spacing: 0.05em;
  color: rgba(17, 17, 17, 0.78);
}

.narrative-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 1.85rem 2.2rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: linear-gradient(135deg, rgba(247, 233, 226, 0.55), rgba(255, 255, 255, 0.6));
  box-shadow: 0 18px 45px -30px rgba(17, 17, 17, 0.45);
  text-align: left;
}

.narrative-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.narrative-emblem {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.narrative-emblem-dot {
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 9999px;
  background: #c87c52;
}

.narrative-emblem-line {
  display: inline-block;
  width: 2px;
  height: 4.5rem;
  background: linear-gradient(180deg, #c87c52, rgba(200, 124, 82, 0));
}

.narrative-item:last-child .narrative-emblem-line {
  height: 46px;
  background: linear-gradient(180deg, rgba(200, 124, 82, 0.55), rgba(200, 124, 82, 0));
}

.narrative-text {
  font-family: 'Playfair Display', ui-serif, Georgia, 'Times New Roman', serif;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.04em;
  color: #231f1f;
}

.note-tag {
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.45);
}

.note-title {
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 15px;
  color: #111111;
  letter-spacing: 0.08em;
}

.note-description {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(17, 17, 17, 0.55);
}
</style>
