<script setup lang="ts">
interface Button {
  text: string
  link: string
  backgroundImageSrc?: string
}

interface Props {
  heading: string
  description: string
  decorationImageSrc?: string
  sectionBgSrc?: string
  bgColor?: string
  headingColor?: string
  descriptionColor?: string
  decorationColor?: string
  button?: Button
}

const props = withDefaults(defineProps<Props>(), {
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  bgColor: '#f4efe3',
  headingColor: '#000000',
  descriptionColor: '#000000',
  decorationColor: '#c85a3a',
  decorationImageSrc: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href
</script>

<template>
  <section
    class="relative w-full bg-repeat bg-[length:600px] py-16 md:py-24 overflow-hidden"
    :style="{
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center',
      'background-color': props.bgColor
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>
    <div class="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center md:px-10">
      <!-- Decoration Image (Always Visible) -->
      <div class="flex items-center justify-center">
        <img 
          :src="props.decorationImageSrc" 
          alt="Decoration" 
          class="h-6 w-auto opacity-90"
          :style="{ filter: `brightness(0) saturate(100%) invert(38%) sepia(47%) saturate(1234%) hue-rotate(337deg) brightness(92%) contrast(87%)` }"
        />
      </div>

      <!-- Heading -->
      <h2 
        class="max-w-3xl text-2xl font-normal uppercase tracking-[0.25em] md:text-3xl lg:text-4xl"
        :style="{ color: props.headingColor }"
      >
        {{ props.heading }}
      </h2>

      <!-- Description -->
      <p 
        class="max-w-2xl text-sm leading-relaxed tracking-wide md:text-base lg:text-lg"
        :style="{ color: props.descriptionColor }"
      >
        {{ props.description }}
      </p>

      <!-- Button -->
      <div v-if="props.button" class="mt-4">
        <a
          :href="props.button.link"
          class="tab-button relative inline-block transition-all duration-300 hover:scale-105"
        >
          <span class="tab-bg absolute inset-0">
            <img 
              :src="props.button.backgroundImageSrc" 
              alt="Button Decoration" 
              class="h-full w-full"
            />
          </span>
          <span class="tab-text relative z-10 block px-8 py-3 text-sm  md:text-base lg:text-xl  font-medium uppercase tracking-wider text-white md:px-10 md:py-4">
            {{ props.button.text }}
          </span>
        </a>
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
