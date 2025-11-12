<script setup lang="ts">
import { createLazyComponent } from '@/utils/lazyComponent'

const StorySection = createLazyComponent(() => import('../components/StorySection.vue'))
const ImageTextSection = createLazyComponent(() => import('../components/ImageTextSection.vue'))
const TextGenerateEffect = createLazyComponent(() => import('../components/TextGenerateEffect.vue'))

const assets = {
  svgs: {
    brownBorder: new URL('../assets/images/brown_story_section.svg', import.meta.url).href,
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href
  }
}

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

// Button backgrounds
const buttonBackground = new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href

const careersIntro =
  "Join the India Bistro UK family and become part of a team that celebrates authentic Indian cuisine with passion and creativity. We're always looking for talented individuals who share our love for exceptional food and hospitality."

const ourValues =
  "At India Bistro UK, we believe in nurturing talent, fostering creativity, and creating an environment where every team member can thrive. We value tradition, innovation, and the art of bringing people together through food."

const whyJoinUs =
  "Working with us means being part of a story that spans generations. You'll have the opportunity to learn from experienced chefs, develop your skills, and contribute to creating memorable dining experiences for our guests."

const openPositions = [
  {
    title: 'Head Chef',
    department: 'Kitchen',
    experience: '5+ years',
    type: 'Full-time'
  },
  {
    title: 'Sous Chef',
    department: 'Kitchen',
    experience: '3+ years',
    type: 'Full-time'
  },
  {
    title: 'Line Cook',
    department: 'Kitchen',
    experience: '1+ years',
    type: 'Full-time'
  },
  {
    title: 'Restaurant Manager',
    department: 'Front of House',
    experience: '3+ years',
    type: 'Full-time'
  },
  {
    title: 'Server/Waitstaff',
    department: 'Front of House',
    experience: '1+ years',
    type: 'Full-time/Part-time'
  },
  {
    title: 'Host/Hostess',
    department: 'Front of House',
    experience: '0+ years',
    type: 'Part-time'
  }
]

const benefits = [
  {
    title: 'Competitive Salary',
    description: 'Industry-leading compensation packages'
  },
  {
    title: 'Training & Development',
    description: 'Continuous learning opportunities and skill enhancement'
  },
  {
    title: 'Career Growth',
    description: 'Clear advancement pathways within our organization'
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible scheduling and supportive team environment'
  },
  {
    title: 'Staff Meals',
    description: 'Enjoy our authentic Indian cuisine during shifts'
  },
  {
    title: 'Team Culture',
    description: 'Join a diverse, passionate, and supportive family'
  }
]
</script>

