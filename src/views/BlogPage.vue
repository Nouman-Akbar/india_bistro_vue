<script setup lang="ts">

// Asset URLs
const assets = {
  images: {
    sectionBgPattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
    group24: new URL('../assets/images/Group 24.svg', import.meta.url).href,
  },
  svgs: {
    greenDiamondButton: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href,
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href
  }
}

// Blog posts data structure
const blogPosts = [
  {
    id: 1,
    title: "Bhatti Chicken Special",
    date: "15th October 2023",
    excerpt: "Discover our signature Bhatti Chicken - a traditional clay oven delicacy that brings the authentic taste of rural Punjab to your table. Marinated in secret spices and cooked to perfection.",
    image: new URL('../assets/images/Bhatti Chicken special.svg', import.meta.url).href,
    category: "Signature Dishes"
  },
  {
    id: 2,
    title: "Festive Menu Live",
    date: "10th October 2023",
    excerpt: "Celebrate the festive season with our specially curated menu featuring traditional Indian sweets and savory dishes that bring families together during special occasions.",
    image: new URL('../assets/images/Festive Menu Live.svg', import.meta.url).href,
    category: "Seasonal Specials"
  },
  {
    id: 3,
    title: "New Cocktail Menu",
    date: "5th October 2023",
    excerpt: "Explore our exciting new cocktail menu inspired by Indian flavors. From spice-infused martinis to tropical mango lassi cocktails, there's something for every palate.",
    image: new URL('../assets/images/NEW COCKTAIL MENU.svg', import.meta.url).href,
    category: "Beverages"
  },
  {
    id: 4,
    title: "Hello Paddington!",
    date: "28th September 2023",
    excerpt: "We're thrilled to announce the opening of our new Paddington location! Bringing the same authentic flavors and warm hospitality to the heart of London.",
    image: new URL('../assets/images/HELLO PADDINGTON.svg', import.meta.url).href,
    category: "News & Updates"
  },
  {
    id: 5,
    title: "What is Ramadan?",
    date: "20th September 2023",
    excerpt: "Learn about the significance of Ramadan and discover our special Iftar menu designed to bring families together during this holy month of reflection and community.",
    image: new URL('../assets/images/What is Ramadan.svg', import.meta.url).href,
    category: "Culture & Tradition"
  },
  {
    id: 6,
    title: "Leeds Opening",
    date: "15th September 2023",
    excerpt: "Exciting news! India Bistro is now open in Leeds. Join us for an unforgettable culinary journey featuring the best of North and South Indian cuisine.",
    image: new URL('../assets/images/LEEDS OPENING.svg', import.meta.url).href,
    category: "News & Updates"
  }
]

// Page Data Structure
const pageData = {
  heroSection: {
    title: ' The India Bistro Journal ',
    subtitle: 'Stories from our kitchens, chefs’ tips, signature recipes, behind-the-scenes glimpses  stay inspired and hungry.',
    backgroundImageSrc: assets.images.sectionBgPattern,
    bigBgIconSrc: assets.images.bigBgIcon,
    containerWidth: '800px'
  },
  contentSection: {
    dividerImage: assets.images.group24,
    blogPosts: blogPosts
  }
}
</script>

<template>
  <div
    class="blog-page"
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

    <!-- Blog Posts Section -->
    <div class="blog-posts-container">
      <div class="blog-posts-grid">
        <article
          v-for="post in pageData.contentSection.blogPosts"
          :key="post.id"
          class="blog-post-card"
        >
          <!-- Post Title -->
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
          </div>

          <!-- Post Image -->
          <div class="post-image-container">
            <img :src="post.image" :alt="post.title" class="post-image" />
          </div>

          <!-- Read More Button -->
          <div class="post-button-container">
            <button class="read-more-btn" :style="{ backgroundImage: `url(${assets.svgs.greenDiamondButton})` }">
              Read More
            </button>
          </div>

          <!-- Divider Section -->
          <div class="post-divider-section">
            <img :src="pageData.contentSection.dividerImage" alt="" class="post-divider-image" />
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
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

/* Background pattern now applied inline on .blog-page */

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

/* Blog Posts Container */
.blog-posts-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 0 clamp(2rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem);
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
  width: 100%;
}

/* Blog Post Card */
.blog-post-card {
  background: transparent;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  transition: transform 0.3s ease;
  position: relative;
  text-align: center;
}

.blog-post-card:hover {
  transform: translateY(-5px);
}

/* Post Content */
.post-content {
  padding: 0 0 clamp(1rem, 2vw, 1.5rem) 0;
  text-align: center;
}

.post-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  color: #202A2C;
  margin: 0;
  line-height: 1.3;
}

/* Post Image Container */
.post-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 0;
}

.blog-post-card:hover .post-image {
  transform: scale(1.05);
}

/* Post Button Container */
.post-button-container {
  padding: clamp(1.5rem, 3vw, 2rem) 0 0 0;
  text-align: center;
}

/* Read More Button */
.read-more-btn {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f4e0c8;
  background-image: url('../assets/images/button_green_bg_diamond.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(45px, 5vw, 50px);
  margin: 0 auto;
}



.read-more-btn:active {
  transform: translateY(0);
}

/* Post Divider Section */
.post-divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: clamp(1.5rem, 3vw, 2rem);
}

.post-divider-image {
  width: 100%;
  max-width: 80px;
  height: auto;
  object-fit: contain;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-posts-container {
    padding: 0 clamp(1rem, 3vw, 2rem) clamp(3rem, 6vw, 4rem);
  }

  .blog-posts-grid {
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 3vw, 2rem);
  }

  .hero-main-container {
    padding: clamp(3rem, 6vw, 4rem) 0;
  }

  .post-image-container {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .blog-posts-container {
    padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem);
  }

  .hero-main-container {
    padding: clamp(2rem, 4vw, 3rem) 0;
  }

  .post-content {
    padding: clamp(1rem, 2vw, 1.5rem);
  }

  .post-image-container {
    height: 180px;
  }

  .blog-post-card {
    margin: 0 -0.5rem;
    border-radius: 8px;
  }
}
</style>
