<script setup lang="ts">
import { ref } from 'vue'

// Asset URLs
const assets = {
  images: {
    sectionBgPattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
    group24: new URL('../assets/images/Group 24.svg', import.meta.url).href,
    facebook: new URL('../assets/images/Facebook.svg', import.meta.url).href,
    instagram: new URL('../assets/images/Instagram.svg', import.meta.url).href,
    tiktok: new URL('../assets/images/TikTok.svg', import.meta.url).href,
  },
  svgs: {
    greenDiamondButton: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
  }
}

// Page Data Structure
const pageData = {
  contactSection: {
    backgroundImageSrc: assets.images.sectionBgPattern,
    formTitle: 'Say Hello',
    formSubtitle: "Questions, feedback, or just want to say hi? We'd love to hear from you.",
    formContainerWidth: '500px',
    formFields: [
      {
        id: 'name',
        type: 'text',
        placeholder: 'Your Name',
        required: true
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'Your Email',
        required: true
      },
      {
        id: 'message',
        type: 'textarea',
        placeholder: 'Your Message',
        rows: 6,
        required: true
      }
    ],
    submitButton: {
      text: 'Send Message',
      backgroundImageSrc: assets.svgs.greenDiamondButton
    },
    dividerImage: assets.images.group24,
    contactInfo: [
      {
        heading: 'INDIA BISTRO, LEEDS',
        content: 'Address: Regents Court, 33-39 Harrogate Rd, Chapel Allerton, Leeds LS7 3PD\nPhone: 0113 340 0236\nEmail: info@indiabistro.co.uk'
      },

      {
        heading: 'INDIA BISTRO, PADDINGTON',
        content: '+44 (0) 2222 222 222'
      }
    ],
    socialMedia: [
      {
        name: 'Facebook',
        icon: assets.images.facebook,
        url: 'https://facebook.com/indiabistro'
      },
      {
        name: 'Instagram',
        icon: assets.images.instagram,
        url: 'https://instagram.com/indiabistro'
      },
      {
        name: 'TikTok',
        icon: assets.images.tiktok,
        url: 'https://tiktok.com/@indiabistro'
      }
    ]
  }
}

type ContactForm = { name: string; email: string; message: string } & Record<string, string>
const contactForm = ref<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Contact form submitted:', contactForm.value)
  alert('Thank you for contacting us! We will get back to you soon.')
}
</script>

