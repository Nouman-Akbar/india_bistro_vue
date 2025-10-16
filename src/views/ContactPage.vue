<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Phone, MapPin, Clock } from 'lucide-vue-next'

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Contact form submitted:', contactForm.value)
  alert('Thank you for contacting us! We will get back to you soon.')
}
</script>

<template>
  <div class="contact-page">
    <div class="contact-hero">
      <h1 class="page-title">Get in Touch</h1>
      <p class="page-subtitle">We'd Love to Hear From You</p>
    </div>

    <div class="contact-container">
      <div class="contact-info" data-scroll data-scroll-speed="0.3">
        <h2 class="section-title">Contact Information</h2>
        
        <div class="info-cards">
          <div class="info-card">
            <div class="icon-wrapper">
              <MapPin :size="28" />
            </div>
            <h3>Location</h3>
            <p>India Bistro<br>29258 Main Street<br>Leeds, UK</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <Phone :size="28" />
            </div>
            <h3>Phone</h3>
            <p>+44 (0) 1111 111 111<br>+44 (0) 2222 222 222</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <Mail :size="28" />
            </div>
            <h3>Email</h3>
            <p>info@indiabistro.com<br>reservations@indiabistro.com</p>
          </div>

          <div class="info-card">
            <div class="icon-wrapper">
              <Clock :size="28" />
            </div>
            <h3>Opening Hours</h3>
            <p>Mon-Fri: 12:00 PM - 10:00 PM<br>Sat-Sun: 11:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form" data-scroll data-scroll-speed="0.5">
        <h2 class="section-title">Send Us a Message</h2>
        
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input 
            id="name"
            v-model="contactForm.name" 
            type="text" 
            class="form-input" 
            placeholder="Your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            id="email"
            v-model="contactForm.email" 
            type="email" 
            class="form-input" 
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="subject" class="form-label">Subject</label>
          <input 
            id="subject"
            v-model="contactForm.subject" 
            type="text" 
            class="form-input" 
            placeholder="What is this about?"
            required
          />
        </div>

        <div class="form-group">
          <label for="message" class="form-label">Message</label>
          <textarea 
            id="message"
            v-model="contactForm.message" 
            class="form-textarea" 
            placeholder="Tell us more..."
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-button">
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 100%);
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.contact-hero {
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #f4e0c8;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(244, 224, 200, 0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.contact-info {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  padding: clamp(2rem, 4vw, 3rem);
  backdrop-filter: blur(10px);
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  padding: 1.5rem;
  background: rgba(26, 15, 10, 0.4);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(167, 113, 58, 0.2);
  transform: translateX(8px);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(167, 113, 58, 0.2);
  border-radius: 50%;
  margin-bottom: 1rem;
  color: #A7713A;
}

.info-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 0.75rem;
}

.info-card p {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: rgba(244, 224, 200, 0.8);
  line-height: 1.8;
}

.contact-form {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  padding: clamp(2rem, 4vw, 3rem);
  backdrop-filter: blur(10px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 500;
  color: #f4e0c8;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.form-input,
.form-textarea {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  padding: 0.875rem 1rem;
  background: rgba(26, 15, 10, 0.6);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 8px;
  color: #f4e0c8;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #A7713A;
  background: rgba(26, 15, 10, 0.8);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(244, 224, 200, 0.4);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f4e0c8;
  background: #A7713A;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background: #8d5e2f;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(167, 113, 58, 0.3);
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style>
