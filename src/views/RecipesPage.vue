<script setup lang="ts">
import { RouterLink } from 'vue-router'

const assets = {
  pattern: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href,
  buttonBg: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href,
  bigBgIcon: new URL('../assets/images/Big BG Icon.svg', import.meta.url).href,
  divider: new URL('../assets/images/brown_7_diamonds.svg', import.meta.url).href,
  gallery: {
    31: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
    32: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
    33: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
    34: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href
  }
}

const recipeSpotlights = [
  {
    id: 'butter-chicken',
    title: 'Imperial Butter Chicken',
    region: 'Old Delhi, 1974',
    image: assets.gallery[31],
    accentColor: '#C86A3D',
    highlight: 'House Signature',
    story: 'Corn-fed chicken charred in our Josper grill, then bathed in a velvet tomato-makhani emulsion finished with smoked jaggery ghee.',
    keyNotes: ['18-hour marinade with black cardamom smoke', 'Single-estate tomato reduction', 'Kasuri fenugreek bloom right before service'],
    kitchenSecret: 'We temper the sauce three times, never boiling it, so the cream stays satin-smooth.'
  },
  {
    id: 'nihaari',
    title: 'Nizami Nihari Broth',
    region: 'Hyderabad, Dawn Service',
    image: assets.gallery[32],
    accentColor: '#6C7B4F',
    highlight: 'Weekend Ritual',
    story: 'Pasture-raised lamb shin slow-braised overnight with stone-ground garam, then brightened with saffron lime achar.',
    keyNotes: ['Bone marrow lends natural silkiness', 'Roasted spice paste folded in at the last 5 minutes', 'Served with smoked khameeri bread'],
    kitchenSecret: 'The broth rests for one hour before plating so the aromatics settle harmoniously.'
  },
  {
    id: 'koliwada',
    title: 'Coastal Koliwada Prawns',
    region: 'Mumbai Fishermen Docks',
    image: assets.gallery[33],
    accentColor: '#8D3A30',
    highlight: 'Chef’s Crush',
    story: 'Tiger prawns dusted with fermented chilli batter, flash-fried, and paired with coconut kefir foam.',
    keyNotes: ['Fermented chilli batter for natural tang', 'Coconut kefir made in-house', 'Green mango dust sprinkled at the pass'],
    kitchenSecret: 'We only share the tasting notes—the spice ratios stay in our ledger.'
  }
]

const heritageNotes = [
  {
    title: 'We share stories, not secrets.',
    detail: 'Guests receive tasting notes, provenance, and pairing cues—enough to relive the memory without giving away the ledger.'
  },
  {
    title: 'Seasonal intuition matters most.',
    detail: 'Each broth, chutney, or smoke is adjusted with the day’s humidity and produce, so measurements would never stay exact.'
  },
  {
    title: 'Visit the kitchen table.',
    detail: 'Our chefs host limited-seat tastings where you can see finishes up close without needing a recipe card.'
  }
]

const tastingFlights = [
  {
    title: 'Spice Atlas Pairing',
    description: 'Three mini portions with progressive heat, served with palm jaggery milk punch.',
    badge: 'Evenings'
  },
  {
    title: 'Midnight Nihari Pour',
    description: 'Ladle of our dawn broth poured tableside with saffron oil and bruléed onions.',
    badge: 'Weekends'
  },
  {
    title: 'Chef’s Notebook',
    description: 'A rotating duo of off-menu experiments. Expect smoke, expect drama.',
    badge: 'Limited'
  }
]
</script>

