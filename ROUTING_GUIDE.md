# India Bistro Vue - Routing & Scroll Implementation Guide

## Overview
This project includes Vue Router with animated page transitions and Locomotive Scroll integration. The app uses client-side routing with smooth scrolling effects.

## Routes Implemented

- **Home** (`/`) - Main landing page with hero, menu highlights, story, sliders, and gallery
- **Menu** (`/menu`) - Full menu with categorized dishes (Starters, Main Course, Vegetarian Specials)
- **Reservations** (`/reservations`) - Table reservation form with contact information
- **Recipes** (`/recipes`) - Traditional Indian recipes with ingredients and cooking details
- **Contact** (`/contact`) - Contact form and business information

## Key Features

### 1. Animated Page Transitions
- **Fade in/out effect** with vertical slide animation
- **Smooth transitions** between pages (0.4s duration)
- **No page reload** - all navigation happens client-side

### 2. Navigation
- **Header navigation** - Click on Menu, Reservations, Recipes, or Contact
- **Footer navigation** - Additional links in the footer
- **Active link highlighting** - Current page is visually indicated
- **Brand logo** - Clicking "India Bistro" returns to home page

### 3. Scroll Integration
- Locomotive Scroll is maintained across route changes
- Scroll position resets to top on navigation
- ScrollTrigger refreshes on route changes

## File Structure

```
src/
├── views/                    # Page components
│   ├── HomePage.vue         # Home page (all original sections)
│   ├── MenuPage.vue         # Menu listing page
│   ├── ReservationsPage.vue # Reservation form page
│   ├── RecipesPage.vue      # Recipes showcase page
│   └── ContactPage.vue      # Contact form page
├── router/
│   └── index.ts             # Router configuration
├── components/
│   ├── AppHeader.vue        # Updated with RouterLink navigation
│   └── AppFooterSimple.vue  # New footer with router links
├── App.vue                  # Updated with RouterView and transitions
└── main.ts                  # Updated to use router
```

## Technical Details

### Router Configuration (`src/router/index.ts`)
- Uses `createWebHistory` for clean URLs
- Scroll behavior set to top on navigation
- All routes use eager loading (not lazy loaded)

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
- **AppHeader.vue** - Uses `<RouterLink>` with `active-class="nav-link-active"`
- **AppFooterSimple.vue** - Simplified footer with router navigation

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
