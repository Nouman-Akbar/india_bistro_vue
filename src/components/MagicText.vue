<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
let trigger: ScrollTrigger | null = null

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

  gsap.registerPlugin(ScrollTrigger)

  trigger = ScrollTrigger.create({
    trigger: containerRef.value,
    scroller: '#main',
    start: 'top 90%',
    end: 'top 60%',
    scrub: true,
    onUpdate: (self) => {
      setProgress(self.progress)
    }
  })

  trigger.refresh()
  setProgress(trigger.progress ?? 0)
})

watch(words, () => {
  nextTick(() => {
    trigger?.refresh()
    setProgress(trigger?.progress ?? scrollProgress.value)
  })
})

watch(
  () => [props.segmentIndex, props.segmentCount],
  () => {
    nextTick(() => {
      trigger?.refresh()
      setProgress(trigger?.progress ?? scrollProgress.value)
    })
  }
)

onBeforeUnmount(() => {
  trigger?.kill()
  trigger = null
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
  return clamp(ratio, 0, 1)
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
  transition: opacity 0.35s ease-out;
}
</style>
