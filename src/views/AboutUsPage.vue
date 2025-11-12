<script setup lang="ts">
import { createLazyComponent } from '@/utils/lazyComponent'

const StorySection = createLazyComponent(() => import('../components/StorySection.vue'))
const About3DShowcase = createLazyComponent(() => import('../components/About3DShowcase.vue'))

const assets = {
  svgs: {
    brownBorder: new URL('../assets/images/brown_story_section.svg', import.meta.url).href
  }
}

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

const storyCopy =
  "Our chefs are explorers collectors of recipes, stories, and old secrets passed down through generations. From the sizzle of the Show Kitchen to the last spoonful of dessert, we invite you to taste India as we see it: bold, honest, and endlessly rich in flavour. Join us for an unforgettable Indian dining experience in the UK where tradition and creativity meet."
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <About3DShowcase />

    <!-- Introduction Story Section -->
    <StorySection
      class="section"
      heading="A Living Culinary Canvas"
      :text="storyCopy"
      background-color="#8D3A30"
      heading-color="#F7E9E2"
      text-color="#F7E9E2"
      :border-image-src="assets.svgs.brownBorder"
      :show-top-border="true"
      :show-bottom-border="true"
    />

    <!-- Simple Content Section -->
    <section
      class="relative w-full overflow-hidden py-20 px-6 md:px-10"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': '600px',
        'background-position': 'center',
        'background-attachment': 'fixed',
        'will-change': 'transform',
        'transform': 'translateZ(0)'
      }"
    >
      <!-- Optimized Big BG Icon overlay -->
      <div class="big-bg-icon-overlay" style="will-change: transform; transform: translateZ(0);">
        <img
          :src="bigBgIcon"
          alt=""
          class="big-bg-icon"
          loading="lazy"
          style="will-change: transform; transform: translateZ(0);"
        />
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="hero-title text-4xl font-serif mb-8 text-[#000000]">Welcome to India Bistro</h2>
        <p class="text-lg text-[#000000] leading-relaxed mb-12">
          Experience the authentic flavors of India with our carefully crafted dishes that bring together
          traditional recipes and modern culinary excellence. Every meal is a celebration of India's rich
          culinary heritage.
        </p>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-accent mx-auto mb-4 text-3xl text-background">
              1
            </div>
            <h3 class="text-xl font-serif font-semibold mb-3 text-[#000000]">Authentic Recipes</h3>
            <p class="text-[#000000]">Traditional dishes passed down through generations.</p>
          </div>

          <div class="text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-accent mx-auto mb-4 text-3xl text-background">
              2
            </div>
            <h3 class="text-xl font-serif font-semibold mb-3 text-[#000000]">Quality Ingredients</h3>
            <p class="text-[#000000]">Only the finest spices and fresh ingredients.</p>
          </div>

          <div class="text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-accent mx-auto mb-4 text-3xl text-background">
              3
            </div>
            <h3 class="text-xl font-serif font-semibold mb-3 text-[#000000]">Warm Hospitality</h3>
            <p class="text-[#000000]">Experience the heart of Indian hospitality with every visit.</p>
          </div>
        </div>
      </div>
    </section>

   
  </div>
</template>

<style scoped>
.about-page {
  width: 100%;
  background-color: #111111;
  will-change: transform;
  transform: translateZ(0);
}

.section {
  position: relative;
  z-index: 1;
  will-change: transform;
  transform: translateZ(0);
}

/* Optimized Big BG Icon Overlay */
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  max-width: 800px;
  height: auto;
  z-index: 2;
  pointer-events: none;
  backface-visibility: hidden;
  perspective: 1000px;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Ensure content is above the background overlay */
.relative {
  position: relative;
  z-index: 3;
}

/* Hero heading typography */
.hero-heading {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wide);
  font-family: "PPMori", sans-serif;
  line-height: var(--line-height-tight);
}

/* Hero title styles */
.hero-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
