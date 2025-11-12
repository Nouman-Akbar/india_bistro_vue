<script setup lang="ts">
import { ref, computed } from 'vue'

// Asset URLs
const assets = {
  images: {
    sectionBgPattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
    group24: new URL('../assets/images/Group 24.svg', import.meta.url).href,
    blogFeature1: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
    blogFeature2: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
    blogFeature3: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
  },
  svgs: {
    greenDiamondButton: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href,
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href,
    brownBorder: new URL('../assets/images/brown_story_section.svg', import.meta.url).href,
    greenBorder: new URL('../assets/images/green_story_section.svg', import.meta.url).href
  }
}

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Tandoori Cooking",
    date: "15th November 2024",
    excerpt: "Discover the centuries-old tradition of tandoori cooking and how our chefs master the clay oven to create dishes with smoky perfection and authentic flavors.",
    image: assets.images.blogFeature1,
    category: "Culinary Techniques",
    readTime: "5 min read",
    featured: true
  },
  {
    id: 2,
    title: "Spice Routes: A Journey Through Indian Flavors",
    date: "10th November 2024",
    excerpt: "Explore the diverse spice regions of India and how each contributes unique flavors that define our cuisine. From the mountains of Kashmir to the coasts of Kerala.",
    image: assets.images.blogFeature2,
    category: "Culture & History",
    readTime: "7 min read",
    featured: true
  },
  {
    id: 3,
    title: "Farm-to-Table: Sourcing Authentic Ingredients",
    date: "5th November 2024",
    excerpt: "Learn about our commitment to authentic ingredients and how we partner with local suppliers to bring the true taste of India to your table.",
    image: assets.images.blogFeature3,
    category: "Sustainability",
    readTime: "4 min read",
    featured: false
  }
]

// Categories for filtering
const categories = [
  "All Posts",
  "Culinary Techniques",
  "Culture & History",
  "Sustainability"
]

const selectedCategory = ref("All Posts")

// Filter blog posts based on selected category
const filteredBlogPosts = computed(() => {
  if (selectedCategory.value === "All Posts") {
    return blogPosts
  }
  return blogPosts.filter(post => post.category === selectedCategory.value)
})
</script>

