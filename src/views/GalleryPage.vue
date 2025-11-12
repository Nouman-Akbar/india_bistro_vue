<script setup lang="ts">
import { createLazyComponent } from '@/utils/lazyComponent'
const GalleryParallax = createLazyComponent(() => import('../components/GalleryParallax.vue'))

// Asset URLs
const assets = {
  images: {
    sectionBgPattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
    group24: new URL('../assets/images/Group 24.svg', import.meta.url).href,
    // Gallery images from the gallery folder
    gallery1: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
    gallery2: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
    gallery3: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
    gallery4: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
    gallery5: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
    gallery6: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
  },
  svgs: {
    greenDiamondButton: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href,
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href
  }
}

// Gallery images data structure
const galleryImages = [
  {
    id: 1,
    title: "Signature Dish 1",
    image: assets.images.gallery1,
    category: "Culinary Excellence"
  },
  {
    id: 2,
    title: "Signature Dish 2",
    image: assets.images.gallery2,
    category: "Culinary Excellence"
  },
  {
    id: 3,
    title: "Signature Dish 3",
    image: assets.images.gallery3,
    category: "Culinary Excellence"
  },
  {
    id: 4,
    title: "Signature Dish 4",
    image: assets.images.gallery4,
    category: "Culinary Excellence"
  },
  {
    id: 5,
    title: "Signature Dish 5",
    image: assets.images.gallery5,
    category: "Culinary Excellence"
  },
  {
    id: 6,
    title: "Signature Dish 6",
    image: assets.images.gallery6,
    category: "Culinary Excellence"
  }
]

// Page Data Structure
const pageData = {
  heroSection: {
    title: 'A PEEK INSIDE',
    subtitle: 'A visual journey through our culinary creations, ambiance, and memorable moments at India Bistro.',
    backgroundImageSrc: assets.images.sectionBgPattern,
    bigBgIconSrc: assets.images.bigBgIcon,
    containerWidth: '800px'
  },
  contentSection: {
    dividerImage: assets.images.group24,
    galleryImages: galleryImages
  }
}
</script>

<template>
  <div
    class="gallery-page"
    :style="{
      'background-image': `url(${pageData.heroSection.backgroundImageSrc})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="pageData.heroSection.bigBgIconSrc" alt="" class="big-bg-icon" />
    </div>

    <!-- Hero Section -->
    <div class="hero-main-container">
      <div class="hero-container" :style="{ width: pageData.heroSection.containerWidth }">
        <!-- Diamond Divider -->
        <div class="hero-diamond-divider">
          <img :src="assets.svgs.diamond" alt="" class="hero-diamond-image" />
        </div>

        <div class="hero-header">
          <h1 class="hero-title">{{ pageData.heroSection.title }}</h1>
          <p class="hero-subtitle">{{ pageData.heroSection.subtitle }}</p>
        </div>

        <!-- Divider Section -->
        
      </div>
    </div>

    <!-- Gallery Grid Section -->
    <div class="gallery-container">
      <div class="gallery-grid">
        <div
          v-for="(image, index) in pageData.contentSection.galleryImages"
          :key="image.id"
          class="gallery-block"
        >
          <div
            class="gallery-item"
            :class="`border-color-${index + 1}`"
          >
            <img :src="image.image" :alt="image.title" class="gallery-image" />
          </div>
          <p class="gallery-category gallery-caption">{{ image.category }}</p>
        </div>
      </div>
    </div>

    <GalleryParallax
      class="gallery-parallax-section"
      :items="pageData.contentSection.galleryImages"
    />
  </div>
</template>

<style scoped>
.gallery-page {
  background: transparent;
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  overflow: visible;
  min-height: 100vh;
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
  z-index: 2;
  pointer-events: none;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Hero Container */
.hero-main-container {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: clamp(4rem, 8vw, 6rem) 0;
  display: flex;
  justify-content: center;
}

.hero-container {
  position: relative;
  z-index: 3;
  text-align: center;
}

/* Hero Diamond Divider */
.hero-diamond-divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-diamond-image {
  width: 100%;
  max-width: 180px;
  height: auto;
  object-fit: contain;
}

.hero-header {
  text-align: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(32, 42, 44, 0.8);
  letter-spacing: 0.05em;
  max-width: 600px;
  margin: 0 auto;
}

/* Divider Section */
.divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: clamp(2rem, 4vw, 3rem);
}

.divider-image {
  width: 100%;
  max-width: 100px;
  height: auto;
  object-fit: contain;
}

/* Gallery Container */
.gallery-container {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1000px;
  padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
}

.gallery-grid {
  column-count: 2;
  column-gap: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
}

/* Wrapper to keep card and caption together in masonry columns */
.gallery-block {
  break-inside: avoid;
  display: inline-block;
  width: 100%;
}

@media (max-width: 768px) {
  .gallery-grid {
    column-count: 1;
  }
}

/* Gallery Item */
.gallery-item {
  background: transparent;
  border: 22px solid #202A2C;
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  break-inside: avoid;
  display: inline-block;
  width: 100%;
}

.gallery-item:hover {
  transform: scale(1.01);
}

/* Different border colors for each image */
.border-color-1 {
  border-color: #202A2C;
}

.border-color-1:hover {
  border-color: #8D3A30;
}

.border-color-2 {
  border-color: #8D3A30;
}

.border-color-2:hover {
  border-color: #202A2C;
}

.border-color-3 {
  border-color: #5E6547;
}

.border-color-3:hover {
  border-color: #8D3A30;
}

.border-color-4 {
  border-color: #A7713A;
}

.border-color-4:hover {
  border-color: #202A2C;
}

.border-color-5 {
  border-color: #F5F1E8;
}

.border-color-5:hover {
  border-color: #8D3A30;
}

.border-color-6 {
  border-color: #2D2A26;
}

.border-color-6:hover {
  border-color: #5E6547;
}

.gallery-image {
  width: 100%;
  object-fit: contain;
  border-radius: 0;
  transition: transform 0.3s ease;
  display: block;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.02);
}

/* Gallery Text */
.gallery-caption {
  margin-bottom: clamp(1rem, 2vw, 1.5rem);

  margin-top: 0.5rem;
  text-align: left;
}
.gallery-text {
  padding: clamp(0.75rem, 1.5vw, 1rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);

  text-align: center;
  background: rgba(255, 255, 255, 0.95);
}

.gallery-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.gallery-category {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.75rem, 1.2vw, 0.85rem);
  color: #8D3A30;
  margin: 0;
  font-weight: 500;
}

.gallery-parallax-section {
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-container {
    padding: 0 clamp(0.5rem, 1vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  }

  .hero-main-container {
    padding: clamp(3rem, 6vw, 4rem) 0;
  }


}

@media (max-width: 480px) {
  .gallery-container {
    padding: 0 clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
  }

  .hero-main-container {
    padding: clamp(2rem, 4vw, 3rem) 0;
  }


}
</style>
