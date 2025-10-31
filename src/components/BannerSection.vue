<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  imageSrc: string
  imageAlt?: string
  alignment?: 'left' | 'center' | 'right'
  height?: string
  spacingClasses?: string
  sectionBgSrc?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Banner image',
  alignment: 'left',
  height: '',
  spacingClasses: 'py-0',
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  backgroundColor: '#f4efe3'
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

const imagePositionClass = computed(() => {
  switch (props.alignment) {
    case 'center':
      return 'object-center'
    case 'right':
      return 'object-right'
    case 'left':
    default:
      return 'object-left'
  }
})
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] ${props.spacingClasses} overflow-hidden`"
    :style="{
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center',
      'background-color': props.backgroundColor
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>
    <div class="mx-auto w-full max-w-7xl overflow-hidden px-6 md:px-10">
      <img 
        :src="props.imageSrc" 
        :alt="props.imageAlt" 
        :class="`w-full ${props.height} object-cover ${imagePositionClass}`"
      />
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
