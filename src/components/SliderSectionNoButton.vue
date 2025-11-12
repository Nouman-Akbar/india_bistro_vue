<template>
  <section ref="sliderWrapper" class="relative overflow-hidden base-surface" style="z-index: 1;" :style="{
    'background-image': `url(${section_bg_pattern})`,
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'background-position': 'center'
  }">
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>

    <div class="py-16 md:py-20">
      <!-- Section Heading -->
      <div class="text-center px-8 pb-16">
        <h2 ref="headingRef"
          class="slider-heading text-xl md:text-3xl font-medium text-black uppercase tracking-[0.3em]">
          <span v-for="(word, index) in headingWords" :key="`${word}-${index}`" class="slider-heading-word">
            <span class="slider-heading-word__inner">{{ word }}</span>
          </span>
        </h2>
      </div>

      <!-- Horizontal Scroll Container -->
      <div ref="cardsWrapper" class="relative overflow-hidden px-8">
        <div
          ref="cardsContainer"
          class="flex gap-2 transition-transform duration-500 ease-out will-change-transform"
          :style="cardsContainerStyle"
        >
          <div v-for="(block, index) in sectionData.blocks" :key="index"
            class="flex-shrink-0 w-80 bg-transparent overflow-hidden">
            <div class="relative w-full aspect-square overflow-hidden">
              <img :src="block.block_image" :alt="block.block_heading" class="w-full h-full object-cover" />
            </div>
            <div class="py-6 bg-transparent">
              <h3 class="text-sm font-semibold text-black mb-3 uppercase tracking-wider leading-tight">
                {{ block.block_heading }}
              </h3>
              <p class="text-xs leading-relaxed text-black">
                {{ block.block_description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Slider Controls -->
      <div v-if="showControls" class="mt-12 flex items-center justify-center gap-6">
        <button
          type="button"
          @click="scrollToPrev"
          :disabled="!canScrollPrev"
          class="inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
          aria-label="Scroll previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <g clip-path="url(#clip0_170_2253)">
              <path
                d="M44.069 33.8803C49.2931 29.5872 53.5862 27.2078 54 26.9492C53.4828 26.6389 49.2414 24.2596 44.069 20.0182C39 15.8803 31.9138 9.00094 27 -0.0507812C22.0862 9.00094 15 15.8803 9.93103 20.0182C4.7069 24.3113 0.413793 26.6906 0 26.9492C0.517241 27.2596 4.75862 29.6389 9.93103 33.8803C15 38.0182 22.0862 44.8975 27 53.9492C31.9138 44.8975 39 38.0182 44.069 33.8803Z"
                :fill="sectionData.section_color" />
              <g clip-path="url(#clip1_170_2253)">
                <path
                  d="M25.5862 17.9986C25.5862 17.9986 25.9457 17.9986 26.1255 18.1396C26.6648 18.4685 26.8896 19.1735 26.575 19.7375C26.575 19.7845 25.8559 21.1474 24.5525 22.7923C23.6087 24.0142 22.1255 25.6121 20.2828 26.9751C22.1705 28.338 23.6087 29.9359 24.5525 31.1578C25.766 32.7087 26.4401 33.9777 26.575 34.2127C26.8896 34.7766 26.6648 35.4816 26.1255 35.8106C25.5862 36.1396 24.912 35.9046 24.5974 35.3406C24.5075 35.1996 23.9233 34.0717 22.7997 32.6147C21.721 31.2048 19.9233 29.2779 17.5862 27.962C17.2266 27.774 17.0019 27.351 17.0019 26.9281C17.0019 26.5051 17.2266 26.0821 17.5862 25.8941C19.9233 24.5782 21.721 22.6513 22.7997 21.2414C23.9682 19.7375 24.5974 18.5625 24.5974 18.5625C24.8221 18.1865 25.1817 17.9516 25.5862 17.9516L25.5862 17.9986Z"
                  fill="#F7E9E2" />
                <path
                  d="M18.1236 25.8493L35.8764 25.8493C36.5056 25.8493 37 26.3663 37 27.0243C37 27.6822 36.5056 28.1992 35.8764 28.1992L18.1236 28.1992C17.4944 28.1992 17 27.6822 17 27.0243C17 26.3663 17.4944 25.8493 18.1236 25.8493Z"
                  fill="#F7E9E2" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_170_2253">
                <rect width="54" height="54" fill="white" />
              </clipPath>
              <clipPath id="clip1_170_2253">
                <rect width="20" height="18" fill="white" transform="translate(37 36) rotate(-180)" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          type="button"
          @click="scrollToNext"
          :disabled="!canScrollNext"
          class="inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
          aria-label="Scroll next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <g clip-path="url(#clip0_170_2243)">
              <path
                d="M44.069 33.8803C49.2931 29.5872 53.5862 27.2078 54 26.9492C53.4828 26.6389 49.2414 24.2596 44.069 20.0182C39 15.8803 31.9138 9.00094 27 -0.0507812C22.0862 9.00094 15 15.8803 9.93103 20.0182C4.7069 24.3113 0.413793 26.6906 0 26.9492C0.517241 27.2596 4.75862 29.6389 9.93103 33.8803C15 38.0182 22.0862 44.8975 27 53.9492C31.9138 44.8975 39 38.0182 44.069 33.8803Z"
                :fill="sectionData.section_color" />
              <g clip-path="url(#clip1_170_2243)">
                <path
                  d="M28.4138 36.0014C28.4138 36.0014 28.0543 36.0014 27.8745 35.8604C27.3352 35.5315 27.1104 34.8265 27.425 34.2625C27.425 34.2155 28.1441 32.8526 29.4475 31.2077C30.3913 29.9858 31.8745 28.3879 33.7172 27.0249C31.8295 25.662 30.3913 24.0641 29.4475 22.8422C28.234 21.2913 27.5599 20.0223 27.425 19.7873C27.1104 19.2234 27.3352 18.5184 27.8745 18.1894C28.4138 17.8604 29.088 18.0954 29.4026 18.6594C29.4925 18.8004 30.0767 19.9283 31.2003 21.3853C32.279 22.7952 34.0767 24.7221 36.4138 26.038C36.7734 26.226 36.9981 26.649 36.9981 27.0719C36.9981 27.4949 36.7734 27.9179 36.4138 28.1059C34.0767 29.4218 32.279 31.3487 31.2003 32.7586C30.0318 34.2625 29.4026 35.4375 29.4026 35.4375C29.1779 35.8134 28.8183 36.0484 28.4138 36.0484V36.0014Z"
                  fill="#F7E9E2" />
                <path
                  d="M35.8764 28.1507H18.1236C17.4944 28.1507 17 27.6337 17 26.9757C17 26.3178 17.4944 25.8008 18.1236 25.8008H35.8764C36.5056 25.8008 37 26.3178 37 26.9757C37 27.6337 36.5056 28.1507 35.8764 28.1507Z"
                  fill="#F7E9E2" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_170_2243">
                <rect width="54" height="54" fill="white" />
              </clipPath>
              <clipPath id="clip1_170_2243">
                <rect width="20" height="18" fill="white" transform="translate(17 18)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <!-- Social Text After Arrows -->
      <div class="mt-8 px-8">
        <div class="flex justify-center">
          <div class="social-text">
            <p class="text-line">We love seeing your India Bistro moments.</p>
            <p class="text-line">Tag us @IndiaBistro and share your table with us!</p>
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
.py-16 {
  position: relative;
  z-index: 3;
}

/* Social Text Styles */
.social-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 600px;
}

.text-line {
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  line-height: 31px;
  letter-spacing: 1px;
  text-align: center;
  color: #000000;
  margin: 0;
}


.slider-action-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.1rem 3.4rem;
  border: none;
  background: none;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  overflow: hidden;
  transition: all 0.3s ease;
}

.slider-action-button__diamond+span {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-action-button__diamond svg {
  width: 100%;
  height: 100%;
}

.slider-action-button__diamond path {
  fill: var(--button-color, #a7713a);
  transition: fill 0.3s ease;
}

.slider-action-button:hover .slider-action-button__diamond path {
  fill: #5c823d;
}

.slider-action-button__label {
  position: relative;
  z-index: 1;
}

.slider-action-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 4px;
}
</style>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useGsap } from '@/utils/gsap'

const { gsap, ScrollTrigger } = useGsap()
const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

interface SliderBlock {
  block_image: string
  block_heading: string
  block_description: string
}

interface SliderSectionData {
  name: string
  heading: string
  section_color: string
  show_arrows: boolean
  button?: {
    text: string
    action?: string
  }
  blocks: SliderBlock[]
}

const props = defineProps<{
  sectionData: SliderSectionData
}>()

const headingRef = ref<HTMLElement | null>(null)
const sliderWrapper = ref<HTMLElement | null>(null)
const cardsWrapper = ref<HTMLElement | null>(null)
const cardsContainer = ref<HTMLElement | null>(null)

const state = reactive({
  totalWidth: 0,
  viewportWidth: 0,
  currentOffset: 0,
  maxOffset: 0,
  isManualScroll: false
})

const cardsContainerStyle = computed(() => ({
  transform: `translateX(-${state.currentOffset}px)`
}))

const canScrollPrev = computed(() => state.currentOffset > 0)
const canScrollNext = computed(() => state.currentOffset < state.maxOffset)
const showControls = computed(() => {
  // Show controls if section has show_arrows = true OR if there are enough blocks to scroll
  return props.sectionData.show_arrows || (props.sectionData.blocks && props.sectionData.blocks.length > 3)
})

const updateMeasurements = () => {
  if (!cardsWrapper.value || !cardsContainer.value) return

  const wrapperWidth = cardsWrapper.value.clientWidth
  const cards = Array.from(cardsContainer.value.children) as HTMLElement[]

  let totalWidth = 0
  cards.forEach((card) => {
    totalWidth += card.offsetWidth
    const computedStyle = window.getComputedStyle(card)
    totalWidth += parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight)
  })

  state.totalWidth = totalWidth
  state.viewportWidth = wrapperWidth
  state.maxOffset = Math.max(totalWidth - wrapperWidth, 0)
  state.currentOffset = Math.min(state.currentOffset, state.maxOffset)
}

const scrollToPrev = () => {
  if (!canScrollPrev.value) return
  if (!cardsWrapper.value) return

  const step = cardsWrapper.value.clientWidth * 0.8
  const newOffset = Math.max(state.currentOffset - step, 0)

  // Set manual scroll flag to prevent ScrollTrigger interference
  state.isManualScroll = true

  // Disable ScrollTrigger temporarily instead of killing it
  if (scrollTriggerInstance) {
    scrollTriggerInstance.disable()
  }

  // Update state immediately
  state.currentOffset = newOffset

  // Animate to new position
  gsap.to(cardsContainer.value, {
    x: -newOffset,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      // Re-enable ScrollTrigger and sync progress
      if (scrollTriggerInstance) {
        // Calculate and set the correct progress
        const newProgress = newOffset / state.maxOffset
        scrollTriggerInstance.progress = newProgress
        scrollTriggerInstance.enable()

        // Force update to ensure sync
        ScrollTrigger.refresh()
      }

      // Reset manual flag after a short delay
      setTimeout(() => {
        state.isManualScroll = false
      }, 200)
    }
  })
}

