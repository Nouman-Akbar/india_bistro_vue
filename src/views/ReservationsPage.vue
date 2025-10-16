<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Clock, Users, Mail, Phone, User } from 'lucide-vue-next'

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
  // Handle form submission
  alert('Thank you for your reservation! We will contact you shortly to confirm.')
}
</script>

<template>
  <div class="reservations-page">
    <div class="reservations-hero">
      <h1 class="page-title">Reserve Your Table</h1>
      <p class="page-subtitle">Experience Authentic Indian Dining</p>
    </div>

    <div class="reservations-container">
      <div class="reservation-info" data-scroll data-scroll-speed="0.3">
        <h2 class="info-title">Visit Us</h2>
        <div class="info-content">
          <div class="info-item">
            <h3>Location</h3>
            <p>India Bistro, Leeds<br>29258 Main Street<br>Leeds, UK</p>
          </div>
          <div class="info-item">
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 12:00 PM - 10:00 PM<br>
               Saturday - Sunday: 11:00 AM - 11:00 PM</p>
          </div>
          <div class="info-item">
            <h3>Contact</h3>
            <p>Phone: +44 (0) 1111 111 111<br>
               Email: info@indiabistro.com</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="reservation-form" data-scroll data-scroll-speed="0.5">
        <h2 class="form-title">Book a Table</h2>
        
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
              <option v-for="n in 12" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
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

        <button type="submit" class="submit-button">
          Reserve Table
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.reservations-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 100%);
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.reservations-hero {
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

.reservations-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
}

.reservation-info {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  padding: clamp(2rem, 4vw, 3rem);
  backdrop-filter: blur(10px);
}

.info-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item h3 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #A7713A;
  margin-bottom: 0.75rem;
}

.info-item p {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: rgba(244, 224, 200, 0.8);
  line-height: 1.8;
}

.reservation-form {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  padding: clamp(2rem, 4vw, 3rem);
  backdrop-filter: blur(10px);
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 500;
  color: #f4e0c8;
  letter-spacing: 0.05em;
}

.form-input,
.form-textarea {
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
  min-height: 100px;
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
  margin-top: 1rem;
}

.submit-button:hover {
  background: #8d5e2f;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(167, 113, 58, 0.3);
}

@media (max-width: 768px) {
  .reservations-container {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
