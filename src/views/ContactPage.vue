<script setup lang="ts">
import { ref } from 'vue'

// Asset URLs
const assets = {
  images: {
    sectionBgPattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
    group24: new URL('../assets/images/Group 24.svg', import.meta.url).href,
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
        content: '+44 (0) 1111 111 111'
      },

      {
        heading: 'INDIA BISTRO, PADDINGTON',
        content: '+44 (0) 2222 222 222'
      }
    ]
  }
}

const contactForm = ref({
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
  <div class="contact-page">
    <!-- Background Pattern -->
    <div class="bg-pattern">
      <img :src="pageData.contactSection.backgroundImageSrc" alt="" class="pattern-overlay" />
    </div>

    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="assets.images.bigBgIcon" alt="" class="big-bg-icon" />
    </div>

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
              <p class="info-text">{{ item.content }}</p>
            </div>
          </div>

          <!-- Small Divider after Leeds section -->
          <div class="small-divider-section">
            <img :src="pageData.contactSection.dividerImage" alt="" class="small-divider-image" />
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
.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 1;
}

.pattern-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Main Container */
.contact-main-container {
  position: relative;
  z-index: 2;
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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
