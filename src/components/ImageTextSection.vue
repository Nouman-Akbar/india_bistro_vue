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
    :class="`relative w-full bg-[#f4efe3] bg-repeat bg-[length:600px] ${spacing_bottom_classes}`"
    :style="{ backgroundImage: `url(${props.sectionBgSrc})` }"
  >
    <!-- <div class="absolute inset-0 bg-[#f4efe3]/85"></div> -->

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
