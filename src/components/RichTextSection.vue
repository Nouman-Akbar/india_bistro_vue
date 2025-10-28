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
  decorationColor: '#c85a3a'
})
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] py-16 md:py-24`"
    :style="{ 
      backgroundImage: `url(${props.sectionBgSrc})`,
      backgroundColor: props.bgColor
    }"
  >
    <div class="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center md:px-10">
      <!-- Decoration Image (Diamond Pattern) -->
      <div v-if="props.decorationImageSrc" class="flex items-center justify-center">
        <img 
          :src="props.decorationImageSrc" 
          alt="Decoration" 
          class="h-6 w-auto opacity-90"
          :style="{ filter: `brightness(0) saturate(100%) invert(38%) sepia(47%) saturate(1234%) hue-rotate(337deg) brightness(92%) contrast(87%)` }"
        />
      </div>

      <!-- Diamond SVG Pattern (Fallback) -->
      <div v-else class="flex items-center justify-center gap-1">
        <svg 
          v-for="i in 7" 
          :key="i" 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          :fill="props.decorationColor"
          class="opacity-90"
        >
          <rect x="6" y="0" width="8" height="8" transform="rotate(45 6 6)" />
        </svg>
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
