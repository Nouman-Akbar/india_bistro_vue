<template>
  <section 
    ref="sliderWrapper"
    class="relative overflow-hidden min-h-screen bg-background"
    style="z-index: 1;"
    data-scroll
    data-scroll-call="disableScroll"
    :style="{ 
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <div class="py-16 md:py-20">
      <!-- Section Heading -->
      <div class="text-center px-8 pb-16">
        <h2 class="text-xl md:text-3xl font-medium text-white uppercase tracking-[0.3em]">
          {{ sectionData.heading }}
        </h2>
      </div>

      <!-- Horizontal Scroll Container -->
      <div ref="cardsWrapper" class="relative">
        <div ref="cardsContainer" class="flex gap-2 px-8">
          <div 
            v-for="(block, index) in sectionData.blocks" 
            :key="index"
            class="flex-shrink-0 w-80 bg-transparent overflow-hidden"
          >
            <div class="relative w-full aspect-square overflow-hidden">
              <img 
                :src="block.block_image" 
                :alt="block.block_heading"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="py-6 bg-transparent">
              <h3 class="text-sm font-semibold text-white mb-3 uppercase tracking-wider leading-tight">
                {{ block.block_heading }}
              </h3>
              <p class="text-xs leading-relaxed text-gray-200">
                {{ block.block_description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="flex justify-center gap-4 my-12">
        <div 
          class="w-6 h-6 rotate-45 relative"
          :style="{ 'background-color': sectionData.section_color }"
        >
          <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white -translate-x-1/2 -translate-y-1/2 -rotate-45"
               style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
          </div>
        </div>
        <div 
          class="w-6 h-6 rotate-45 relative"
          :style="{ 'background-color': sectionData.section_color }"
        >
          <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white -translate-x-1/2 -translate-y-1/2 -rotate-45"
               style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);">
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div v-if="sectionData.button" class="text-center pt-8">
        <button 
          class="px-12 py-4 text-sm font-semibold text-white uppercase tracking-widest cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md"
          :style="{ 
            'background-color': sectionData.section_color,
            'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }"
        >
          {{ sectionData.button.text }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.png', import.meta.url).href

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

const sliderWrapper = ref<HTMLElement | null>(null)
const cardsWrapper = ref<HTMLElement | null>(null)
const cardsContainer = ref<HTMLElement | null>(null)

let scrollTriggerInstance: ScrollTrigger | null = null

onMounted(() => {
  if (!sliderWrapper.value || !cardsContainer.value || !cardsWrapper.value) return

  gsap.registerPlugin(ScrollTrigger)

  // Wait for next tick to ensure DOM is fully rendered
  setTimeout(() => {
    if (!cardsContainer.value || !cardsWrapper.value || !sliderWrapper.value) return

    const cards = cardsContainer.value.children
    if (cards.length === 0) return

    // Calculate total width of all cards including padding
    let totalWidth = 0
    Array.from(cards).forEach((card) => {
      totalWidth += (card as HTMLElement).offsetWidth
    })

    // Add gap widths (gap-2 = 0.5rem = 8px) and padding (px-8 = 2rem = 32px on each side)
    const gapWidth = 8 * (cards.length - 1)
    const paddingWidth = 64 // 32px left + 32px right
    totalWidth += gapWidth + paddingWidth

    // Get viewport width
    const viewportWidth = window.innerWidth

    // Only apply horizontal scroll if content is wider than viewport
    if (totalWidth > viewportWidth) {
      const scrollDistance = totalWidth - viewportWidth

      // Create horizontal scroll animation with pinning
      const tween = gsap.to(cardsContainer.value, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sliderWrapper.value,
          scroller: '#main',
          pin: true,
          pinSpacing: 'margin', // Use margin instead of padding for Locomotive compatibility
          start: 'top 100px', // Pin below header
          end: () => `+=${scrollDistance * 2.5}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging
          onRefresh: () => {
            // Force Locomotive to update when pin changes
            const locoScroll = (window as any).locoScroll
            if (locoScroll) {
              setTimeout(() => locoScroll.update(), 100)
            }
          }
        }
      })

      scrollTriggerInstance = tween.scrollTrigger as ScrollTrigger
    }
  }, 300)
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>
