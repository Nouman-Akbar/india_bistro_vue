# India Bistro Vue

This is a web application for a restaurant named "India Bistro", built with Vue.js.

It features a gallery, menu highlights, and other sections to showcase the restaurant.

## Animation Inspiration Notes

- **Heading reveal sequencing**
  - Tag headings you want animated with a shared hook such as `data-animate="headline"`, then pass those nodes into GSAP's `SplitText` to break them into lines, words, and characters.
  - Build a `gsap.timeline` for each heading and wrap it in a `ScrollTrigger` (`start: 'top 85%'`, `end: 'bottom 15%'`, `toggleActions: 'play reverse play reverse'`) so the reveal only runs when the section scrolls into view.
  - Animate characters from `y: 200` with `autoAlpha: 0`, `ease: 'circ.out'`, and a tight `stagger` (≈0.03s). Optionally read per-heading attributes like `data-delay` or `data-stagger` to customize timings, and set `perspective` on the container for subtle depth.
  - For a reveal variant (like `tp_reveal_anim`), split the element into lines/words/characters, store the `SplitText` instance on the element, and read optional configuration attributes (`data-duration`, `data-delay`, `data-stagger`, `data-on-scroll`). When `data-on-scroll` is `1`, attach a `ScrollTrigger` to play the character tween on entry; otherwise, run the same tween immediately for load-in reveals.
  - To reproduce the character cascade effect (similar to `tp-char-animation`), initialize `SplitText` with chars/words, set the container perspective, and drive a timeline that offsets each character on the x-axis (e.g., `x: 100`, `autoAlpha: 0`) before easing them into place with a stagger. Trigger this timeline on scroll (`start: 'top 90%'`, `toggleActions: 'play none none none'`) so headings animate once as they appear.
  - For multi-line headers (akin to `tp_title_anim`), split into words and lines, animate each line upward from `yPercent: 120` with a slight skew, and stagger by line. Use `ScrollTrigger` to start near the viewport bottom so longer headings reveal cleanly.

- **Text inversion marquee**
  - Split scroll-reactive phrases (e.g., `data-animate="invert"`) into lines and animate each line's `backgroundPositionX` from its masked offset to zero with a scrubbing `ScrollTrigger`. This ties the gradient sweep directly to scroll progress.

- **Pinned horizontal sliders**
  - Wrap card rows you want to scroll horizontally in a container (e.g., `data-animate="horizontal-slider"`). Measure the combined card width, set the wrapper height to `window.innerHeight`, and tween the row's `x` position from `0` to `-totalWidth + innerWidth`.
  - A `ScrollTrigger` with `pin: true`, `scrub: 1`, and an `end` calculated from the row width will pin the section while vertical scroll advances the horizontal motion. You can feed this master tween into nested `ScrollTrigger`s via `containerAnimation` to animate individual cards as they come into view.

- **Pinned project panels slider**
  - Structure the section with an outer wrapper (`data-animate="project-panels"`) that contains a `.panels-container` flex row of `.panel` items. Before animating, set both the wrapper and each panel to `height: window.innerHeight` so the track fills the viewport.
  - Compute the total width of all panels (`panels.forEach(width += panel.offsetWidth)`) and apply it to the container. Then create a GSAP tween `gsap.to(panels, { x: -totalWidth + innerWidth, ease: 'none', scrollTrigger: { trigger: panelsContainer, pin: true, start: 'top 140', scrub: 1, end: () => '+=' + (panelsContainer.offsetWidth - innerWidth) } })` so vertical scroll drives horizontal motion while the section is pinned.
  - For responsive control, wrap the initialization in `gsap.matchMedia().add('(min-width: 1200px)', () => { ... })` and tear it down on smaller viewports. Optionally create secondary `ScrollTrigger` instances that use `containerAnimation` to stagger in captions or adjust margins of individual cards as the horizontal track advances.

- **Stacked storytelling panels**
  - For vertical stacks, give each panel a hook like `data-animate="pinned-panel"` and create `ScrollTrigger` instances that pin each panel from `start: 'top top'` to `end: 'bottom 100%'` with `pinSpacing: false`, producing the layered reveal effect.

- **Image reveal strips**
  - Wrap feature images in a mask element (`data-animate="image-reveal"`). Animate the mask from `xPercent: -100` while the inner `img` counter-animates from `xPercent: 100` and `scale: 1.5` back to `1` for a parallax-style uncover.

