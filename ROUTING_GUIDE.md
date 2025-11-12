# India Bistro Vue - Routing & Scroll Implementation Guide

## Overview
This project includes Vue Router with animated page transitions and Locomotive Scroll integration. The app uses client-side routing with smooth scrolling effects.

## Routes Implemented

- **Home** (`/`) - Main landing page with hero, menu highlights, story, sliders, and gallery
- **About** (`/about`) - Brand story with rich media sections
- **Menu** (`/menu`) - Full menu with categorized dishes (Starters, Main Course, Vegetarian Specials)
- **Reservations** (`/reservations`) - Table reservation form with contact information
- **Recipes** (`/recipes`) - Traditional Indian recipes with ingredients and cooking details
- **Contact** (`/contact`) - Contact form and business information
- **Gallery** (`/gallery`) - Visual showcase + parallax gallery section
- **Blog** (`/blog`) - Editorial entries
- **Catering** (`/catering`) - Private dining and events overview
- **Not Found** (`/:pathMatch(.*)*`) - Friendly 404 fallback to keep routing stable

## Key Features

### 1. Animated Page Transitions
- **Fade in/out effect** with vertical slide animation
- **Smooth transitions** between pages (0.4s duration)
- **No page reload** - all navigation happens client-side

### 2. Navigation
- **Header navigation** - Links are driven by `src/data/navigation.ts` so every primary route (About, Gallery, Menu, Recipes, Private Dining, Catering, Blog, Contact) is surfaced consistently
- **Footer navigation** - Reuses the same data module and now uses `<RouterLink>` for internal paths, so navigating from the footer no longer reloads the page or breaks Locomotive Scroll
- **Active link highlighting** - Exact matches add `nav-link-active` for clarity
- **Brand logo** - Clicking "India Bistro" returns to home page

### 3. Scroll Integration
- Locomotive Scroll is maintained across route changes
- Scroll position resets to top on navigation
- ScrollTrigger refreshes on route changes

## File Structure

```
src/
├── views/                    # Page components (Home, About, Menu, Reservations, Recipes, Contact, Blog, Gallery, Catering, NotFound)
├── router/
│   └── index.ts             # Router configuration + scrollBehavior
├── components/
│   ├── AppHeader.vue        # Sticky header navigation
│   └── AppFooter.vue        # Footer navigation (shares link data)
├── data/
│   └── navigation.ts        # Single source of truth for header/footer links
├── App.vue                  # RouterView, transitions, Locomotive Scroll wrapper
└── main.ts                  # App bootstrap + router/motion plugin
```

## Technical Details

### Router Configuration (`src/router/index.ts`)
- Uses `createWebHistory` for clean URLs
- Scroll behavior set to top on navigation
- Routes use dynamic `() => import('../views/Example.vue')` factories so each page becomes its own chunk and only loads when visited.

### Page Transitions (`App.vue`)
```vue
<Transition name="page" mode="out-in">
  <component :is="Component" :key="$route.path" />
</Transition>
```

CSS classes:
- `.page-enter-active` / `.page-leave-active` - Transition duration
- `.page-enter-from` - Initial state (opacity 0, translateY 20px)
- `.page-leave-to` - Exit state (opacity 0, translateY -20px)

### Navigation Components
- **AppHeader.vue** - Uses `<RouterLink>` with `exact-active-class="nav-link-active"` and consumes the shared navigation data
- **AppFooter.vue** - Mirrors the same data source, so footer links no longer perform hard reloads and stay in sync with the header

### Lazy Components (`src/utils/lazyComponent.ts`)
- Shared `createLazyComponent()` wraps `defineAsyncComponent` with retry + delay defaults and `suspensible: false`, so pages can lazy load heavy sections without adding `<Suspense>`.
- Example usage:
  ```ts
  import { createLazyComponent } from '@/utils/lazyComponent'

  const SliderSection = createLazyComponent(() => import('@/components/SliderSection.vue'))
  ```
- Home, About, Menu, Gallery, and Catering views now lazy load their hero/slider/bespoke sections, reducing the initial bundle while keeping Locomotive + GSAP working.

