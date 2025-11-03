<script setup lang="ts">
import StorySection from '../components/StorySection.vue'
import About3DShowcase from '../components/About3DShowcase.vue'

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
      class="relative w-full bg-repeat bg-[length:600px] overflow-hidden py-20 px-6 md:px-10"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Single Big BG Icon for the whole block -->
      <div class="big-bg-icon-overlay">
        <img :src="bigBgIcon" alt="" class="big-bg-icon" />
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-serif mb-8 text-[#000000]">Welcome to India Bistro</h2>
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
}

.section {
  position: relative;
  z-index: 1;
}

/* Big BG Icon Overlay */
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Ensure content is above the background overlay */
.relative {
  position: relative;
  z-index: 3;
}

/* Hero heading typography */
.hero-heading {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  font-family: "Pitch", sans-serif;
}
</style>
