
<template>
  <section 
    class="slider-section"
    :class="{ 'show-arrows': sectionData.show_arrows }"
    :style="{ '--section-color': sectionData.section_color, 'background-image': `url(${section_bg_pattern})` }"
  >
    <!-- Section Heading -->
    <div class="section-header">
      <h2 class="section-heading">{{ sectionData.heading }}</h2>
    </div>

    <!-- Cards Container -->
    <div class="cards-container">
      <div 
        v-for="(block, index) in sectionData.blocks" 
        :key="index"
        class="card"
      >
        <div class="card-image">
          <img :src="block.block_image" :alt="block.block_heading" />
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ block.block_heading }}</h3>
          <p class="card-description">{{ block.block_description }}</p>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="decorative-elements">
      <div class="diamond diamond--left"></div>
      <div class="diamond diamond--right"></div>
    </div>

    <!-- Action Button -->
    <div v-if="sectionData.button" class="section-button">
      <button class="cta-button">
        {{ sectionData.button.text }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">

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

// Props
defineProps<{
  sectionData: SliderSectionData
}>()
</script>

<style scoped>
.slider-section {
  position: relative;
  /* background: linear-gradient(135deg, #f5f1eb 0%, #ede5d8 100%); */
  padding: 4rem 0 6rem;
  overflow: hidden;
  
  /* Background pattern styling */
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
}

.section-header {
  text-align: center;
  padding: 0 2rem 4rem;
}

.section-heading {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 500;
  color: #6b5b4d;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
}

.cards-container {
  display: flex;
  gap: 0.5rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: auto;
  scroll-behavior: smooth;
  
  /* Hide scrollbars */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.cards-container::-webkit-scrollbar {
  display: none; /* WebKit */
}

.card {
  flex: 0 0 auto;
  max-width: 320px;
  background: transparent;
  border-radius: 0;
  overflow: hidden;
  /* box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12); */
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem 0;
  background: transparent;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c1810;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.card-description {
  font-size: 0.8rem;
  line-height: 1.5;
  color: #6b5b4d;
  margin: 0;
}

.decorative-elements {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0 2rem;
}

.diamond {
  width: 24px;
  height: 24px;
  background: var(--section-color, #5C823D);
  transform: rotate(45deg);
  position: relative;
}

.diamond::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: white;
  transform: translate(-50%, -50%) rotate(-45deg);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.section-button {
  text-align: center;
  padding: 2rem;
}

.cta-button {
  background: var(--section-color, #5C823D);
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: url(#curvedDiamond);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background: #4a6b2f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cards-container {
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .card {
    width: 280px;
  }
  
  .card-image {
    height: 220px;
  }
  
  .card-content {
    padding: 1.2rem;
  }
  
  .section-heading {
    font-size: 1rem;
    letter-spacing: 0.2em;
  }
}
</style>