<template>
  <div class="blog-next-page">
    <!-- Hero Section -->
    <section
      class="hero-section"
      :style="{
        'background-image': `url(${assets.images.sectionBgPattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Big BG Icon Overlay -->
      <div class="big-bg-icon-overlay">
        <img :src="assets.images.bigBgIcon" alt="" class="big-bg-icon" />
      </div>

      <div class="hero-container">
        <!-- Diamond Divider -->
       

        <div class="hero-header-padding">
          <!-- Additional Divider -->
          <div class="hero-header-divider">
            <img :src="assets.svgs.diamond" alt="" class="hero-header-divider-image" />
          </div>

          <div class="hero-header">
            <h1 class="hero-title">Welcome to the India Bistro Blog</h1>
            <p class="hero-subtitle">A Warm Welcome to India</p>
          </div>
        </div>

        <!-- Introduction Story Card inside Hero -->
        <div class="intro-story-card section-card">
          <div class="intro-story-hero">
            <div class="intro-story-diamond">
              <img :src="assets.svgs.diamond" alt="Diamond" class="intro-story-diamond-image" />
            </div>
            <h2 class="intro-story-title">Our Culinary Philosophy</h2>
          </div>
          <div class="intro-story-content">
            <p class="intro-story-text">
              At India Bistro, we believe food is more than just nourishment, it's a story of culture, craftsmanship, and connection. This space is where we bring those stories to life. Our blog is curated for diners, food lovers, and everyone passionate about Indian cuisine, offering an inside look into what makes India Bistro uniquely flavourful.
            </p>
            <p class="intro-story-text">
              From the bustling heart of our kitchens to the farmers and artisans who inspire our menu, we'll take you on a journey through the ingredients, traditions, and innovation behind our dishes. Discover signature recipes, chef secrets, and the vibrant regional inspirations that shape our culinary identity.
            </p>
            <p class="intro-story-text">
              Meet the passionate team behind the magic — our chefs, creators, and service experts who pour their heart into every detail, making India Bistro a place where guests feel at home.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Journey Section -->
   

    <!-- What to Expect Section -->
    <section class="expect-section">
      <!-- Padding above top decorative border -->
      <div class="expect-padding-top"></div>

      <!-- Top decorative border -->
      <div class="chunk-row chunk-row--top" :style="{ backgroundImage: 'url(' + assets.svgs.greenBorder + ')' }"></div>

      <div class="expect-container">
        <div class="expect-content">
          <div class="expect-diamond">
            <img :src="assets.svgs.diamond" alt="" class="expect-diamond-image" />
          </div>
          <h2 class="hero-title1">Stay Tuned For</h2>
          <div class="expect-grid">
            <div class="expect-item">
              <div class="expect-item-number">01</div>
              <h3 class="expect-item-title">Menu Highlights & Culinary Stories</h3>
              <p class="expect-item-text">Learn the craftsmanship behind your favourite dishes.</p>
            </div>
            <div class="expect-item">
              <div class="expect-item-number">02</div>
              <h3 class="expect-item-title">Recipes & Expert Tips</h3>
              <p class="expect-item-text">Bring the Flavours of India Bistro into your own kitchen.</p>
            </div>
            <div class="expect-item">
              <div class="expect-item-number">03</div>
              <h3 class="expect-item-title">Behind-the-Scenes Moments</h3>
              <p class="expect-item-text">Step into our world of culinary creativity and passion.</p>
            </div>
            <div class="expect-item expect-item-centered">
              <div class="expect-item-number">04</div>
              <h3 class="expect-item-title">New Launches & Exciting Announcements</h3>
              <p class="expect-item-text">Be the first to experience what's next.</p>
            </div>
          </div>

          <div class="expect-footer-text">
            <p class="expect-footer-paragraph">
              Whether you're exploring Indian cuisine for the first time or rediscovering flavours you love, this is your guide to the vibrant world of India Bistro.
            </p>
            <p class="expect-footer-paragraph">
              Join us as we celebrate food that connects people, traditions that carry history, and a dining experience that continues to evolve deliciously.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom decorative border -->
      <div class="chunk-row chunk-row--bottom" :style="{ backgroundImage: 'url(' + assets.svgs.greenBorder + ')' }"></div>

      <!-- Padding below bottom decorative border -->
      <div class="expect-padding-bottom"></div>
    </section>

    <!-- Blog Content Section -->


    <!-- Category Filter -->



    <!-- Newsletter Section -->
   
  </div>
</template>

<style scoped>
/* Blog Content Section */
.blog-content-section {
  position: relative;
  background-color: #8D3A30;
  color: #F7E9E2;
  padding: 0;
  overflow: hidden;
}

.blog-content-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 6rem) 2rem;
}

.blog-content {
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

.blog-content-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.blog-content-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.blog-content-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 3rem;
  letter-spacing: var(--letter-spacing-wider);
}

.blog-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  text-align: left;
}

.blog-content-block {
  background: rgba(247, 233, 226, 0.05);
  border-left: 3px solid #D69E2E;
  padding: 2rem;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.blog-content-block:hover {
  background: rgba(247, 233, 226, 0.1);
  transform: translateY(-4px);
}

.blog-content-heading {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wide);
}

.blog-content-paragraph {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: rgba(247, 233, 226, 0.9);
  margin: 0;
}

.blog-content-highlight {
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  margin-top: 2rem;
}

.blog-content-highlight-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: #F7E9E2;
  margin: 0;
  font-style: italic;
}

/* Category Filter */
.category-filter-section {
  position: relative;
  z-index: 2;
  padding: 4rem clamp(2rem, 4vw, 3rem);
  background-color: #111111;
}

.category-filter-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.category-btn {
  padding: 0.875rem 2rem;
  font-family: "F37Britain", monospace;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: #F7FAFC;
  background-color: transparent;
  border: 1px solid rgba(247, 250, 252, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: var(--letter-spacing-normal);
  min-width: 140px;
}

.category-btn:hover,
.category-btn.active {
  background-color: #D69E2E;
  border-color: #D69E2E;
  color: #111111;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
}

/* Base Styles */
.blog-next-page {
  width: 100%;
  background-color: #111111;
  color: #F7FAFC;
  font-family: "F37Britain", monospace;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  max-width: 800px;
  height: auto;
  z-index: 2;
  pointer-events: none;
  backface-visibility: hidden;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  backface-visibility: hidden;
}

.hero-container {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero-diamond-divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.hero-header-padding {
  padding-top: clamp(10rem, 5vw, 13rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-header-divider {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-header-divider-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.hero-header {
  text-align: center;
}

.hero-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-5xl);
  font-weight: normal;
  color: black;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: var(--letter-spacing-wider);
  line-height: var(--line-height-tight);
  text-transform: uppercase;
}
.hero-title1 {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-5xl);
  font-weight: normal;
  color: white;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: var(--letter-spacing-wider);
  line-height: var(--line-height-tight);
  text-transform: uppercase;
}
.hero-subtitle {
  font-size: var(--font-size-xl);
  color: #000000;
  letter-spacing: var(--letter-spacing-normal);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-normal);
}

/* Decorative borders */
.chunk-row {
  height: 60px;
  background-size: auto 100%;
  background-position: left center;
  background-repeat: repeat-x;
  pointer-events: none;
  z-index: 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Introduction Story Card inside Hero Section */

.intro-story-card {
  position: relative;
  border: 1px solid rgba(247, 233, 226, 0.15);
  border-radius: 0;
  padding: 0;
  background: linear-gradient(145deg, rgba(247, 233, 226, 0.05), rgba(141, 58, 48, 0.08));
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.intro-story-card::after {
  content: '';
  position: absolute;
  inset: 1.5rem;
  border-radius: 0;
  border: 1px solid rgba(247, 233, 226, 0.08);
  pointer-events: none;
}

.intro-story-hero {
  text-align: center;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(2rem, 8vw, 5rem);
  position: relative;
  z-index: 3;
}

.intro-story-hero::after {
  inset: 1rem;
}

.intro-story-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.intro-story-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.intro-story-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: black;
  margin-bottom: 0;
  letter-spacing: var(--letter-spacing-wider);
  text-transform: uppercase;
  line-height: var(--line-height-tight);
}

.intro-story-content {
  position: relative;
  z-index: 3;
  padding: 0 clamp(2rem, 8vw, 5rem) clamp(2rem, 5vw, 3.5rem);
  text-align: center;
}

.intro-story-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-normal);
  color: black;
  max-width: 800px;
  margin: 0 auto 2rem;
  text-align: center;
}

.intro-story-text:last-child {
  margin-bottom: 0;
}

/* Blog Content Section */
.blog-content-section {
  position: relative;
  background-color: #8D3A30;
  color: #F7E9E2;
  padding: 0;
  overflow: hidden;
}

.blog-content-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 6rem) 2rem;
}

.blog-content {
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

.blog-content-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.blog-content-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.blog-content-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 3rem;
  letter-spacing: var(--letter-spacing-wider);
}

.blog-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  text-align: left;
}

.blog-content-block {
  background: rgba(247, 233, 226, 0.05);
  border-left: 3px solid #D69E2E;
  padding: 2rem;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.blog-content-block:hover {
  background: rgba(247, 233, 226, 0.1);
  transform: translateY(-4px);
}

.blog-content-heading {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wide);
}

.blog-content-paragraph {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: rgba(247, 233, 226, 0.9);
  margin: 0;
}

.blog-content-highlight {
  background: rgba(214, 158, 46, 0.08);
  border: 1px solid rgba(214, 158, 46, 0.2);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  margin-top: 2rem;
}

.blog-content-highlight-text {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: #F7E9E2;
  margin: 0;
  font-style: italic;
}

/* Journey Section */
.journey-section {
  position: relative;
  z-index: 2;
  padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 4vw, 3rem);
  background-color: #111111;
}

.journey-container {
  max-width: 1200px;
  margin: 0 auto;
}

.journey-content {
  text-align: center;
}

.journey-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.journey-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.journey-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: #F7FAFC;
  margin-bottom: 3rem;
  letter-spacing: var(--letter-spacing-wider);
}

.journey-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  text-align: left;
}

.journey-text-block {
  background: rgba(247, 250, 252, 0.02);
  border-left: 3px solid #D69E2E;
  padding: 2rem;
  border-radius: 0 8px 8px 0;
}

.journey-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: rgba(247, 250, 252, 0.9);
  margin: 0;
}

.journey-text.centered {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: var(--font-size-lg);
  padding: 2rem;
  background: rgba(214, 158, 46, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(214, 158, 46, 0.2);
}

/* What to Expect Section */
.expect-section {
  position: relative;
  background-color: #5E6547;
  color: #F7E9E2;
  padding: 0;
  overflow: hidden;
}

.expect-padding-top {
  padding-top: clamp(1rem, 8vw, 2rem);
}

.expect-padding-bottom {
  padding-bottom: clamp(1rem, 8vw, 2rem);
}

.expect-container {
  position: relative;
  z-index: 3;
}

.expect-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 6rem) 2rem;
  text-align: center;
}

.expect-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.expect-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.expect-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 4rem;
  letter-spacing: var(--letter-spacing-wider);
}

.expect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.expect-item-centered {
  grid-column: 1 / -1;
  max-width: 600px;
  margin: 0 auto;
  justify-self: center;
}

.expect-item {
  background: rgba(247, 233, 226, 0.1);
  border: 1px solid rgba(247, 233, 226, 0.2);
  border-radius: 8px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.expect-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #D69E2E, #F7FAFC);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.expect-item:hover::before {
  transform: scaleX(1);
}

.expect-item:hover {
  background: rgba(247, 233, 226, 0.15);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.expect-item-number {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-4xl);
  font-weight: normal;
  color: rgba(247, 233, 226, 0.3);
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wider);
}

.expect-item-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wide);
  line-height: var(--line-height-tight);
}

.expect-item-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: rgba(247, 233, 226, 0.9);
  margin: 0;
}

.expect-footer-text {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.expect-footer-paragraph {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-normal);
  color: rgba(247, 233, 226, 0.9);
  margin-bottom: 1.5rem;
  font-style: italic;
}

/* Category Filter Section */
.category-filter-section {
  position: relative;
  z-index: 2;
  padding: 4rem clamp(2rem, 4vw, 3rem);
  background-color: #111111;
}

.category-filter-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.category-btn {
  padding: 0.875rem 2rem;
  font-family: "F37Britain", monospace;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: #F7FAFC;
  background-color: transparent;
  border: 1px solid rgba(247, 250, 252, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: var(--letter-spacing-normal);
  min-width: 140px;
}

.category-btn:hover,
.category-btn.active {
  background-color: #D69E2E;
  border-color: #D69E2E;
  color: #111111;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(214, 158, 46, 0.3);
}

/* Blog Posts Section */
.blog-posts-section {
  position: relative;
  z-index: 2;
  padding: 0 clamp(2rem, 4vw, 3rem) 4rem;
  background-color: #111111;
}

.blog-posts-container {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
  align-items: start;
}

/* Blog Post Card */
.blog-post-card {
  background: rgba(247, 250, 252, 0.02);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(247, 250, 252, 0.1);
  display: flex;
  flex-direction: column;
}

.blog-post-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border-color: rgba(214, 158, 46, 0.3);
}

.blog-post-card.featured {
  grid-column: span 2;
  background: rgba(214, 158, 46, 0.05);
  border-color: rgba(214, 158, 46, 0.2);
}

/* Post Image Container */
.post-image-container {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.blog-post-card.featured .post-image-container {
  height: 400px;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.blog-post-card:hover .post-image {
  transform: scale(1.08);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #E53E3E;
  color: #F7FAFC;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

/* Post Content */
.post-content {
  padding: 2rem;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-badge {
  font-size: var(--font-size-xs);
  color: #D69E2E;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  font-weight: 600;
}

.post-read-time {
  font-size: var(--font-size-xs);
  color: rgba(247, 250, 252, 0.6);
}

.post-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-xl);
  font-weight: normal;
  color: #F7FAFC;
  margin: 0 0 1rem 0;
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  flex: 1;
}

.post-date {
  font-size: var(--font-size-xs);
  color: rgba(247, 250, 252, 0.6);
  margin-bottom: 1rem;
}

.post-excerpt {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: rgba(247, 250, 252, 0.8);
  margin: 0;
  flex: 1;
}

/* Post Button Container */
.post-button-container {
  padding: 0 2rem 2rem;
  text-align: center;
}

.read-more-btn {
  width: 100%;
  max-width: 200px;
  padding: 1rem 2rem;
  font-family: "F37Britain", monospace;
  font-size: var(--font-size-sm);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: #111111;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;
}

.read-more-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* Post Divider */
.post-divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 0;
  margin: 0 auto;
}

.post-divider-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

/* Newsletter Section */
.newsletter-section {
  position: relative;
  z-index: 2;
  padding: 6rem clamp(2rem, 4vw, 3rem);
  background: linear-gradient(135deg, #8D3A30 0%, #5E6547 100%);
  text-align: center;
  overflow: hidden;
}

.newsletter-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}

.newsletter-content {
  text-align: center;
}

.newsletter-diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.newsletter-diamond-image {
  width: 100%;
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.newsletter-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-3xl);
  font-weight: normal;
  color: #F7E9E2;
  margin-bottom: 1rem;
  letter-spacing: var(--letter-spacing-wider);
}

/* Apply hero-title styles but with black color for light background */
.newsletter-content .hero-title {
  color: #000000;
}

.newsletter-subtitle {
  font-size: var(--font-size-base);
  color: rgba(247, 233, 226, 0.9);
  margin-bottom: 2rem;
  line-height: var(--line-height-normal);
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.newsletter-input {
  flex: 1;
  min-width: 250px;
  padding: 1rem 1.5rem;
  font-family: "F37Britain", monospace;
  font-size: var(--font-size-base);
  background-color: rgba(247, 233, 226, 0.1);
  border: 1px solid rgba(247, 233, 226, 0.2);
  border-radius: 50px;
  color: #F7E9E2;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(247, 233, 226, 0.5);
}

.newsletter-input:focus {
  border-color: #D69E2E;
  background-color: rgba(247, 233, 226, 0.15);
}

.newsletter-btn {
  padding: 1rem 2rem;
  font-family: "F37Britain", monospace;
  font-size: var(--font-size-base);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: #111111;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .blog-posts-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .blog-post-card.featured {
    grid-column: span 1;
  }

  .blog-post-card.featured .post-image-container {
    height: 280px;
  }

  .journey-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .expect-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .blog-content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }

  .intro-story-hero {
    padding: clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4.5rem);
  }

  .intro-story-content {
    padding: 0 clamp(1.5rem, 6vw, 4.5rem) clamp(3rem, 6vw, 4rem);
  }

  .hero-container {
    padding: clamp(1.5rem, 3vw, 2rem);
    gap: 2rem;
  }

  .hero-header-padding {
    padding-top: clamp(3rem, 6vw, 4rem);
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
  }

  .journey-section {
    padding: 4rem clamp(1.5rem, 3vw, 2rem);
  }

  .expect-content {
    padding: clamp(3rem, 6vw, 4rem) 1.5rem;
  }

  .expect-padding-top {
    padding-top: clamp(3rem, 6vw, 4rem);
  }

  .expect-padding-bottom {
    padding-bottom: clamp(3rem, 6vw, 4rem);
  }

  .expect-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .category-filter-section {
    padding: 3rem clamp(1.5rem, 3vw, 2rem);
  }

  .blog-posts-section {
    padding: 0 clamp(1.5rem, 3vw, 2rem) 3rem;
  }

  .blog-posts-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .newsletter-form {
    flex-direction: column;
    align-items: stretch;
  }

  .newsletter-input {
    min-width: auto;
  }

  .blog-content-container {
    padding: clamp(3rem, 6vw, 4rem) 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 1rem;
  }

  .intro-story-hero {
    padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem);
  }

  .intro-story-content {
    padding: 0 clamp(1rem, 4vw, 2rem) clamp(2rem, 5vw, 3rem);
  }

  .intro-story-card::after {
    inset: 0.75rem;
  }

  .hero-container {
    padding: 1rem;
    gap: 1.5rem;
  }

  .hero-header-padding {
    padding-top: 2rem;
    margin-bottom: 1rem;
  }

  .journey-section {
    padding: 3rem clamp(1rem, 2vw, 1.5rem);
  }

  .expect-content {
    padding: 3rem 1rem;
  }

  .expect-padding-top {
    padding-top: 2rem;
  }

  .expect-padding-bottom {
    padding-bottom: 2rem;
  }

  .category-filter-section {
    padding: 2rem clamp(1rem, 2vw, 1.5rem);
  }

  .blog-posts-section {
    padding: 0 clamp(1rem, 2vw, 1.5rem) 2rem;
  }

  .blog-content-container {
    padding: 3rem 1rem;
  }

  .blog-content-block {
    padding: 1.5rem;
  }

  .blog-content-highlight {
    padding: 2rem 1.5rem;
  }

  .newsletter-section {
    padding: 4rem clamp(1rem, 2vw, 1.5rem);
  }

  .category-buttons {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.75rem 1.5rem;
    font-size: var(--font-size-xs);
    min-width: 120px;
  }

  .expect-item {
    padding: 2rem 1.5rem;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-button-container {
    padding: 0 1.5rem 1.5rem;
  }

  .journey-text-block {
    padding: 1.5rem;
  }

  .journey-text.centered {
    padding: 1.5rem;
  }
}
</style>