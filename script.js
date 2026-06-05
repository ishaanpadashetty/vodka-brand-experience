// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Custom Cursor Removed

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// HERO SECTION ANIMATIONS
const heroTl = gsap.timeline();

heroTl.to('.split-text', {
    y: 0,
    opacity: 1,
    duration: 2.5,
    stagger: 0.4,
    ease: 'power3.inOut',
    delay: 0.5
})
.to('.hero-bottle', {
    opacity: 1,
    duration: 3,
    ease: 'power2.inOut'
}, "-=2.0");

// Parallax for Hero Bottle
gsap.to('.hero-bottle', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// STORY SECTION ANIMATIONS
gsap.fromTo('.reveal-text', 
    { opacity: 0, y: 30 },
    {
        opacity: 1, 
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.story-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    }
);

// PRODUCT CATALOGUE (APPLE-STYLE PINNING)
ScrollTrigger.create({
    trigger: '.product-catalogue',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.pin-container',
});

// Timeline for the text blocks fading in and out
const blocksTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.product-catalogue',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    }
});

// 3 Blocks. Each has its own fraction of scroll distance.
// Block 1
blocksTl.fromTo('#block-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.inOut' })
        .to('#block-1', { opacity: 0, y: -20, duration: 2, ease: 'power2.inOut' }, "+=2")

// Block 2
blocksTl.fromTo('#block-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.inOut' }, "-=1")
        .to('#block-2', { opacity: 0, y: -20, duration: 2, ease: 'power2.inOut' }, "+=2")

// Block 3
blocksTl.fromTo('#block-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.inOut' }, "-=1")
        .to('#block-3', { opacity: 1, y: 0, duration: 2 }); // Stay visible

// Removed gimmicky bottle rotation on scroll

// FOOTER ANIMATION
gsap.to('.footer-text', {
    opacity: 1,
    y: -30,
    duration: 1,
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
    }
});

// CINEMATIC SENSORY EFFECTS (Phase 3)

// Cinematic Focus Shift (Depth of Field) on Hero Bottle
gsap.to('.hero-bottle', {
    filter: 'blur(10px)',
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
        trigger: '.story',
        start: 'top bottom',
        end: 'top center',
        scrub: true
    }
});

// Frost Condensation Effect in Story Section
gsap.to('.frost-overlay', {
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: '.story',
        start: 'top 80%',
        end: 'top center',
        scrub: true
    }
});

// EDITORIAL IMAGE PARALLAX
const parallaxImages = document.querySelectorAll('.parallax-img .editorial-img');
parallaxImages.forEach(img => {
    gsap.to(img, {
        yPercent: 20, // Move the image inside its hidden-overflow container
        ease: 'none',
        scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// "DRUNK EFFECT" - VELOCITY LENS BREATHING
let blurProxy = { blur: 0 };
ScrollTrigger.create({
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
        let velocity = Math.abs(self.getVelocity());
        let targetBlur = Math.min(velocity / 400, 8); // Cap at 8px
        gsap.to(blurProxy, {
            blur: targetBlur,
            duration: 0.4, // Smooth decay
            onUpdate: () => {
                // Apply blur selectively so the main bottle stays somewhat sharp
                gsap.set(['.editorial-img-container', '.story-content', '.hero-text-container', '.catalogue-text-wrapper', '.footer-text'], { 
                    filter: `blur(${blurProxy.blur}px)` 
                });
            }
        });
    }
});
