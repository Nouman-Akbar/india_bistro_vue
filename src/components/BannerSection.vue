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
    :class="`relative w-full bg-repeat bg-[length:600px] ${props.spacingClasses}`"
    :style="{ 
      backgroundImage: `url(${props.sectionBgSrc})`,
      backgroundColor: props.backgroundColor
    }"
  >
    <div class="mx-auto w-full max-w-7xl overflow-hidden px-6 md:px-10">
      <img 
        :src="props.imageSrc" 
        :alt="props.imageAlt" 
        :class="`w-full ${props.height} object-cover ${imagePositionClass}`"
      />
    </div>
  </section>
</template>