### Smooth Scroll Manager (`App.vue`)
- Locomotive Scroll now reads viewport/motion preferences before instantiating, so desktop, touch, and reduced-motion users get tuned `multiplier`/`lerp` values or native scrolling when requested.
- A shared `ResizeObserver`, throttled `scroll` listener, and `window` resize handler keep Locomotive + ScrollTrigger in sync without jank or manual reloads.
- Route changes rely on the existing `<Transition>` lifecycle instead of forced `window.location.reload`, which keeps navigation instant while still rebuilding the scroll instance when needed.
- Media query listeners trigger a scroll rebuild whenever users toggle reduced-motion or pointer preferences, ensuring settings take effect immediately.

### GSAP Utility (`src/utils/gsap.ts`)
- `useGsap()` guarantees `ScrollTrigger` is registered once and returns the shared `{ gsap, ScrollTrigger }` pair for any component that needs animations.
- Example usage:
  ```ts
  import { useGsap } from '@/utils/gsap'

  const { gsap, ScrollTrigger } = useGsap()
  ```
- Components such as `SliderSection`, `SliderSectionNoButton`, and `TextGenerateEffect` now consume this helper, so every animation automatically targets the `#main` scroller proxy configured in `App.vue`.

## Usage

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Notes

- The original `AppFooter.vue` file was too large (6.5MB) to edit, so `AppFooterSimple.vue` was created as a replacement
- All page components use the same design system (colors, fonts, spacing)
- Locomotive Scroll and GSAP ScrollTrigger work seamlessly with routing
- The app maintains its smooth scrolling experience across all pages

## Issues Fixed

### 1. Header Transform Matrix3D Issue
**Problem:** Header was getting `transform: matrix3d()` applied, causing it to translate downward.

**Solution:**
- Removed `data-scroll-sticky` from AppHeader
- Kept CSS `position: sticky` for native browser behavior
- No more transform conflicts

### 2. Content Not Scrolling (Overflow Hidden)
**Problem:** Nested `data-scroll-section` attributes broke Locomotive Scroll.

**Solution:**
- Removed `data-scroll-section` from all page components
- Added `data-scroll-section` to `<main>` wrapper only
- Proper scroll structure now works

### 3. SliderSection Going Blank
**Problem:** SliderSection disappeared when pinned at top due to header z-index overlap.

**Solution:**
- Added `z-index: 1` to SliderSection
- Changed pin start from `top top` to `top 100px` (below header)
- Section now stays visible when pinned

### 4. Pin Spacing Not Working
**Problem:** GSAP's `pinSpacing: true` doesn't work properly with Locomotive Scroll, causing layout jumps.

**Solution:**
- Changed `pinSpacing: true` to `pinSpacing: 'margin'` for Locomotive compatibility
- Added `onRefresh` callback to force Locomotive to update after pin changes
- This ensures smooth transitions without layout shifts

## Scroll Structure (Correct)

```
#main [data-scroll-container]
├── AppHeader (z-index: 60, CSS sticky)
├── <main data-scroll-section> (z-index: auto)
│   └── RouterView
│       └── Page content (no data-scroll-section)
│           └── SliderSection (z-index: 1, pins at 80px)
└── AppFooter [data-scroll-section]
```

## Key Principles

1. **One scroll container:** Only `#main` has `data-scroll-container`
2. **Top-level sections only:** Only direct children should have `data-scroll-section`
3. **No nested sections:** Components inside `<main>` should NOT have `data-scroll-section`
4. **Z-index layering:** Header (60) > Content (1) for proper stacking
5. **Pin offset:** Pin sections below header height to avoid overlap

## Future Enhancements

Consider adding:
- Lazy loading for routes
- Route guards for protected pages
- Meta tags for SEO
- 404 Not Found page
- Breadcrumb navigation
- Back to top button

## Codebase Maintenance

- Pruned unused presentation components (`GallerySection`, `HeroSection`, `MenuHighlight`, `SplashScreen`, `HelloWorld`, and `DragonIcon`) so Vite only bundles live sections.
- Removed redundant markdown files (`README.md`, `CLAUDE.md`, `PROJECT_DESCRIPTION.md`, `Newcomponent.md`) and centralized documentation here per project guidelines.
- Dropped unused packages (`@faker-js/faker`, `defu`, `i`) and ran `npm install` to sync `package-lock.json`; always rerun the install step after editing dependencies.
- Shared navigation copy lives in `src/data/navigation.ts`, keeping header/footer menus aligned and ensuring `<RouterLink>` is used everywhere for internal pages.