<template>
  <div
    class="contact-page"
    :style="{
      'background-image': `url(${pageData.contactSection.backgroundImageSrc})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >

    <!-- Big BG Icon Overlay -->
    <div
      class="big-bg-icon-overlay"
      :style="{
        'background-image': `url(${assets.images.bigBgIcon})`,
        'background-repeat': 'no-repeat',
        'background-size': '800px',
        'background-position': 'center'
      }"
    ></div>

    <!-- Contact Form Container -->
    <div class="contact-main-container">
      <div class="contact-form-container" :style="{ width: pageData.contactSection.formContainerWidth }">
        <div class="form-header">
          <h1 class="form-title">{{ pageData.contactSection.formTitle }}</h1>
          <p class="form-subtitle">{{ pageData.contactSection.formSubtitle }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div
            v-for="field in pageData.contactSection.formFields"
            :key="field.id"
            class="form-group"
          >
            <input
              v-if="field.type !== 'textarea'"
              :id="field.id"
              v-model="contactForm[field.id]"
              :type="field.type"
              class="form-input"
              :placeholder="field.placeholder"
              :required="field.required"
            />
            <textarea
              v-else
              :id="field.id"
              v-model="contactForm[field.id]"
              class="form-textarea"
              :placeholder="field.placeholder"
              :rows="field.rows"
              :required="field.required"
            ></textarea>
          </div>

          <button type="submit" class="submit-button" :style="{ backgroundImage: `url(${pageData.contactSection.submitButton.backgroundImageSrc})` }">
            {{ pageData.contactSection.submitButton.text }}
          </button>
        </form>

        <!-- Divider Section -->
        <div class="divider-section">
          <img :src="pageData.contactSection.dividerImage" alt="" class="divider-image" />
        </div>

        <!-- Contact Info Section -->
        <div class="contact-info-section">
          <div class="contact-info-grid">
            <div
              v-for="(item, index) in pageData.contactSection.contactInfo"
              :key="index"
              class="contact-info-item"
            >
              <h3 class="info-title">{{ item.heading }}</h3>
              <p class="info-text" style="white-space: pre-line;">{{ item.content }}</p>
            </div>
          </div>

          <!-- Small Divider after Leeds section -->
          <div class="small-divider-section">
            <img :src="pageData.contactSection.dividerImage" alt="" class="small-divider-image" />
          </div>
        </div>

        <!-- Follow Us Section -->
        <div class="follow-us-section">
          <div class="follow-us-header">
            <h3 class="follow-us-title">Follow Us</h3>
          </div>
          <div class="social-media-grid">
            <a
              v-for="social in pageData.contactSection.socialMedia"
              :key="social.name"
              :href="social.url"
              :title="social.name"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="social.icon" :alt="social.name" class="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  background: transparent;
  position: relative;
  padding: clamp(4rem, 8vw, 6rem) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: visible;
  min-height: 80vh;
}

/* Background Pattern - visible */
/* Removed bg-pattern block in favor of inline background on .contact-page */

/* Big BG Icon Overlay */
.big-bg-icon-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

/* Main Container */
.contact-main-container {
  position: relative;
  z-index: 3;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 clamp(2rem, 4vw, 3rem);
}

/* Contact Form Container - transparent background */
.contact-form-container {
  position: relative;
  z-index: 3;
  width: 500px;
  background: transparent;
  padding: 0;
  margin: 0 auto;
}

/* Form Header */
.form-header {
  text-align: center;
  margin-bottom: clamp(3rem, 5vw, 4rem);
}

.form-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #202A2C;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.form-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(32, 42, 44, 0.8);
  letter-spacing: 0.05em;
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 500;
  color: #202A2C;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

/* Clean Form Inputs - matching UI reference */
.form-input,
.form-textarea {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  padding: clamp(1rem, 2vw, 1.25rem);
  background: transparent;
  border: 1px solid #8D3A30;
  border-radius: 8px;
  color: #202A2C;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #8D3A30;
  background: transparent;
}

.form-input:hover,
.form-textarea:hover {
  border-color: #8D3A30;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(32, 42, 44, 0.5);
}

.form-textarea {
  resize: vertical;
  min-height: clamp(140px, 20vw, 180px);
}

/* Submit Button with background image */
.submit-button {
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f4e0c8;
  background-image: url('/src/assets/images/button_green_bg_diamond.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: clamp(1rem, 2vw, 1.5rem);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(35px, 4vw, 40px);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-image: url('/src/assets/images/button_green_bg_diamond.svg');
  background-size: cover;
  background-position: center;
}

.submit-button:active {
  transform: translateY(0);
}

/* Divider Section */
.divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: clamp(3rem, 5vw, 4rem);
}

.divider-image {
  width: 100%;
  max-width: 100px;
  height: auto;
  object-fit: contain;
}

/* Small Divider Section */
.small-divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: clamp(2rem, 4vw, 3rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.small-divider-image {
  width: 100%;
  max-width: 100px;
  height: auto;
  object-fit: contain;
}

/* Contact Info Section */
.contact-info-section {
  width: 100%;
  margin-top: clamp(2rem, 4vw, 3rem);
  text-align: center;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2rem);
  width: 100%;
}

.contact-info-item {
  padding: 0;
}

.info-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #202A2C;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.info-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #202A2C;
  line-height: 1.6;
  margin: 0;
}

/* Follow Us Section */
.follow-us-section {
  width: 100%;
  margin-top: clamp(3rem, 5vw, 4rem);
  text-align: center;
}

.follow-us-header {
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.follow-us-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #202A2C;
  margin: 0;
  letter-spacing: 0.05em;
}

.social-media-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(2rem, 4vw, 3rem);
  width: 100%;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  opacity: 0.8;
}

.social-icon {
  width: 100%;
  height: auto;
  max-width: clamp(40px, 6vw, 50px);
  object-fit: contain;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-main-container {
    padding: 0 clamp(1rem, 3vw, 2rem);
  }

  .contact-page {
    padding: clamp(3rem, 6vw, 4rem) 0;
  }

  .contact-form {
    gap: clamp(1.2rem, 2.5vw, 1.8rem);
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: clamp(2rem, 4vw, 3rem) 0;
  }

  .form-header {
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }

  .contact-form {
    gap: clamp(1rem, 2vw, 1.5rem);
  }

  .form-input,
  .form-textarea {
    padding: clamp(0.875rem, 1.5vw, 1.125rem);
  }
}
</style>
