<script setup lang="ts">
import TextGenerateEffect from './TextGenerateEffect.vue'
interface Props {
  heading?: string
  text?: string
  backgroundColor?: string
  headingColor?: string
  textColor?: string
  showTopBorder?: boolean
  showBottomBorder?: boolean
  borderImageSrc?: string
  diamondImageSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'A Story on Every Plate',
  text: "At India Bistro, we celebrate India's endless culinary stories. From Delhi's fiery chaats to Kerala's coastal curries, every plate is a tribute to tradition, served with a refreshing twist. Step in, sit back, and taste India  all on one table.",
  backgroundColor: '#8D3A30',
  headingColor: '#F6D7B0',
  textColor: '#FCE6D5',
  showTopBorder: true,
  showBottomBorder: true,
  borderImageSrc: new URL('../assets/images/brown_story_section.svg', import.meta.url).href
})

const sectionBgSrc = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
</script>

<template>
  <section
    class="story-section"
    :style="{
      '--bg-image': 'url(' + sectionBgSrc + ')',
      '--bg-color': props.backgroundColor,
      '--heading-color': props.headingColor,
      '--text-color': props.textColor
    }"
  >
    <!-- Top decorative border -->
    <div
      v-if="props.showTopBorder && props.borderImageSrc"
      class="chunk-row chunk-row--top"
      :style="{ backgroundImage: 'url(' + props.borderImageSrc + ')' }"
    ></div>

    <!-- Main content -->
    <div class="story-content">
      <h2 v-if="props.heading" class="story-heading">
        {{ props.heading }}
      </h2>
      <div v-if="props.diamondImageSrc" class="flex items-center justify-center text-center py-10">
        <img :src="props.diamondImageSrc" alt="Diamond" class="h-20" />
      </div>
      <div v-if="props.text" class="story-text">
        <TextGenerateEffect :words="props.text" />
      </div>
    </div>

    <!-- Decorative waves -->
    <!-- <div class="waves-container">
      <svg class="waves-svg" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 300 C150 200 350 400 600 300 C850 200 1050 400 1200 300"
          stroke="rgba(249, 155, 64, 0.24)"
          stroke-width="2"
        />
        <path
          d="M0 360 C160 260 360 460 600 360 C840 260 1040 460 1200 360"
          stroke="rgba(255, 208, 123, 0.22)"
          stroke-width="2"
        />
        <path
          d="M0 420 C180 320 380 520 600 420 C820 320 1020 520 1200 420"
          stroke="rgba(255, 239, 204, 0.2)"
          stroke-width="2"
        />
      </svg>
    </div> -->

    <!-- Bottom decorative border -->
    <div
      v-if="props.showBottomBorder && props.borderImageSrc"
      class="chunk-row chunk-row--bottom"
      :style="{ backgroundImage: 'url(' + props.borderImageSrc + ')' }"
    ></div>
  </section>
</template>

<style scoped>
.story-section {
  position: relative;
  opacity: 1;
  transform: none;
  color: white;
  text-align: center;
  padding: 4rem 0;
  margin: 0;
  overflow: hidden;
  /* Method 1: Multiple backgrounds (pattern + color) */
  background: var(--bg-color, #8D3A30);
  background-size: cover, contain;
  background-position: center, center;
  background-repeat: no-repeat, repeat;
}

/* Alternative Method 2: Using ::before for color overlay */
/* .story-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(141, 58, 48, 0.8);
  z-index: 1;
} */

/* Alternative Method 3: Using ::after for pattern */
/* .story-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--bg-image);
  background-size: contain;
  background-repeat: repeat;
  opacity: 0.3;
  z-index: 2;
} */

/* Decorative border rows */
.chunk-row {
  /* position: absolute;
  left: 0;
  right: 0;*/
  height: 60px;
  background-size: auto 100%;
  background-position: left center;
  background-repeat: repeat-x;
  pointer-events: none;
  z-index: 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* .chunk-row--top {
  top: -30px;
}

.chunk-row--bottom {
  bottom: -30px;
  transform: scaleY(-1);
} */

/* Main content */
.story-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.story-heading {
  font-size: 1.875rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: var(--heading-color, #F6D7B0);
  margin-bottom: 2rem;
  font-weight: 400;
}

.story-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--text-color, #FCE6D5);
  max-width: 600px;
  margin: 0 auto;
}

/* Decorative waves */
.waves-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: none;
  opacity: 0.6;
  z-index: 1;
}

.waves-svg {
  width: 100%;
  height: 100%;
}

/* Responsive design */
@media (max-width: 768px) {
  .story-section {
    padding: 3rem 0;
  }

  .story-heading {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .story-text {
  }

  .chunk-row {
    height: 40px;
  }
}
</style>
