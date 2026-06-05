# AURA | Premium Vodka Brand Experience

A performance-focused frontend showcase demonstrating immersive scroll-driven storytelling, parallax effects, and velocity-based visual distortions.

---

## Project Overview

This project was built as a creative frontend showcase to explore the limits of scroll-driven web experiences. Rather than focusing on business logic or database schemas, this repository serves as a demonstration of motion design, orchestration of animation timelines, and interactive visual storytelling. The goal was to build a premium, cinema-inspired brand landing page for "AURA" (a high-end Nordic vodka) that feels highly responsive, fluid, and visually polished without relying on heavy WebGL frameworks.

The showcase highlights skills in scroll synchronization, layout pinning, depth-of-field simulation, and viewport-velocity tracking to create a premium feel that mirrors physical product interaction.

---

## Features

* **Scroll-Driven Storytelling:** Section transitions, textual reveals, and visual states are mapped directly to user scroll progression.
* **GSAP Animations:** Core timelines are synchronized with the viewport using GSAP's ScrollTrigger, handling layout pinning and card transitions.
* **Framer Motion Interactions:** Physics-based micro-interactions and smooth UI state transitions designed for modern component architecture.
* **Responsive Design:** Adaptive layout breakpoints with dedicated mobile styles for layout and scroll mechanics.
* **Interactive Sections:** Clean user control schemes, including scroll-aware hover dynamics and responsive touch support.
* **Performance-Conscious Animation Architecture:** Selective rendering, capped filter updates, and scroll-ticker synchronization to maintain stable framerates.
* **Immersive Visual Experience:** Incorporates cinematic features like backdrop blur overlays, depth-of-field adjustments, and film grain noise.

---

## Tech Stack

* **Structure & Markup:** Semantic HTML5
* **Styling & Layout:** CSS3 (Custom properties, CSS Grid, Flexbox, backdrop-filter, SVG turbulence noise for film grain)
* **Animation & Motion:** GSAP (GreenSock Animation Platform) & ScrollTrigger
* **Smooth Scrolling:** Lenis (Studio Freight)
* **Interactive Physics (Concepts/Planned):** Framer Motion (for React-based component variations)

---

## Implementation Highlights

### 1. ScrollTrigger Orchestration & Ticker Synchronization
To avoid stutter and layout jitter, smooth scrolling via Lenis is tightly coupled with GSAP's scroll ticker. We sync the scroll events and disable default lag smoothing for high-precision updates:

```javascript
// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

### 2. Apple-Style Layout Pinning
In the product catalogue section, the central bottle graphic is pinned in the center of the viewport using `ScrollTrigger` while the background assets and description cards scroll past vertically. We orchestrate the staggered fade-ins and fade-outs of the card deck on a scrubbed timeline:

```javascript
ScrollTrigger.create({
    trigger: '.product-catalogue',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.pin-container',
});
```

### 3. Velocity-Based Lens Distortion ("Drunk Effect")
To mimic an immersive, sensory-rich experience, the landing page tracks scroll velocity in real-time. When the user scrolls rapidly, a blur filter is dynamically applied to background cards and typography. Once scrolling slows down, the blur smoothly decays back to zero:

```javascript
let blurProxy = { blur: 0 };
ScrollTrigger.create({
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        let velocity = Math.abs(self.getVelocity());
        let targetBlur = Math.min(velocity / 400, 8); // Capped at 8px to prevent GPU thrashing
        gsap.to(blurProxy, {
            blur: targetBlur,
            duration: 0.4, // Smooth decay over time
            onUpdate: () => {
                gsap.set(['.editorial-img-container', '.story-content', '.hero-text-container', '.catalogue-text-wrapper', '.footer-text'], { 
                    filter: `blur(${blurProxy.blur}px)` 
                });
            }
        });
    }
});
```

### 4. Parallax and Depth-of-Field Simulation
We use CSS overflow clipping combined with GSAP translations to move internal images slower than the viewport speed. As the user transitions from the Hero section to the Story section, the main bottle undergoes a simulated focal shift (increasing blur and dropping opacity) while a frosted overlay fades in behind it to create texture.

---

## What I Learned

### Technical Challenges & Solutions
* **CSS Filter Paint Overhead:** Applying real-time, velocity-based CSS `blur()` filters is computationally expensive. During initial testing, rapid scrolling caused noticeable frame drops. To solve this, the filter is applied selectively to layout containers rather than individual elements, and the maximum blur is strictly capped at `8px`. Caching layers and using a smooth GSAP tween for the velocity decay prevents erratic paint cycles and maintains a stable 60fps.
* **Mobile Viewport Jumps:** Pinned scroll containers behave inconsistently on mobile browsers due to the dynamic address bar showing/hiding. This was resolved by implementing flex-direction shifts in the CSS media queries for viewport sizes below `768px`, allowing cards to stack naturally without complex pinning calculations.

### Lessons Learned
* **Scroll Synchronization:** Relying on native browser scroll events for complex timelines introduces layout shift. Decoupling the scroll physics via Lenis and feeding that position directly to GSAP's rendering ticker is critical for a smooth user experience.
* **CSS Clip Paths:** Using standard geometry for clip-paths is an elegant way to hide and reveal text elements (like the sliding hero text) without requiring extra container wrappers or complex DOM manipulation.

### Future Scope
* **WebGL/Three.js Integration:** Replacing static 2D bottle images with a real 3D model would allow for interactive light reflections, refraction through glass, and organic fluid simulation based on scroll speed.
* **Full React Port:** Moving the current vanilla code to React/Next.js would enable cleaner component encapsulation and make it easier to implement Framer Motion for interactive micro-states (like the navigation menu and item selections).

---

## Other Projects

While this project focuses on frontend engineering and motion design, I also build backend-heavy applications involving business workflows, databases, inventory systems, and operational software.

PharmaCare ERP:  
[PharmaCare ERP](https://github.com/ishaanpadashetty/pharmacare-erp)