<template>
  <div class="careers-page min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative w-full bg-repeat bg-[length:600px] h-[70vh] min-h-[500px] overflow-hidden"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Big BG Icon Overlay -->
      <div class="big-bg-icon-overlay">
        <img :src="bigBgIcon" alt="" class="big-bg-icon" />
      </div>
      <div class="absolute inset-0 "></div>

      <div class="relative h-full flex items-center justify-center text-center px-6 z-3">
        <div class="max-w-4xl mx-auto">
          <!-- Diamond Divider -->
          <div class="hero-diamond-divider">
            <img :src="assets.svgs.diamond" alt="" class="hero-diamond-image" />
          </div>

          <h1 class="hero-title text-black text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wider">
            CAREERS
          </h1>
          <p class="text-black/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Build your career with India Bistro UK, where tradition meets innovation
          </p>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <StorySection
      class="section"
      heading="Be Part of Our Story"
      :text="careersIntro"
      background-color="#8D3A30"
      heading-color="#F7E9E2"
      text-color="#F7E9E2"
      :border-image-src="assets.svgs.brownBorder"
      :show-top-border="true"
      :show-bottom-border="true"
    />

    <!-- Values Section -->
    <section
      class="relative w-full bg-repeat bg-[length:600px] overflow-hidden py-20 px-6 md:px-10"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Big BG Icon Overlay -->
      <div class="big-bg-icon-overlay">
        <img :src="bigBgIcon" alt="" class="big-bg-icon" />
      </div>
      <div class="relative max-w-6xl mx-auto z-3">
        <div class="text-center mb-16">
          <h2 class="hero-title text-black">
            Our Values
          </h2>
          <p class="text-black/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {{ ourValues }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="bg-gradient-to-br from-[#F4EFE3] to-[rgba(244, 239, 227, 0.85)] p-8 rounded-lg border border-[#AA8137]/30 hover:border-[#AA8137]/60 transition-all duration-300"
               style="background: linear-gradient(180deg, rgba(244, 239, 227) 10%, rgba(244, 239, 227, 0.85) 100%);">
            <h3 class="text-black text-xl font-bold mb-4">Passion</h3>
            <p class="text-black/70 leading-relaxed">
              We live and breathe authentic Indian cuisine, bringing passion to every dish we create.
            </p>
          </div>
          <div class="bg-gradient-to-br from-[#F4EFE3] to-[rgba(244, 239, 227, 0.85)] p-8 rounded-lg border border-[#AA8137]/30 hover:border-[#AA8137]/60 transition-all duration-300"
               style="background: linear-gradient(180deg, rgba(244, 239, 227) 10%, rgba(244, 239, 227, 0.85) 100%);">
            <h3 class="text-black text-xl font-bold mb-4">Excellence</h3>
            <p class="text-black/70 leading-relaxed">
              We strive for perfection in everything we do, from ingredients to service.
            </p>
          </div>
          <div class="bg-gradient-to-br from-[#F4EFE3] to-[rgba(244, 239, 227, 0.85)] p-8 rounded-lg border border-[#AA8137]/30 hover:border-[#AA8137]/60 transition-all duration-300"
               style="background: linear-gradient(180deg, rgba(244, 239, 227) 10%, rgba(244, 239, 227, 0.85) 100%);">
            <h3 class="text-black text-xl font-bold mb-4">Family</h3>
            <p class="text-black/70 leading-relaxed">
              We treat our team and guests like family, creating a warm, welcoming atmosphere.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Us Section -->
    <StorySection
      class="section"
      heading="Why Join India Bistro UK?"
      :text="whyJoinUs"
      background-color="#AA8137"
      heading-color="#FFFFFF"
      text-color="#FFFFFF"
      :show-top-border="true"
      :show-bottom-border="true"
    />

    <!-- Benefits Section -->
   

    <!-- Open Positions Section -->
    <section
      class="relative w-full bg-repeat bg-[length:600px] overflow-hidden py-20 px-6 md:px-10"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Big BG Icon Overlay -->
      <div class="big-bg-icon-overlay">
        <img :src="bigBgIcon" alt="" class="big-bg-icon" />
      </div>
      <div class="relative max-w-6xl mx-auto z-3">
        <div class="text-center mb-16">
          <h2 class="hero-title text-black">
            Open Positions
          </h2>
          <p class="text-black/70 text-lg">
            Join our team and help us create exceptional dining experiences
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="position in openPositions"
            :key="position.title"
            class="bg-gradient-to-br from-[#F4EFE3] to-[rgba(244, 239, 227, 0.85)] p-8 rounded-lg border border-[#AA8137]/30 hover:border-[#AA8137]/60 transition-all duration-300"
            style="background: linear-gradient(180deg, rgba(244, 239, 227) 10%, rgba(244, 239, 227, 0.85) 100%);"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-black text-xl font-bold">{{ position.title }}</h3>
              <span class="bg-[#AA8137] text-white px-3 py-1 rounded-full text-sm">
                {{ position.type }}
              </span>
            </div>
            <div class="space-y-2 text-black/70">
              <p><span class="text-black font-semibold">Department:</span> {{ position.department }}</p>
              <p><span class="text-black font-semibold">Experience:</span> {{ position.experience }}</p>
            </div>
            <a class="cta-button" href="#" style="margin-top: 1.5rem; max-width: 200px;">
              <span class="cta-button-bg">
                <img :src="buttonBackground" alt="Button background" />
              </span>
              <span class="cta-button-text">Apply Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Process Section -->
    <section
      class="relative w-full bg-repeat bg-[length:600px] overflow-hidden py-20 px-6 md:px-10"
      :style="{
        'background-image': `url(${section_bg_pattern})`,
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'center'
      }"
    >
      <!-- Big BG Icon Overlay -->
      <div class="big-bg-icon-overlay">
        <img :src="bigBgIcon" alt="" class="big-bg-icon" />
      </div>
      <div class="relative max-w-4xl mx-auto text-center z-3">
        <h2 class="hero-title text-black">
          How to Apply
        </h2>

        <div class="bg-gradient-to-br from-[#F4EFE3] to-[rgba(244, 239, 227, 0.85)] p-8 rounded-lg border border-[#AA8137]/30"
             style="background: linear-gradient(180deg, rgba(244, 239, 227) 10%, rgba(244, 239, 227, 0.85) 100%);">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div class="bg-[#AA8137] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 class="text-black font-bold mb-2">Send Your CV</h3>
              <p class="text-black/70">Email your resume and cover letter to careers@indiabistro.uk</p>
            </div>
            <div>
              <div class="bg-[#AA8137] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 class="text-black font-bold mb-2">Interview Process</h3>
              <p class="text-black/70">Meet our team and showcase your skills and passion</p>
            </div>
            <div>
              <div class="bg-[#AA8137] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 class="text-black font-bold mb-2">Join Our Team</h3>
              <p class="text-black/70">Start your journey with India Bistro UK family</p>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <p class="text-black/70 text-lg mb-6">
            Have questions about working with us?
          </p>
          <a href="/contact" class="cta-button" style="max-width: 280px;">
            <span class="cta-button-bg">
              <img :src="buttonBackground" alt="Button background" />
            </span>
            <span class="cta-button-text">Contact Our Team</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.careers-page {
  background-color: #111111;
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

/* Ensure content is above the background overlay */
.relative {
  position: relative;
  z-index: 3;
}

/* CTA Button Styles - matching TabbedMenuSection */
.cta-button {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  align-self: center;
  margin: 2rem auto 0;
  width: 100%;
  max-width: 320px;
  display: block;
  text-decoration: none;
}

.cta-button-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-button-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cta-button-text {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.95rem 2rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: #ffffff;
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

/* Hero title styles */
.hero-title {
  font-family: "PPMori", sans-serif;
  font-size: var(--font-size-5xl);
  font-weight: normal;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: var(--letter-spacing-wider);
  line-height: var(--line-height-tight);
  text-transform: uppercase;
}
</style>