const scrollToNext = () => {
  if (!canScrollNext.value) return
  if (!cardsWrapper.value) return

  const step = cardsWrapper.value.clientWidth * 0.8
  const newOffset = Math.min(state.currentOffset + step, state.maxOffset)

  // Set manual scroll flag to prevent ScrollTrigger interference
  state.isManualScroll = true

  // Disable ScrollTrigger temporarily instead of killing it
  if (scrollTriggerInstance) {
    scrollTriggerInstance.disable()
  }

  // Update state immediately
  state.currentOffset = newOffset

  // Animate to new position
  gsap.to(cardsContainer.value, {
    x: -newOffset,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      // Re-enable ScrollTrigger and sync progress
      if (scrollTriggerInstance) {
        // Calculate and set the correct progress
        const newProgress = newOffset / state.maxOffset
        scrollTriggerInstance.progress = newProgress
        scrollTriggerInstance.enable()

        // Force update to ensure sync
        ScrollTrigger.refresh()
      }

      // Reset manual flag after a short delay
      setTimeout(() => {
        state.isManualScroll = false
      }, 200)
    }
  })
}

const headingWords = computed(() =>
  props.sectionData.heading.split(/\s+/).filter((word) => word.length > 0)
)

let scrollTriggerInstance: ScrollTrigger | null = null
let headingTimeline: gsap.core.Timeline | null = null
let horizontalTween: gsap.core.Tween | null = null

