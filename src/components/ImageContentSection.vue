<script setup lang="ts">
interface Button {
  text: string
  link?: string
  backgroundImageSrc?: string
}

interface Props {
  imageSrc?: string
  imagePosition?: 'left' | 'right'
  decoratorImageSrc?: string
  heading?: string
  subheading?: string
  backgroundColor?: string
  headingColor?: string
  subheadingColor?: string
  buttons?: Button[]
}

const props = withDefaults(defineProps<Props>(), {
  imageSrc: '',
  imagePosition: 'left',
  decoratorImageSrc: '',
  heading: 'a',
  subheading: '',
  backgroundColor: '#F5F1E8',
  headingColor: '#2D2A26',
  subheadingColor: '#5A5550',
  buttons: () => []
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url)
</script>

<template>
  <section
    class="relative w-full bg-repeat bg-[length:600px] py-20 overflow-hidden"
    :style="{
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center',
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>
    <div class="relative mx-auto flex w-full max-w-7xl flex-col gap-0 px-6 md:px-10">
      <div
        class="flex flex-col gap-10 md:gap-16"
        :class="[
          props.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
        ]"
      >
        <!-- Image Section -->
        <div v-if="props.imageSrc" class="w-full md:w-1/2 flex items-center justify-center">
          <img
            :src="props.imageSrc"
            alt="Section visual"
            class="w-full h-auto object-contain max-w-md"
          />
        </div>

        <!-- Content Section -->
        <div class="w-full md:w-1/2 flex flex-col md:items-start items-center justify-center md:text-left text-center gap-8">
          <!-- Decorator Image -->
          <div v-if="props.decoratorImageSrc" class="flex justify-center">
            <img :src="props.decoratorImageSrc" alt="Decorator" class="h-6" />
          </div>

          <!-- Heading -->
          <h2
            v-if="props.heading"
            class="text-2xl md:text-4xl font-semibold uppercase tracking-wider leading-tight"
            :style="{ color: props.headingColor }"
          >
            {{ props.heading }}
          </h2>

          <!-- Subheading -->
          <p
            v-if="props.subheading"
            class="text-base md:text-lg leading-relaxed max-w-md"
            :style="{ color: props.subheadingColor }"
          >
            {{ props.subheading }}
          </p>

          <!-- Buttons -->
          <div v-if="props.buttons && props.buttons.length > 0" class="flex flex-col gap-4 w-auto max-w-full">
            <a
              v-for="(button, index) in props.buttons"
              :key="index"
              :href="button.link || '#'"
              class="relative inline-flex items-start justify-center flex-1 px-8 py-3 text-white font-semibold text-sm uppercase tracking-wider transition-transform duration-300 hover:scale-105 overflow-hidden"
            >
              <!-- Button Background Image -->
              <span
                v-if="button.backgroundImageSrc"
                :data-background-image-src= "`url(${button.backgroundImageSrc})`"
                class="absolute inset-0 w-full h-full"
              >
              <img :src="button.backgroundImageSrc" :alt="button.text || 'Button Background'" class="w-full h-full object-contain"></span>
              <!-- Button Text -->
              <span class="relative z-10">{{ button.text }}</span>
            </a>
          </div>

          <!-- Decorator Image Bottom -->
          <div v-if="props.decoratorImageSrc" class="flex justify-center">
            <img :src="props.decoratorImageSrc" alt="Decorator" class="h-6" />
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
