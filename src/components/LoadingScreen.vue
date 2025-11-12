<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { gsap } from '@/utils/gsap'

const isLoading = ref(true)

// Pre-compute URLs to avoid import.meta issues in template
const sectionBgPatternUrl = computed(() =>
  new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
)

const bigBgIconUrl = computed(() =>
  new URL('../assets/images/Big BG Icon.svg', import.meta.url).href
)

const breakTheText = () => {
  const h1 = document.querySelector('.loading h1')
  if (!h1) return

  const h1Text = h1.textContent
  if (!h1Text) return

  const splittedText = h1Text.split("")
  let clutter = ""

  splittedText.forEach(function (elem, idx) {
    const klass = idx % 2 === 0 ? "even" : "odd"
    const content = elem === " " ? "&nbsp;" : elem
    // Add inline styles directly to ensure they work - longer duration for slower animation
    const initialY = idx % 2 === 0 ? -200 : 200
    clutter += `<span class="${klass}" style="display: inline-block; opacity: 0; transform: translateY(${initialY}px); transition: all 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);">${content}</span>`
  })

  h1.innerHTML = clutter

  console.log('Text broken, starting animation...')

  // Start animation immediately
  animateCharacters()
}

const animateCharacters = () => {
  const allSpans = document.querySelectorAll('.loading h1 span')

  console.log('Found spans to animate:', allSpans.length)

  allSpans.forEach((span, index) => {
    const isEven = index % 2 === 0
    const delay = isEven ? 100 : 200 // Faster start times

    setTimeout(() => {
      console.log(`Animating span ${index}:`, span.textContent, 'from', isEven ? 'top' : 'bottom')
      span.style.opacity = '1'
      span.style.transform = 'translateY(0)'
    }, delay + (index * 150)) // Adjusted stagger timing
  })

  // Hide loading screen after animation completes - increased total time
  setTimeout(() => {
    console.log('Hiding loading screen...')
    gsap.to('.loading', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        isLoading.value = false
      }
    })
  }, 5000) // Increased from 3500ms to 5000ms
}

onMounted(() => {
  // Start animation immediately without delay
  breakTheText()
})

// Expose method to hide loading screen programmatically
const hideLoading = () => {
  gsap.to('.loading', {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      isLoading.value = false
    }
  })
}

defineExpose({
  hideLoading
})
</script>

<template>
  <div v-if="isLoading" class="loading fixed inset-0 z-[9999] flex items-center justify-center">
    <!-- Background with pattern similar to DoubleImageTextSection -->
    <div
      class="absolute inset-0 bg-repeat"
      :style="{
        'background-image': `url(${sectionBgPatternUrl})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center',
        'background-color': '#fafafa'
      }"
    />

    <!-- Big BG Icon overlay -->
    <div class="big-bg-icon-overlay absolute inset-0 flex items-center justify-center pointer-events-none">
      <img
        :src="bigBgIconUrl"
        alt=""
        class="big-bg-icon opacity-10"
      />
    </div>

    <!-- Loading content -->
    <main class="relative z-10">
      <h1 class="text-3xl md:text-6xl lg:text-8xl tracking-[0.1em] text-center font-britain">
        <span class="md:inline-block">INDIA</span> <span class="md:inline-block">BISTRO</span>
      </h1>
    </main>
  </div>
</template>

<style scoped>
.loading {
  min-height: 100vh;
  font-family: "F37Britain", monospace;
  background-color: #fafafa;
  color: #222;
}

.loading h1 {
  margin: 0;
  letter-spacing: 0.1em;
  overflow: hidden;
  font-size: 5rem !important;
  font-weight: 900 !important;
  font-family: "Nocturne Serif SemiBold", "Playfair Display", "F37Britain", serif, monospace !important;
}

@media (min-width: 768px) {
  .loading h1 {
    font-size: 7rem !important;
    font-weight: 900 !important;
    font-family: "Nocturne Serif SemiBold", "Playfair Display", "F37Britain", serif, monospace !important;
  }
}

/* Minimal span styles - all animation handled by inline styles */
.loading h1 span {
  display: inline-block;
}

/* Big BG Icon Overlay */
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  height: auto;
  z-index: 1;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Loading screen specific styles */
.loading {
  background-color: #fafafa;
}

/* Ensure text is above background */
main {
  z-index: 2;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .loading h1 {
    font-size: 2.5rem !important;
    text-align: center;
    line-height: 1.4;
  }

  .loading h1 span {
    display: block;
    text-align: center;
  }
}

@media (min-width: 769px) and (max-width: 1023px) {
  .loading h1 {
    font-size: 4rem !important;
  }
}

@media (min-width: 1024px) {
  .loading h1 {
    font-size: 6rem !important;
  }
}
</style>