- **Parallax image clusters**
  - Give each image in a cluster a `data-speed` attribute and register them with a scroll listener (GSAP `ScrollTrigger` or custom Locomotive Scroll). On scroll update, translate each image on the y-axis by `(scrollY * speedMultiplier)` so they move at different rates, creating depth. Reset transforms on resize to avoid drift.

- **Pinned service banner**
  - Pin a full-width media block by placing it inside a fixed-height wrapper (`height: 100vh`) and using `ScrollTrigger.create({ trigger, pin: true, start: 'top top', end: 'bottom top', scrub: true })` so the image remains fixed while surrounding content scrolls.
  - Apply a slight parallax drift by tweening the image’s `yPercent` as the scroll progresses (e.g., `gsap.to(image, { yPercent: 20, scrollTrigger: { scrub: true } })`). When using smooth scrolling libraries, sync the trigger with their update callbacks.

- **Award headline drift + hover parallax**
  - For headline pairs, set initial `x` offsets with `gsap.set('.award-title-1', { x: '10%' })` and `gsap.set('.award-title-2', { x: '-10%' })`, then run `gsap.timeline({ scrollTrigger: { trigger: '.award-section', start: 'top 100%', end: 'bottom 20%', scrub: true } }).to('.award-title-1', { x: '-15%' }).to('.award-title-2', { x: '15%' }, '<')` so the words glide toward and past center as the user scrolls.
  - Register a section-level `ScrollTrigger` that toggles an `.is-active` class on list wrappers (e.g., `.award-wrapper`) to coordinate other style changes when the block enters the viewport.
  - For the circular hover button, reuse the template’s pointer parallax: on `mouseenter`, track mouse position relative to the button and animate an inner element (`.tp-btn-circle-dot`) with `gsap.to` to follow the cursor; on `mouseleave`, tween it back to center. This delivers the soft parallax response when hovering and exiting the call-to-action.

- **Smooth vertical page scroll**
  - Wrap the entire layout with `#smooth-wrapper` and place the scrollable content inside `#smooth-content`. Initialize GSAP’s `ScrollSmoother` (`ScrollSmoother.create({ smooth: 2, effects: true, smoothTouch: 0.1, normalizeScroll: false, ignoreMobileResize: true })`) to interpolate wheel/trackpad input, producing the luxury, eased scroll feel.
  - Register `ScrollTrigger`, `ScrollSmoother`, and companion plugins (`TweenMax`, `ScrollToPlugin`) before creating timelines. With `effects: true`, any element carrying `data-speed` will receive automatic parallax offsets, so headings and imagery glide subtly against the main scroll.
  - Keep a fallback code path (e.g., disable smooth wrapper on touch devices) and refresh `ScrollTrigger` after dynamic content loads to keep pinning and parallax in sync with the smoothed scroll position.

- **Continuous marquees and auto sliders**
  - Instantiate Swiper (or GSAP ticker) on repeated logo or card rails marked with `data-animate="marquee"`, using options like `loop: true`, `allowTouchMove: false`, `speed: 2000`, and `autoplay: { delay: 1 }` so the track moves continuously. Adjust `slidesPerView` at breakpoints to keep the lane filled on large screens.

- **Hover title – image banner slider**
  - Structure the slider with a background image stack (`id="banner-bg-box"`) containing layered `<img>` elements, each tagged with a unique class. In the title list, store the matching class name in a `rel` attribute for each list item.
  - Bind a `mouseenter` handler on the list items that removes the `active` class from siblings, sets it on the hovered item, and updates the background container by replacing its class list with the `rel` value. CSS uses those classes to reveal the corresponding image (e.g., via `opacity` or `z-index`).
  - Ensure the container starts with one item marked active so the correct image is visible on load. Optionally debounce mouse events for touch support or convert the same logic to `focus`/`click` handlers to keep it accessible.

- **Looping CTA text effects**
  - Split CTA or footer headlines into characters (`data-animate="cta"`), then run a repeating timeline that compresses (`scaleY`), pops upward (`yPercent: -20`, `ease: 'elastic'`), cycles color via a gradient mapping (e.g., using `chroma.js`), and resets to neutral. Pair with a one-time opacity fade-in to avoid popping in abruptly.

- **Hero depth and gallery parallax**
  - On load, scale hero backgrounds (`data-animate="hero-bg"`) from `1.3` to `1` for a smooth settle. For galleries, alternate row directions by computing start/end `x` offsets and binding them to scroll with `scrub` timelines so adjacent rows travel opposite ways as the user scrolls.