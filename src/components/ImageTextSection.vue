<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  sectionBgSrc: string
  dishImageSrc: string
  heading: string
  description: string | string[]
  imagePosition: 'left' | 'right'
  spacing_bottom_classes: string
  diamondImageSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  imagePosition: 'left',
  spacing_bottom_classes: 'py-20',
  diamondImageSrc: ''
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href

const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

// Compute flex direction based on image position
// Mobile: always flex-col (content first, image second)
// Desktop: flex-row if image is right, flex-row-reverse if image is left
const containerClasses = computed(() => {
  return props.imagePosition === 'left'
    ? 'flex flex-col gap-10 md:flex-row-reverse md:items-center'
    : 'flex flex-col gap-10 md:flex-row md:items-center'
})

// Compute description paragraphs
const descriptionParagraphs = computed(() => {
  if (Array.isArray(props.description)) {
    return props.description
  }
  return [props.description]
})
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] overflow-hidden ${spacing_bottom_classes}`"
    :style="{
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>

    <div class="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:px-10">
      <!-- Heading Section -->
      <div v-if="props.heading" class="w-full">
        <h2
          class="text-center text-2xl font-semibold uppercase tracking-[0.35em] text-[#000000] md:text-left md:text-3xl"
        >
          {{ props.heading }}
        </h2>
      </div>

      <!-- Content and Image Container -->
      <div :class="containerClasses">
        <!-- Content Section (always first on mobile) -->
        <div v-if="props.description" class="w-full md:w-1/2 flex flex-col gap-6">
          <!-- Optional Diamond Image -->
          <!-- <div v-if="props.diamondImageSrc" class="flex md:items-center items-center justify-center text-center">
            <img :src="props.diamondImageSrc" alt="Diamond" class="h-20" />
          </div> -->
          
          <!-- Description Text -->
          <div v-if="props.description" class="text-base leading-relaxed text-[#000000] md:text-xl space-y-4">
            <p v-for="(paragraph, index) in descriptionParagraphs" :key="index" class="mb-4 last:mb-0">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Image Section (always second on mobile) -->
        <div v-if="props.dishImageSrc" :class="props.description ? 'w-full md:w-1/2' : 'w-full'">
          <div class="overflow-hidden rounded-0 shadow-[0_20px_55px_-20px_rgba(0,0,0,0.4)]">
            <img :src="props.dishImageSrc" alt="Traditional Indian dish" class="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>