<template>
  <section
    class="recipes-page relative overflow-hidden"
    :style="{
      'background-image': `url(${assets.pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <div
      class="big-bg-icon-overlay"
      aria-hidden="true"
      :style="{
        'background-image': `url(${assets.bigBgIcon})`,
        'background-repeat': 'no-repeat',
        'background-size': '800px',
        'background-position': 'center'
      }"
    ></div>
    <div class="recipes-shell">
      <header class="recipes-hero section-card">
        <div class="hero-overlay" aria-hidden="true"></div>
        <p class="eyebrow">Chef’s Notebook</p>
        <h1>Stories Behind Our Classics</h1>
        <p class="hero-lede">
          We trade in memories, not measurements. Browse the whisper notes for the dishes our chefs
          are obsessing over this season.
        </p>
        <div class="hero-divider">
          <img :src="assets.divider" alt="Divider" />
        </div>
      </header>

      <section class="recipes-spotlights">
        <div class="section-heading">
          <p class="eyebrow">From the pass</p>
          <h2>Three plates, countless stories.</h2>
        </div>
        <div class="spotlight-grid">
          <article
            v-for="spotlight in recipeSpotlights"
            :key="spotlight.id"
            class="spotlight-card section-card"
          >
            <div class="spotlight-media">
              <span class="spotlight-badge" :style="{ backgroundColor: spotlight.accentColor }">
                {{ spotlight.highlight }}
              </span>
              <img :src="spotlight.image" :alt="spotlight.title" loading="lazy" />
              <span class="spotlight-region">{{ spotlight.region }}</span>
            </div>
            <div class="spotlight-content">
              <h3>{{ spotlight.title }}</h3>
              <p class="spotlight-story">{{ spotlight.story }}</p>
              <ul class="spotlight-notes">
                <li v-for="note in spotlight.keyNotes" :key="note">{{ note }}</li>
              </ul>
              <p class="spotlight-secret">
                <strong>Kitchen whisper:</strong> {{ spotlight.kitchenSecret }}
              </p>
            </div>
            <div class="section-divider">
              <img :src="assets.divider" alt="Divider" />
            </div>
          </article>
        </div>
      </section>

      <section class="heritage-panel section-card">
        <div class="section-heading">
          <p class="eyebrow">Why we never publish recipes</p>
          <h2>Heritage is felt, not formatted.</h2>
        </div>
        <div class="heritage-notes">
          <article v-for="item in heritageNotes" :key="item.title" class="heritage-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        </div>
        <div class="section-divider">
          <img :src="assets.divider" alt="Divider" />
        </div>
      </section>

      <section class="tasting-flight section-card">
        <div class="section-heading">
          <p class="eyebrow">Experience it live</p>
          <h2>Reserve a tasting flight &amp; watch finishes up close.</h2>
        </div>
        <div class="tasting-flight__cards">
          <article v-for="flight in tastingFlights" :key="flight.title" class="flight-card">
            <span class="flight-badge">{{ flight.badge }}</span>
            <h3>{{ flight.title }}</h3>
            <p>{{ flight.description }}</p>
          </article>
        </div>
        <RouterLink class="cta-button" :to="{ name: 'reservations' }">
          <span class="cta-button-bg">
            <img :src="assets.buttonBg" alt="Button background" />
          </span>
          <span class="cta-button-text">Book the Chef’s Table</span>
        </RouterLink>
        <div class="section-divider">
          <img :src="assets.divider" alt="Divider" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.recipes-page {
  position: relative;
  padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4.5rem);
  background-color: #f4efe3;
  color: #1f140e;
}

.big-bg-icon-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.recipes-shell {
  position: relative;
  z-index: 3;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 6vw, 4rem);
}

.section-card {
  position: relative;
  border: 1px solid rgba(26, 18, 12, 0.15);
  border-radius: 0;
  padding: clamp(2rem, 5vw, 3.5rem);
  background: linear-gradient(145deg, rgba(254, 251, 245, 0.9), rgba(243, 232, 215, 0.78));
  box-shadow: 0 35px 70px rgba(12, 8, 5, 0.12);
  overflow: hidden;
}

.section-card::after {
  content: '';
  position: absolute;
  inset: 1.5rem;
  border-radius: 0;
  border: 1px solid rgba(26, 18, 12, 0.08);
  pointer-events: none;
}

.recipes-hero {
  text-align: center;
  padding-inline: clamp(2rem, 8vw, 5rem);
}

.recipes-hero::after {
  inset: 1rem;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(244, 239, 227, 0) 10%, rgba(244, 239, 227, 0.85) 100%);
  mix-blend-mode: multiply;
}

.recipes-hero h1 {
  font-family: 'PPMori', sans-serif;
  font-size: var(--font-size-4xl);
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: 1.25rem;
  line-height: var(--line-height-tight);
}

.hero-lede {
  max-width: 720px;
  margin: 0 auto;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: rgba(16, 9, 6, 0.75);
}

.hero-divider {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.hero-divider img {
  height: 20px;
  width: auto;
  opacity: 0.9;
}

.section-heading {
  text-align: left;
  margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
}

.section-heading h2 {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  letter-spacing: 0.08em;
  color: #140a05;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.74rem;
  color: rgba(20, 10, 5, 0.6);
  margin-bottom: 0.8rem;
}

.recipes-spotlights {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vw, 2.5rem);
}

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.25rem);
}

.spotlight-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
  padding-bottom: 4rem; /* extra space for bottom divider */
}

.spotlight-card::after {
  inset: 1rem;
}

.spotlight-media {
  position: relative;
  height: 260px;
  border-radius: 0;
  overflow: hidden;
  margin: clamp(1.5rem, 4vw, 2rem);
  border: 1px solid rgba(20, 10, 5, 0.08);
}

.spotlight-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  transition: transform 0.5s ease;
}

.spotlight-card:hover .spotlight-media img {
  transform: scale(1.08);
}

.spotlight-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: #fff;
  z-index: 2;
}

.spotlight-region {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.35rem 1.1rem;
  border-radius: 999px;
  background: rgba(19, 8, 4, 0.75);
  color: #fff9ef;
  font-size: 0.68rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  z-index: 2;
}

.spotlight-content {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 0 clamp(1.5rem, 4vw, 2.5rem) clamp(2rem, 5vw, 3rem);
}

.spotlight-content h3 {
  font-size: var(--font-size-xl) !important; 
  letter-spacing: var(--letter-spacing-wide);
  font-family: 'PPMori', sans-serif;
  line-height: var(--line-height-tight);
}

.spotlight-story {
  color: rgba(18, 8, 4, 0.78);
  line-height: 1.7;
}

.spotlight-notes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: rgba(18, 8, 4, 0.92);
}

.spotlight-notes li {
  position: relative;
  padding-left: 1.25rem;
  letter-spacing: 0.03em;
}

.spotlight-notes li::before {
  content: '◆';
  position: absolute;
  left: 0;
  top: 0;
  color: #c86a3d;
  font-size: 0.8rem;
}

.spotlight-secret {
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  color: rgba(18, 8, 4, 0.65);
}

.heritage-panel {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  background: linear-gradient(140deg, rgba(255, 253, 248, 0.95), rgba(243, 231, 214, 0.85));
}

.heritage-notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.heritage-card {
  padding: 1.25rem 1.5rem;
  border-radius: 0;
  border: 1px solid rgba(18, 8, 4, 0.1);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.heritage-card h3 {
  font-size: 1rem !important;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.heritage-card p {
  color: rgba(20, 10, 5, 0.78);
  line-height: 1.6;
}

.tasting-flight {
  display: flex;
  flex-direction: column;
  gap: clamp(1.75rem, 4vw, 3rem);
  text-align: center;
}

.section-divider {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.section-divider img {
  height: 20px;
  width: auto;
}

/* Lock dividers to bottom center on spotlight cards so they align across the row */
.spotlight-card .section-divider {
  position: absolute;
  left: 50%;
  bottom: 3.5rem;
  transform: translateX(-50%);
}

.tasting-flight__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  width: 100%;
}

.flight-card {
  border: 1px solid rgba(18, 8, 4, 0.1);
  border-radius: 0;
  padding: 1.5rem;
  text-align: left;
  background: rgba(248, 240, 226, 0.95);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.flight-card h3 {
  font-size: 1.15rem !important;
  margin-bottom: 0.4rem;
  font-family: 'PPMori', sans-serif;
}

.flight-card p {
  color: rgba(18, 8, 4, 0.7);
  line-height: 1.6;
}

.flight-badge {
  display: inline-flex;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 8, 4, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.7rem;
  margin-bottom: 0.85rem;
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
  display: block;
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

@media (max-width: 640px) {
  .spotlight-notes li::before {
    top: 0.2rem;
  }

  .heritage-card,
  .section-card {
    border-radius: 0;
  }

  .section-card::after {
    inset: 0.75rem;
    border-radius: 0;
  }

  .spotlight-media {
    margin-inline: 1rem;
  }
}
</style>
