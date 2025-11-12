<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Clock, Users, Mail, Phone, User, MapPin } from 'lucide-vue-next'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  specialRequests: ''
})

const handleSubmit = () => {
  console.log('Reservation submitted:', formData.value)
  alert('Thank you for your reservation! We will contact you shortly to confirm.')
}

const sectionBgPattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href
const decorationDiamonds = new URL('../assets/images/brown_7_diamonds.svg', import.meta.url).href
const buttonBackground = new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href

const heroContent = {
  eyebrow: 'PRIVATE DINING',
  title: 'Reserve Your Table',
  subtitle: 'Experience Authentic Indian Dining'
}

const infoSections = [
  {
    title: 'Location',
    content: 'India Bistro, Leeds<br>29258 Main Street<br>Leeds, UK',
    icon: MapPin
  },
  {
    title: 'Opening Hours',
    content: 'Monday - Friday: 12:00 PM - 10:00 PM<br>Saturday - Sunday: 11:00 AM - 11:00 PM',
    icon: Clock
  },
  {
    title: 'Contact',
    content: 'Phone: 0113 340 0236 <br>Email: info@indiabistro.co.uk',
    icon: Phone
  }
]
</script>

<template>
  <div
    class="private-dining-page"
    :style="{
      'background-image': `url(${sectionBgPattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>

    <section class="intro-section">
      <div class="decoration-line">
        <img :src="decorationDiamonds" alt="Decorative motif" />
      </div>
      <p class="intro-eyebrow">{{ heroContent.eyebrow }}</p>
      <h1 class="intro-title">{{ heroContent.title }}</h1>
      <p class="intro-copy">{{ heroContent.subtitle }}</p>
    </section>

    <section class="details-grid">
      <div class="info-panel" data-scroll data-scroll-speed="0.3">
        <div class="panel-header">
          <p class="panel-eyebrow">Visit Us</p>
          <h2 class="panel-title">{{ heroContent.subtitle }}</h2>
        </div>

        <div class="info-cards">
          <article
            v-for="section in infoSections"
            :key="section.title"
            class="info-card"
          >
            <div class="info-icon-wrapper">
              <component
                :is="section.icon"
                class="info-icon"
                :size="22"
                stroke-width="1.25"
              />
            </div>
            <div>
              <h3 class="info-heading">{{ section.title }}</h3>
              <p class="info-copy" v-html="section.content" />
            </div>
          </article>
        </div>

        <div class="panel-divider">
          <img :src="decorationDiamonds" alt="Divider" />
        </div>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="reservation-form"
        data-scroll
        data-scroll-speed="0.5"
      >
        <div class="form-header">
          <p class="form-eyebrow">Book a Table</p>
          <h2 class="form-title">{{ heroContent.title }}</h2>
          <p class="form-subtitle">{{ heroContent.subtitle }}</p>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="name" class="form-label">
              <User :size="18" />
              <span>Full Name</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="John Doe"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">
              <Mail :size="18" />
              <span>Email</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="john@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone" class="form-label">
              <Phone :size="18" />
              <span>Phone</span>
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="+44 1111 111 111"
              required
            />
          </div>

          <div class="form-group">
            <label for="date" class="form-label">
              <Calendar :size="18" />
              <span>Date</span>
            </label>
            <input
              id="date"
              v-model="formData.date"
              type="date"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="time" class="form-label">
              <Clock :size="18" />
              <span>Time</span>
            </label>
            <input
              id="time"
              v-model="formData.time"
              type="time"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="guests" class="form-label">
              <Users :size="18" />
              <span>Number of Guests</span>
            </label>
            <select
              id="guests"
              v-model="formData.guests"
              class="form-input"
              required
            >
              <option v-for="n in 12" :key="n" :value="n">
                {{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group form-group-full">
          <label for="requests" class="form-label">
            <span>Special Requests</span>
          </label>
          <textarea
            id="requests"
            v-model="formData.specialRequests"
            class="form-textarea"
            placeholder="Any dietary requirements or special occasions?"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" class="cta-button">
          <span class="cta-button-bg">
            <img :src="buttonBackground" alt="Button background" />
          </span>
          <span class="cta-button-text">Reserve Table</span>
        </button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.private-dining-page {
  position: relative;
  min-height: 100vh;
  padding: clamp(3rem, 7vw, 6rem) 0 clamp(3rem, 6vw, 5rem);
  background-color: #f4efe3;
  overflow: hidden;
}

.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 900px;
  height: auto;
  z-index: 2;
  pointer-events: none;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.intro-section {
  position: relative;
  z-index: 3;
  max-width: 760px;
  margin: 0 auto clamp(3rem, 6vw, 5rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  text-align: center;
}

.decoration-line {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.decoration-line img {
  height: 24px;
  width: auto;
}

.intro-eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #8d3a30;
  margin-bottom: 1rem;
}

.intro-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 600;
  color: #2d2a26;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.intro-copy {
  font-size: clamp(1rem, 2vw, 1.25rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5a5550;
}

.details-grid {
  position: relative;
  z-index: 3;
  width: min(1200px, 94%);
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.info-panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(167, 113, 58, 0.25);
  border-radius: 0;
  padding: clamp(2rem, 4vw, 3rem);
  box-shadow: 0 20px 55px -35px rgba(0, 0, 0, 0.45);
}

.panel-header {
  margin-bottom: 1.75rem;
}

.panel-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: #8d3a30;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.panel-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #2d2a26;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(167, 113, 58, 0.2);
}

.info-card:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.info-icon-wrapper {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(167, 113, 58, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a7713a;
}

.info-heading {
  font-size: 1rem !important;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #2d2a26;
  margin-bottom: 0.35rem;
}

.info-copy {
  color: #5a5550;
  line-height: 1.7;
  font-size: 0.95rem;
}

.panel-divider {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.panel-divider img {
  height: 20px;
  width: auto;
}

.reservation-form {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(167, 113, 58, 0.25);
  border-radius: 0;
  padding: clamp(2rem, 4vw, 3.5rem);
  box-shadow: 0 25px 60px -40px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-header {
  text-align: left;
}

.form-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: #8d3a30;
  margin-bottom: 0.5rem;
}

.form-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: #2d2a26;
  letter-spacing: 0.12em;
  margin-bottom: 0.25rem;
}

.form-subtitle {
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #5a5550;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2d2a26;
}

.form-input,
.form-textarea,
.form-select {
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(167, 113, 58, 0.3);
  background: rgba(244, 239, 227, 0.6);
  color: #2d2a26;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.form-input:focus,
.form-textarea:focus,
select.form-input:focus {
  outline: none;
  border-color: #a7713a;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(167, 113, 58, 0.15);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.cta-button {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  align-self: center;
  margin: 0 auto;
  width: 100%;
  max-width: 320px;
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

@media (max-width: 768px) {
  .intro-copy {
    letter-spacing: 0.08em;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .reservation-form,
  .info-panel {
    border-radius: 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .cta-button {
    max-width: none;
  }
}
</style>
