/* ===================================
   RAJ SHAMANI - YELLOW BRAND WEBSITE
   GSAP Animation System
   =================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation Configuration
const animConfig = {
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.1
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initCounterAnimations();
    initHoverAnimations();
});

/* ===================================
   HERO SECTION ANIMATIONS
   =================================== */
function initHeroAnimations() {
    // Hero title words animation
    const titleWords = document.querySelectorAll('.title-word');
    const subtitleItems = document.querySelectorAll('.subtitle-item');
    const heroTagline = document.querySelector('.hero-tagline');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Set initial states
    gsap.set([titleWords, subtitleItems, heroTagline, scrollIndicator], {
        opacity: 0,
        y: 100
    });

    // Create hero timeline
    const heroTl = gsap.timeline({ delay: 0.5 });

    // Animate title words with stagger
    heroTl.to(titleWords, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
    })
    // Animate subtitle items
    .to(subtitleItems, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
    }, "-=0.8")
    // Animate tagline
    .to(heroTagline, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5")
    // Animate scroll indicator
    .to(scrollIndicator, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3");

    // Hero image parallax on scroll
    gsap.to('.hero-image', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

/* ===================================
   SCROLL-TRIGGERED ANIMATIONS
   =================================== */
function initScrollAnimations() {
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Yellow lines animation
    gsap.utils.toArray('.yellow-line').forEach(line => {
        gsap.fromTo(line, {
            scaleX: 0
        }, {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: line,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Episode cards animation
    gsap.utils.toArray('.episode-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // About section content animation
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        gsap.fromTo('.about-paragraph', {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: aboutContent,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Quote highlight animation
        gsap.fromTo('.quote-highlight', {
            opacity: 0,
            scale: 0.95
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.quote-highlight',
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Achievement cards animation
    gsap.utils.toArray('.achievement-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40,
            rotationY: -15
        }, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Forbes feature animation
    const forbesFeature = document.querySelector('.forbes-feature');
    if (forbesFeature) {
        gsap.fromTo('.forbes-cover', {
            opacity: 0,
            x: -100,
            rotationY: -15
        }, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: forbesFeature,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo('.forbes-content', {
            opacity: 0,
            x: 100
        }, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: forbesFeature,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Book section animation
    const bookCover = document.querySelector('.book-cover');
    if (bookCover) {
        gsap.fromTo(bookCover, {
            opacity: 0,
            x: -100,
            rotationY: -25
        }, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: bookCover,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Topic items animation
    gsap.utils.toArray('.topic-item').forEach((item, index) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Form animation
    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.fromTo(group, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: group,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

/* ===================================
   PARALLAX EFFECTS
   =================================== */
function initParallaxEffects() {
    // About image parallax
    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
        gsap.to(aboutImg, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: '.about-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Speaking background parallax
    const speakingImg = document.querySelector('.speaking-img');
    if (speakingImg) {
        gsap.to(speakingImg, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: '.speaking-section',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Book glow effect on scroll
    const bookGlow = document.querySelector('.book-glow');
    if (bookGlow) {
        gsap.to(bookGlow, {
            scale: 1.2,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
                trigger: '.book-section',
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });
    }
}

/* ===================================
   COUNTER ANIMATIONS
   =================================== */
function initCounterAnimations() {
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.fromTo(counter, {
            textContent: 0
        }, {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

/* ===================================
   HOVER ANIMATIONS
   =================================== */
function initHoverAnimations() {
    // Episode card hover effects
    gsap.utils.toArray('.episode-card').forEach(card => {
        const image = card.querySelector('.episode-image img');
        const overlay = card.querySelector('.episode-overlay');
        const playButton = card.querySelector('.play-button');

        card.addEventListener('mouseenter', () => {
            gsap.to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" });
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
            gsap.to(playButton, { scale: 1.1, rotation: 360, duration: 0.5, ease: "back.out(1.7)" });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, { scale: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
            gsap.to(playButton, { scale: 1, rotation: 0, duration: 0.3 });
        });
    });

    // CTA button hover effects
    gsap.utils.toArray('.cta-button').forEach(button => {
        const glow = button.querySelector('.button-glow');
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, { y: -3, duration: 0.3, ease: "power2.out" });
            gsap.to(glow, { 
                width: 300, 
                height: 300, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, { y: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(glow, { 
                width: 0, 
                height: 0, 
                duration: 0.3 
            });
        });
    });

    // Achievement card hover effects
    gsap.utils.toArray('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                y: -10, 
                scale: 1.02,
                duration: 0.3, 
                ease: "power2.out" 
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                scale: 1,
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });

    // Social link hover effects
    gsap.utils.toArray('.social-link').forEach(link => {
        const underline = link.querySelector('.link-underline');
        
        link.addEventListener('mouseenter', () => {
            gsap.to(underline, { width: '100%', duration: 0.3, ease: "power2.out" });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(underline, { width: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Logo item hover effects
    gsap.utils.toArray('.logo-item').forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, { 
                y: -5, 
                color: '#FFD700',
                duration: 0.3, 
                ease: "power2.out" 
            });
        });

        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, { 
                y: 0, 
                color: 'rgba(255, 255, 255, 0.5)',
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });

    // Topic item hover effects
    gsap.utils.toArray('.topic-item').forEach(topic => {
        topic.addEventListener('mouseenter', () => {
            gsap.to(topic, { 
                y: -5, 
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                borderColor: '#FFD700',
                duration: 0.3, 
                ease: "power2.out" 
            });
        });

        topic.addEventListener('mouseleave', () => {
            gsap.to(topic, { 
                y: 0, 
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderColor: 'rgba(255, 215, 0, 0.3)',
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });
}

/* ===================================
   LOADING ANIMATION
   =================================== */
function initLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">RAJ SHAMANI</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Animate loading
    const loadingTl = gsap.timeline();
    
    loadingTl.to('.loading-progress', {
        width: '100%',
        duration: 2,
        ease: "power2.inOut"
    })
    .to('.loading-overlay', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingOverlay.remove();
        }
    });
}

/* ===================================
   SMOOTH SCROLL IMPLEMENTATION
   =================================== */
function initSmoothScroll() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: target,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', initSmoothScroll);

/* ===================================
   PERFORMANCE OPTIMIZATIONS
   =================================== */

// Throttle scroll events for better performance
let ticking = false;

function updateAnimations() {
    // Update any scroll-dependent animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);