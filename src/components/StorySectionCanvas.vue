<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  heading?: string
  text?: string | string[]
  backgroundColor?: string
  headingColor?: string
  textColor?: string
  showTopBorder?: boolean
  showBottomBorder?: boolean
  borderImageSrc?: string
  decoratorImageSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'A Living Culinary Canvas',
  text: '',
  backgroundColor: '#5E6547',
  headingColor: '#F7E9E2',
  textColor: '#F7E9E2',
  showTopBorder: true,
  showBottomBorder: true,
  borderImageSrc: new URL('../assets/images/green_story_section.svg', import.meta.url).href,
  decoratorImageSrc: ''
})

const sectionBgSrc = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href

const storyParagraphs = computed(() => {
  if (!props.text) {
    return []
  }

  if (Array.isArray(props.text)) {
    return props.text.map((item) => item.trim()).filter(Boolean)
  }

  const trimmed = props.text.trim()
  if (!trimmed) {
    return []
  }

  const segments = trimmed.split(/\n{2,}/).map((segment) => segment.trim()).filter(Boolean)
  return segments.length ? segments : [trimmed]
})
</script>

<template>
  <section 
    class="story-section" 
    :style="{ 
      '--bg-image': 'url(' + sectionBgSrc + ')',
      '--bg-color': props.backgroundColor,
      '--heading-color': props.headingColor,
      '--text-color': props.textColor
    }"
  >
    <div 
      v-if="props.showTopBorder && props.borderImageSrc"
      class="chunk-row chunk-row--top" 
      :style="{ backgroundImage: 'url(' + props.borderImageSrc + ')' }"
    ></div>

    <div class="story-content">
      <h2 v-if="props.heading" class="story-heading">
        {{ props.heading }}
      </h2>

      <div v-if="props.decoratorImageSrc" class="decorator">
        <img :src="props.decoratorImageSrc" alt="Stars" class="decorator-img" />
      </div>

      <template v-if="storyParagraphs.length">
        <p
          v-for="(paragraph, idx) in storyParagraphs"
          :key="`story-paragraph-${idx}`"
          class="story-text whitespace-pre-line"
        >
          {{ paragraph }}
        </p>
      </template>
    </div>

    <div 
      v-if="props.showBottomBorder && props.borderImageSrc"
      class="chunk-row chunk-row--bottom" 
      :style="{ backgroundImage: 'url(' + props.borderImageSrc + ')' }"
    ></div>
  </section>
</template>

<style scoped>
.story-section {
  position: relative;
  color: white;
  text-align: center;
  /* Ample vertical breathing room like the design */
  padding: 6rem 0;
  overflow: hidden;
  background: var(--bg-color, #5E6547);
}

.chunk-row {
  height: 60px; 
  background-size: auto 100%;
  background-position: left center;
  background-repeat: repeat-x;
  pointer-events: none;
  z-index: 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.story-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
  /* Extra spacing between heading/stars/text */
  padding: 4rem 1.5rem 5rem;
}

.story-heading {
  /* Heading typography */
  font-family: "PPMori", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 3.2px;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: var(--heading-color, #F7E9E2);
  margin-bottom: 1.5rem;
}

.decorator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0 2rem;
}

.decorator-img {
  height: 16px;
}

.story-text {
  /* Sub content typography */
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  line-height: 31px;
  letter-spacing: 1px;
  text-align: center;
  vertical-align: middle;
  color: var(--text-color, #F7E9E2);
  max-width: 880px;
  margin: 0 auto;
  justify-content: center;
}

.story-text + .story-text {
  margin-top: 1.25rem;
}

@media (max-width: 768px) {
  .story-section {
    padding: 4rem 0;
  }

  .story-heading {
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }

  .decorator-img {
    height: 14px;
  }

  .story-text {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.8px;
  }
}
</style>


