<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  sectionBgSrc?: string
  heading?: string
  topDescription?: string
  bulletPoints?: string[]
  bottomDescription?: string
  dishImageSrc?: string
  imagePosition?: 'left' | 'right'
  backgroundColor?: string
  headingColor?: string
  textColor?: string
  diamondBulletSrc?: string
  spacingBottomClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  imagePosition: 'right',
  backgroundColor: '#f4efe3',
  headingColor: '#2D2A26',
  textColor: '#5A5550',
  diamondBulletSrc: new URL('../assets/images/brown_7_diamonds.svg', import.meta.url).href,
  spacingBottomClasses: 'py-16'
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

const containerClasses = computed(() => {
  const baseClasses = 'flex flex-col items-center gap-8 md:gap-12'
  if (props.imagePosition === 'left') {
    return `${baseClasses} md:flex-row-reverse`
  }
  return `${baseClasses} md:flex-row`
})
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] ${props.spacingBottomClasses} overflow-hidden`"
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
    <div class="relative mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-12 px-6 md:px-10">
      <!-- Heading Section -->
      <div v-if="props.heading" class="w-full">
        <h2
          class="text-2xl font-normal uppercase tracking-[0.2em] md:text-3xl lg:text-4xl"
          :style="{ color: props.headingColor }"
        >
          {{ props.heading }}
        </h2>
      </div>

      <!-- Content and Image Container -->
      <div :class="containerClasses">
        <!-- Content Section (always first on mobile) -->
        <div class="w-full md:w-1/2 flex flex-col gap-6">
          <!-- Top Description -->
          <p 
            v-if="props.topDescription" 
            class="text-base leading-relaxed md:text-xl"
            :style="{ color: props.textColor }"
          >
            {{ props.topDescription }}
          </p>

          <!-- Bullet Points with Diamond Decoration -->
          <ul v-if="props.bulletPoints && props.bulletPoints.length > 0" class="flex flex-col gap-4">
            <li 
              v-for="(point, index) in props.bulletPoints" 
              :key="index"
              class="flex items-center gap-4"
            >
              <!-- Diamond Bullet -->
              <div class="flex-shrink-0 w-[16px] md:w-[20px] lg:w-[24px] aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 26 26" fill="none">
                  <path d="M21.2184 16.3372C23.7337 14.2701 25.8008 13.1245 26 13C25.751 12.8506 23.7088 11.705 21.2184 9.66284C18.7778 7.6705 15.3659 4.35824 13 0C10.6341 4.35824 7.22222 7.6705 4.78161 9.66284C2.26628 11.7299 0.199234 12.8755 0 13C0.249042 13.1494 2.29119 14.295 4.78161 16.3372C7.22222 18.3295 10.6341 21.6418 13 26C15.3659 21.6418 18.7778 18.3295 21.2184 16.3372Z" fill="#F0A345"></path>
                </svg>
              </div>
              <!-- Bullet Text -->
              <span 
                class="text-base leading-relaxed md:text-lg"
                :style="{ color: props.textColor }"
              >
                {{ point }}
              </span>
            </li>
          </ul>

          <!-- Bottom Description -->
          <p 
            v-if="props.bottomDescription" 
            class="text-base leading-relaxed md:text-xl"
            :style="{ color: props.textColor }"
          >
            {{ props.bottomDescription }}
          </p>
        </div>

        <!-- Image Section (always second on mobile) -->
        <div v-if="props.dishImageSrc" class="w-full md:w-1/2">
          <div class="overflow-hidden rounded-0 shadow-[0_20px_55px_-20px_rgba(0,0,0,0.4)]">
            <img :src="props.dishImageSrc" alt="Catering experience" class="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Decoration Image (Diamond Pattern) -->
      <div v-if="props.diamondBulletSrc" class="flex items-center justify-center">
        <img 
          :src="props.diamondBulletSrc" 
          alt="Decoration" 
          class="h-6 w-auto opacity-90"
          :style="{ filter: `brightness(0) saturate(100%) invert(38%) sepia(47%) saturate(1234%) hue-rotate(337deg) brightness(92%) contrast(87%)` }"
        />
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