onMounted(() => {
  if (!sliderWrapper.value || !cardsContainer.value || !cardsWrapper.value) return

  if (headingRef.value) {
    const wordSpans = Array.from(
      headingRef.value.querySelectorAll<HTMLElement>('.slider-heading-word__inner')
    )

    if (wordSpans.length) {
      headingTimeline = gsap
        .timeline({
          defaults: { ease: 'circ.out' },
          scrollTrigger: {
            trigger: headingRef.value,
            scroller: '#main',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
        .from(wordSpans, {
          autoAlpha: 0,
          yPercent: 120,
          duration: 0.65,
          stagger: 0.12
        })
    }
  }

  // Wait for next tick to ensure DOM is fully rendered
  setTimeout(() => {
    if (!cardsContainer.value || !cardsWrapper.value || !sliderWrapper.value) return

    updateMeasurements()

    // Create the original horizontal scroll animation
    if (state.maxOffset > 0) {
      horizontalTween = gsap.to(cardsContainer.value, {
        x: () => -state.maxOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: sliderWrapper.value,
          scroller: '#main',
          start: 'top center',
          end: () => `+=${state.maxOffset}`,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            // Only update if not in manual scroll mode
            if (!state.isManualScroll) {
              state.currentOffset = Math.round(self.progress * state.maxOffset)
            }
          }
        }
      })

      scrollTriggerInstance = horizontalTween.scrollTrigger as ScrollTrigger
    }
  }, 300)

  window.addEventListener('resize', updateMeasurements)
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }

  if (headingTimeline) {
    headingTimeline.kill()
    headingTimeline = null
  }

  if (horizontalTween) {
    horizontalTween.kill()
    horizontalTween = null
  }

  window.removeEventListener('resize', updateMeasurements)
})

</script>

<style scoped>
.slider-heading {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45em;
  perspective: 800px;
}

.slider-heading-word {
  display: inline-flex;
  overflow: hidden;
}

.slider-heading-word__inner {
  display: inline-block;
  transform-origin: bottom;
}
</style>
