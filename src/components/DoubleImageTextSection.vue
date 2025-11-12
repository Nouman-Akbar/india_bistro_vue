<script setup lang="ts">
import { computed } from 'vue'

interface SectionProps {
  dishImageSrc: string
  heading?: string
  description: string | string[]
  imagePosition: 'left' | 'right'
  diamondImageSrc?: string
}

interface Props {
  sectionOne: SectionProps
  sectionTwo: SectionProps
  spacingBottomClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  spacingBottomClasses: 'py-20'
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

const normalizeParagraphs = (desc: string | string[]) => {
  return Array.isArray(desc) ? desc : [desc]
}

const sectionOneParagraphs = computed(() => normalizeParagraphs(props.sectionOne.description))
const sectionTwoParagraphs = computed(() => normalizeParagraphs(props.sectionTwo.description))

// Grid placement to mirror the exact layout
const s1TextGrid = computed(() => {
  return props.sectionOne.imagePosition === 'left'
    ? 'md:col-span-6 md:col-start-7'
    : 'md:col-span-6 md:col-start-1'
})

const s1ImageGrid = computed(() => {
  return props.sectionOne.imagePosition === 'left'
    ? 'md:col-span-6 md:col-start-1'
    : 'md:col-span-6 md:col-start-7'
})

const s2TextGrid = computed(() => {
  return props.sectionTwo.imagePosition === 'left'
    ? 'md:col-span-8 md:col-start-5'
    : 'md:col-span-6 md:col-start-1'
})

const s2ImageGrid = computed(() => {
  return props.sectionTwo.imagePosition === 'left'
    ? 'md:col-span-4 md:col-start-1'
    : 'md:col-span-4 md:col-start-9'
})

// Controlled overlap for the second row (only on md+)
const overlapImageClass = 'md:-mt-28'
const overlapTextClass = 'md:-mt-16 md:self-start'
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] overflow-hidden ${spacingBottomClasses}`"
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

    <div class="relative mx-auto w-full max-w-7xl px-6 md:px-10">
      <div class="grid gap-10 md:gap-14 pt-16 md:grid-cols-12">
        <!-- Heading (top-left) -->
        <div v-if="sectionOne.heading" class="md:col-span-9 md:mb-6">
          <h2 class="text-2xl font-semibold uppercase tracking-[0.35em] text-[#000000] md:text-3xl md:text-left">
            {{ sectionOne.heading }}
          </h2>
        </div>

        <!-- First Row: Text + Big Image aligned to 6/6 cols -->
        <div class="md:row-start-2 md:row-end-2" :class="s1TextGrid">
          <div class="ib-body-text text-[#000000] space-y-4">
            <p
              v-for="(paragraph, idx) in sectionOneParagraphs"
              :key="`s1-${idx}`"
              class="mb-4 last:mb-0 whitespace-pre-line"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div class="md:row-start-2 md:row-end-2" :class="s1ImageGrid">
          <div class="overflow-hidden rounded-0 shadow-[0_20px_55px_-20px_rgba(0,0,0,0.4)]">
            <img :src="sectionOne.dishImageSrc" alt="Section image" class="h-[45rem] w-full object-cover" />
          </div>
        </div>

        <!-- Second Row: Small Image left (4 cols) + Text right (6 cols) -->
        <div class="md:row-start-3 md:row-end-3" :class="[s2ImageGrid, overlapImageClass]">
          <div class="overflow-hidden rounded-0 shadow-[0_20px_55px_-20px_rgba(0,0,0,0.4)]">
            <img :src="sectionTwo.dishImageSrc" alt="Section image" class="h-full w-full object-cover" />
          </div>
        </div>
        <div class="md:row-start-3 md:row-end-3" :class="[s2TextGrid, overlapTextClass, 'md:self-end']">
          <div class="ib-body-text text-[#000000] space-y-4">
            <p
              v-for="(paragraph, idx) in sectionTwoParagraphs"
              :key="`s2-${idx}`"
              class="mb-4 last:mb-0 whitespace-pre-line"
            >
              {{ paragraph }}
            </p>
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

/* Paragraph typography requested */
.ib-body-text p {
  font-weight: 400 !important;
  font-style: normal !important;
  font-size: 18px !important;
  line-height: 31px !important;
  letter-spacing: 1px !important;
  vertical-align: middle !important;
  text-align: center !important;
  text-justify: inter-word !important;
}
</style>


