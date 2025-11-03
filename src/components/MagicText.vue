<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Props {
  text: string
  segmentIndex?: number
  segmentCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  segmentIndex: 0,
  segmentCount: 1
})

const containerRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const words = computed(() => {
  return props.text.trim().split(/\s+/).filter(Boolean)
})

const clamp = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) {
    return min
  }
  return Math.min(Math.max(value, min), max)
}

const setProgress = (value: number) => {
  scrollProgress.value = clamp(value, 0, 1)
}

const progress = computed(() => scrollProgress.value)

const segmentStart = computed(() => {
  const count = Math.max(props.segmentCount, 1)
  return clamp(props.segmentIndex / count, 0, 1)
})

const segmentEnd = computed(() => {
  const count = Math.max(props.segmentCount, 1)
  return clamp((props.segmentIndex + 1) / count, 0, 1)
})

const segmentProgress = computed(() => {
  const start = segmentStart.value
  const end = segmentEnd.value

  if (end <= start) {
    return progress.value >= end ? 1 : 0
  }

  const ratio = (progress.value - start) / (end - start)
  return clamp(ratio, 0, 1)
})

onMounted(async () => {
  if (typeof window === 'undefined') {
    return
  }

  await nextTick()

  if (!containerRef.value) {
    return
  }

  // Simple approach: use regular scroll events instead of Locomotive
  const updateAnimation = () => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const elementTop = rect.top

    let progress = 0

    // When scrolling DOWN:
    // - Element starts below viewport (elementTop > viewportHeight) -> progress = 0
    // - Element enters viewport -> progress increases from 0 to 1
    // - Element reaches top (elementTop <= 0) -> progress = 1

    if (elementTop >= viewportHeight) {
      // Element below viewport
      progress = 0
    } else if (elementTop <= 0) {
      // Element at or above top of viewport
      progress = 1
    } else {
      // Element is entering viewport from bottom
      // elementTop goes from viewportHeight to 0 as we scroll DOWN
      progress = 1 - (elementTop / viewportHeight)
    }

    setProgress(progress)
  }

  // Initial update
  updateAnimation()

  // Listen to scroll events
  const throttledUpdate = () => {
    requestAnimationFrame(updateAnimation)
  }

  window.addEventListener('scroll', throttledUpdate, { passive: true })
  ;(containerRef.value as any)._scrollHandler = throttledUpdate
})

watch(words, () => {
  nextTick(() => {
    // Recalculate animation when words change
    if (containerRef.value && (containerRef.value as any)._scrollHandler) {
      const updateFunc = () => {
        const rect = containerRef.value?.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const elementTop = rect?.top || 0

        let progress = 0
        if (elementTop >= viewportHeight) {
          progress = 0
        } else if (elementTop <= 0) {
          progress = 1
        } else {
          progress = 1 - (elementTop / viewportHeight)
        }

        setProgress(progress)
      }
      updateFunc()
    }
  })
})

watch(
  () => [props.segmentIndex, props.segmentCount],
  () => {
    nextTick(() => {
      // Recalculate when segment props change
      if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const elementTop = rect.top

        let progress = 0
        if (elementTop >= viewportHeight) {
          progress = 0
        } else if (elementTop <= 0) {
          progress = 1
        } else {
          progress = 1 - (elementTop / viewportHeight)
        }

        setProgress(progress)
      }
    })
  }
)

onBeforeUnmount(() => {
  if (containerRef.value) {
    // Remove scroll listener
    if ((containerRef.value as any)._scrollHandler) {
      window.removeEventListener('scroll', (containerRef.value as any)._scrollHandler)
      delete (containerRef.value as any)._scrollHandler
    }
  }
})

const getWordOpacity = (index: number) => {
  const total = words.value.length
  if (total === 0) {
    return 1
  }

  const start = index / total
  const end = start + 1 / total

  if (end === start) {
    return 1
  }

  const ratio = (segmentProgress.value - start) / (end - start)

  // Apply easing for faster animation (quadratic ease-out)
  const easedRatio = ratio < 0.5
    ? 2 * ratio * ratio
    : 1 - Math.pow(-2 * ratio + 2, 2) / 2

  return clamp(easedRatio, 0, 1)
}
</script>

<template>
  <p ref="containerRef" class="magic-text relative flex flex-wrap">
    <span
      v-for="(word, index) in words"
      :key="`${word}-${index}`"
      class="magic-text-word"
    >
      <span class="magic-text-shadow" aria-hidden="true">
        {{ word }}
      </span>
      <span
        class="magic-text-foreground"
        :style="{ opacity: getWordOpacity(index) }"
      >
        {{ word }}
      </span>
    </span>
  </p>
</template>

<style scoped>
.magic-text-word {
  position: relative;
  display: inline-flex;
  margin-right: 0.25rem;
}

.magic-text-word:last-child {
  margin-right: 0;
}

.magic-text-shadow {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.2;
}

.magic-text-foreground {
  display: inline-block;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
