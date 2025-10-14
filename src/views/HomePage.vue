<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import MenuHighlight from '../components/MenuHighlight.vue'
import StorySection from '../components/StorySection.vue'
import SliderSection from '../components/SliderSection.vue'
import GallerySection from '../components/GallerySection.vue'
import { favouritesSection, specialtiesSection, dessertsSection } from '../data/sliderSections'
</script>

<template>
  <div class="home-page">
    <HeroSection class="section" />
    <MenuHighlight class="section" />
    <StorySection class="section" />
    
    <!-- Dynamic Slider Sections -->
    <SliderSection 
      :section-data="favouritesSection" 
      class="section" 
    />
    <SliderSection 
      :section-data="specialtiesSection" 
      class="section" 
    />
    <SliderSection 
      :section-data="dessertsSection" 
      class="section" 
    />
    
    <GallerySection class="section" />
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}
</style>
