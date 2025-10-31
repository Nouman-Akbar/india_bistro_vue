# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 restaurant website for "India Bistro" built with TypeScript, Vite, and Tailwind CSS. The project features smooth scrolling animations, multiple pages for restaurant services, and a rich visual design with custom typography.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript compilation and Vite build)
- `npm run preview` - Preview production build

## Architecture

### Core Technologies
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** for build tooling and development server
- **Vue Router** for client-side routing
- **Tailwind CSS** for styling
- **GSAP** with ScrollTrigger for animations
- **Locomotive Scroll** for smooth scrolling experience
- **@vueuse/motion** for Vue animation utilities

### Project Structure
```
src/
├── components/          # Reusable Vue components
├── views/              # Page-level components
├── router/             # Vue Router configuration
├── data/               # Static data (e.g., slider sections)
└── main.ts            # Application entry point
```

### Key Architecture Patterns

**Scroll Management**: The app uses Locomotive Scroll with GSAP ScrollTrigger integration. The main scroll container is `#main` with `data-scroll-container`. All scroll-related functionality is centralized in `App.vue`.

**Routing**: Vue Router with 8 routes - home, menu, reservations, recipes, contact, blog, gallery, and catering. Routes include scroll behavior reset to top.

**Animation System**: Combines GSAP ScrollTrigger with Locomotive Scroll proxy for performant scroll-based animations. Uses @vueuse/motion for component-level animations.

**Typography System**: Custom font family definitions in Tailwind config including PP Mori, Pitch, SweetSansPro, FoundersGrotesk, F37Britain, and Playfair Display.

**Color Scheme**: Dark theme with background (#111111), primary red (#E53E3E), accent gold (#D69E2E), and text colors.

### Key Components

- **AppHeader/AppFooter**: Layout components with scroll sections
- **HomePopup**: Modal/popup component
- **SplashScreen**: Loading screen
- **SliderSection**: Reusable slider component
- **HeroSection/BannerSection**: Landing page sections
- **GallerySection/ImageContentSection**: Media display components
- **TabbedMenuSection**: Menu navigation component

### Data Management

Static data is stored in `src/data/sliderSections.ts`. The project appears to use a component-based state management approach without a centralized state management library.

### Build Configuration

- Vite configuration includes Vue plugin and path aliases (`@` maps to `src/`)
- TypeScript configuration uses project references with separate configs for app and node environments
- Tailwind CSS configured with custom color palette, font families, and animations

## Important Implementation Notes

### Scroll Structure Rules
The app has strict scroll management requirements:
- **One scroll container**: Only `#main` should have `data-scroll-container`
- **Top-level sections only**: Only direct children should have `data-scroll-section`
- **No nested sections**: Components inside `<main>` should NOT have `data-scroll-section`
- **Z-index layering**: Header (z-index: 60) > Content (z-index: 1) for proper stacking
- **Pin offsets**: Pin sections below header height to avoid overlap

### Animation Integration
The project uses GSAP ScrollTrigger with Locomotive Scroll proxy. When working with animations:
- Register ScrollTrigger plugins in App.vue onMounted
- Use `ScrollTrigger.refresh()` after dynamic content changes
- For pinned sections, use `pinSpacing: 'margin'` instead of `true` for Locomotive compatibility
- Set appropriate z-index values to prevent overlap issues

### Component Architecture Patterns
- Use `<script setup lang="ts">` syntax for all Vue components
- Leverage @vueuse/motion for component-level animations
- Follow the existing section-based component structure (HeroSection, GallerySection, etc.)
- Maintain consistent styling patterns using Tailwind classes

### Asset Management
Images and assets are stored in `src/assets/` and imported using `new URL()` pattern for proper Vite handling, as seen in `sliderSections.ts`.

### Known Issues and Solutions
Refer to `ROUTING_GUIDE.md` for detailed solutions to common issues like:
- Header transform matrix3D conflicts
- Content overflow problems
- Slider section visibility issues
- Pin spacing compatibility with Locomotive Scroll