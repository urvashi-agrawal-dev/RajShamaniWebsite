/* ===================================
   ADVANCED CINEMATIC ANIMATIONS
   Enhanced loading, transitions & effects
   =================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation Timeline
const tl = gsap.timeline();

// Advanced Loading Animation System
class AdvancedLoader {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.percentage = document.querySelector('.loader-percentage');
        this.progress = 0;
        this.init();
    }

    init() {
        this.animateProgress();
        this.animateSkeletons();
        
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            this.progress += Math.random() * 15;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(progressInterval);
                setTimeout(() => this.hideLoader(), 500);
            }
            if (this.percentage) {
                this.percentage.textContent = Math.floor(this.progress) + '%';
            }
        }, 100);
    }

    animateProgress() {
        // Animate the progress bar fill
        gsap.to('.loader-bar::after', {
            left: '100%',
            duration: 3,
            ease: 'power2.inOut'
        });
    }

    animateSkeletons() {
        // Stagger skeleton line animations
        gsap.fromTo('.skeleton-line', {
            opacity: 0,
            scaleX: 0
        }, {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            stagger: 0.2,
            delay: 2,
            ease: 'power2.out'
        });
    }

    hideLoader() {
        // Advanced loader exit animation
        const tl = gsap.timeline();
        
        tl.to('.loader-content', {
            y: -50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in'
        })
        .to('.loader-particles', {
            opacity: 0,
            scale: 1.2,
            duration: 0.4
        }, '-=0.3')
        .to('.loader', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                this.loader.style.display = 'none';
                document.body.classList.remove('loading');
                initAnimations();
            }
        });
    }
}

// Page Transition System
class PageTransitions {
    constructor() {
        this.transition = document.querySelector('.page-transition');
        this.init();
    }

    init() {
        // Add transition effects to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    return; // Skip for anchor links
                }
                e.preventDefault();
                this.triggerTransition(() => {
                    window.location.href = link.getAttribute('href');
                });
            });
        });
    }

    triggerTransition(callback) {
        this.transition.classList.add('active');
        
        setTimeout(() => {
            if (callback) callback();
        }, 600);
        
        setTimeout(() => {
            this.transition.classList.remove('active');
        }, 1200);
    }
}

// Enhanced Background Animations
class BackgroundAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createFloatingElements();
        this.animateGridOverlay();
        this.addParallaxEffects();
    }

    createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;

        // Create additional floating elements
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'float-element';
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 15 + 's';
            element.style.animationDuration = (12 + Math.random() * 8) + 's';
            container.appendChild(element);
        }
    }

    animateGridOverlay() {
        // Enhanced grid animation with GSAP
        gsap.to('.grid-overlay', {
            backgroundPosition: '100px 100px',
            duration: 20,
            ease: 'none',
            repeat: -1
        });
    }

    addParallaxEffects() {
        // Multi-layer parallax for hero section
        gsap.to('.hero-bg-image', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.floating-elements', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// Initialize loading system
window.addEventListener('load', () => {
    new AdvancedLoader();
});

// Initialize other systems immediately
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
    new BackgroundAnimations();
});

// Initialize all animations after loading
function initAnimations() {
    // Hero Section Animations
    heroAnimations();
    
    // Scroll-triggered animations
    scrollAnimations();
    
    // Interactive animations
    interactiveAnimations();
    
    // Counter animations
    counterAnimations();
    
    // Parallax effects
    parallaxEffects();
    
    // Advanced micro-interactions
    microInteractions();
}

// Enhanced Hero Section Animations
function heroAnimations() {
    const heroTl = gsap.timeline();
    
    // Initialize expressive text animation with enhanced effects
    setTimeout(() => {
        document.querySelectorAll('.expressive-text').forEach((text, index) => {
            text.classList.add('animate');
            
            // Add stagger delay between words
            gsap.to(text.querySelectorAll('.char'), {
                y: 0,
                rotationX: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: index * 0.3,
                ease: 'back.out(1.7)'
            });
        });
    }, 300);
    
    // Enhanced subtitle animation
    heroTl.to('.subtitle-line', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 1.8
    })
    .to('.hero-description', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.4')
    .to('.cta-btn', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .to('.scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.2');

    // Enhanced character hover effects
    document.querySelectorAll('.expressive-text').forEach(text => {
        text.addEventListener('mouseenter', () => {
            const chars = text.querySelectorAll('.char');
            gsap.to(chars, {
                y: -15,
                rotationX: 20,
                scale: 1.15,
                duration: 0.4,
                stagger: 0.03,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// Scroll-triggered animations
function scrollAnimations() {
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Podcast section animations
    gsap.fromTo('.podcast-description', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.podcast-content',
            start: 'top 70%'
        }
    });

    gsap.fromTo('.featured-episode', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.podcast-content',
            start: 'top 70%'
        }
    });

    // Episode cards stagger animation
    gsap.fromTo('.episode-card', {
        y: 80,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.episodes-grid',
            start: 'top 80%'
        }
    });

    // About section animations
    gsap.fromTo('.about-image', {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%'
        }
    });

    gsap.fromTo('.about-content', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%'
        }
    });

    // Philosophy quote animation
    gsap.fromTo('.philosophy-quote', {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.philosophy-quote',
            start: 'top 80%'
        }
    });

    // Achievement items animation
    gsap.fromTo('.achievement-item', {
        y: 60,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%'
        }
    });

    // Book section animations
    gsap.fromTo('.book-visual', {
        rotationY: -30,
        opacity: 0
    }, {
        rotationY: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.book-container',
            start: 'top 70%'
        }
    });

    gsap.fromTo('.book-content', {
        x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.book-container',
            start: 'top 70%'
        }
    });

    // Speaking topics animation
    gsap.fromTo('.topic-item', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.topics-list',
            start: 'top 80%'
        }
    });

    // Contact form animation
    gsap.fromTo('.contact-form', {
        y: 80,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        }
    });

    gsap.fromTo('.social-links', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 90%'
        }
    });
}

// Interactive animations
function interactiveAnimations() {
    // Button hover animations
    document.querySelectorAll('.cta-btn, .explore-btn, .book-cta, .speaking-cta, .form-submit').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Episode card hover animations
    document.querySelectorAll('.episode-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Achievement item hover animations
    document.querySelectorAll('.achievement-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -15,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Topic item hover animations
    document.querySelectorAll('.topic-item').forEach(topic => {
        topic.addEventListener('mouseenter', () => {
            gsap.to(topic, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        topic.addEventListener('mouseleave', () => {
            gsap.to(topic, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Book cover 3D hover effect
    const bookCover = document.querySelector('.book-cover');
    if (bookCover) {
        bookCover.addEventListener('mouseenter', () => {
            gsap.to(bookCover, {
                rotationY: -15,
                rotationX: 5,
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        bookCover.addEventListener('mouseleave', () => {
            gsap.to(bookCover, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
}

// Counter animations
function counterAnimations() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(counter, {
                    textContent: 0
                }, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    stagger: 0.2
                });

                gsap.fromTo(counter.parentElement, {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Parallax effects
function parallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Image parallax effects
    gsap.utils.toArray('.image-placeholder, .episode-image-placeholder').forEach(img => {
        gsap.to(img, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Text reveal animations
    gsap.utils.toArray('.large-text, .about-paragraph').forEach(text => {
        gsap.fromTo(text, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Navbar scroll effect
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: '.navbar' }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetSection,
                    offsetY: 100
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// Form submission animation
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    // Button loading animation
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            submitBtn.textContent = 'SENDING...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'SENT!';
                gsap.to(submitBtn, {
                    backgroundColor: '#4CAF50',
                    duration: 0.3
                });
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    gsap.to(submitBtn, {
                        backgroundColor: '#ff4444',
                        duration: 0.3
                    });
                    document.querySelector('.contact-form').reset();
                }, 2000);
            }, 1000);
        }
    });
});

// Mobile menu toggle animation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        gsap.fromTo('.nav-link', {
            x: 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Resize handler for responsive animations
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    gsap.globalTimeline.timeScale(1.5); // Speed up animations
}

// Preload critical animations
gsap.set(['.subtitle-line', '.hero-description', '.cta-btn'], {
    y: 50,
    opacity: 0
});

gsap.set('.scroll-indicator', {
    opacity: 0
});

// Set initial state for expressive text characters
gsap.set('.expressive-text .char', {
    y: 100,
    rotationX: 90,
    opacity: 0
});

// Add loading class to body
document.body.classList.add('loading');

// Remove loading class after animations are ready
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 2500);
});

// Advanced Micro-interactions
function microInteractions() {
    // Enhanced button hover effects
    document.querySelectorAll('.cta-btn, .explore-btn, .book-cta, .speaking-cta').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                y: -3,
                boxShadow: '0 10px 30px rgba(255, 68, 68, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                y: 0,
                boxShadow: '0 0 0 rgba(255, 68, 68, 0)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Episode card advanced hover effects
    document.querySelectorAll('.episode-card, .featured-episode').forEach(card => {
        const image = card.querySelector('.episode-bg-image');
        const overlay = card.querySelector('.episode-overlay, .episode-hover-overlay');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -12,
                rotationX: 5,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (image) {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
            
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                rotationX: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
            
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    });

    // Achievement items with enhanced effects
    document.querySelectorAll('.achievement-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -20,
                scale: 1.03,
                rotationY: 5,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Topic items with wave effect
    document.querySelectorAll('.topic-item').forEach((topic, index) => {
        topic.addEventListener('mouseenter', () => {
            gsap.to(topic, {
                y: -10,
                backgroundColor: 'rgba(255, 68, 68, 0.15)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Wave effect on neighboring items
            const siblings = [...topic.parentElement.children];
            siblings.forEach((sibling, siblingIndex) => {
                if (sibling !== topic) {
                    const distance = Math.abs(siblingIndex - index);
                    const delay = distance * 0.05;
                    const intensity = Math.max(0, 1 - distance * 0.3);
                    
                    gsap.to(sibling, {
                        y: -5 * intensity,
                        duration: 0.3,
                        delay: delay,
                        ease: 'power2.out'
                    });
                }
            });
        });

        topic.addEventListener('mouseleave', () => {
            gsap.to(topic, {
                y: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Reset siblings
            const siblings = [...topic.parentElement.children];
            siblings.forEach(sibling => {
                gsap.to(sibling, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    });
}

// Enhanced Scroll Animations with Intersection Observer
function scrollAnimations() {
    // Section titles with advanced reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 100,
            opacity: 0,
            rotationX: 90
        }, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Podcast content with stagger
    gsap.fromTo('.podcast-description', {
        x: -150,
        opacity: 0,
        rotationY: -15
    }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.podcast-content',
            start: 'top 75%'
        }
    });

    gsap.fromTo('.featured-episode', {
        x: 150,
        opacity: 0,
        rotationY: 15
    }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.podcast-content',
            start: 'top 75%'
        }
    });

    // Episode cards with enhanced stagger
    gsap.fromTo('.episode-card', {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            from: "start"
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.episodes-grid',
            start: 'top 80%'
        }
    });

    // About section with 3D effects
    gsap.fromTo('.about-image', {
        x: -150,
        opacity: 0,
        rotationY: -25
    }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%'
        }
    });

    gsap.fromTo('.about-content', {
        x: 150,
        opacity: 0,
        rotationY: 25
    }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-container',
            start: 'top 70%'
        }
    });

    // Philosophy quote with special effect
    gsap.fromTo('.philosophy-quote', {
        scale: 0.5,
        opacity: 0,
        rotationZ: -10
    }, {
        scale: 1,
        opacity: 1,
        rotationZ: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.8)',
        scrollTrigger: {
            trigger: '.philosophy-quote',
            start: 'top 85%'
        }
    });

    // Achievement items with wave animation
    gsap.fromTo('.achievement-item', {
        y: 80,
        opacity: 0,
        rotationX: 45
    }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: {
            amount: 0.8,
            from: "center"
        },
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 80%'
        }
    });

    // Book section with 3D book animation
    gsap.fromTo('.book-visual', {
        rotationY: -45,
        opacity: 0,
        scale: 0.8
    }, {
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.book-container',
            start: 'top 70%'
        }
    });

    gsap.fromTo('.book-content', {
        x: 120,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.book-container',
            start: 'top 70%'
        }
    });

    // Speaking topics with cascade effect
    gsap.fromTo('.topic-item', {
        y: 60,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: {
            amount: 0.4,
            grid: "auto",
            from: "start"
        },
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.topics-list',
            start: 'top 80%'
        }
    });

    // Contact form with slide-up effect
    gsap.fromTo('.contact-form', {
        y: 100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        }
    });

    gsap.fromTo('.social-links a', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 90%'
        }
    });
}

// Enhanced Counter Animations
function counterAnimations() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                // Enhanced counter with easing
                gsap.fromTo(counter, {
                    textContent: 0,
                    scale: 0.8,
                    opacity: 0
                }, {
                    textContent: target,
                    scale: 1,
                    opacity: 1,
                    duration: 2.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                });

                // Animate parent container
                gsap.fromTo(counter.parentElement, {
                    y: 40,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Enhanced Parallax Effects
function parallaxEffects() {
    // Multi-layer hero parallax
    gsap.to('.hero-bg-image', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.floating-elements', {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.grid-overlay', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Image parallax effects
    gsap.utils.toArray('.episode-bg-image, .about-bg-image').forEach(img => {
        gsap.to(img, {
            yPercent: -25,
            ease: 'none',
            scrollTrigger: {
                trigger: img.closest('.episode-card, .about-image'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Text reveal animations with clip-path
    gsap.utils.toArray('.large-text, .about-paragraph').forEach(text => {
        gsap.fromTo(text, {
            y: 60,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)'
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Preload critical animations with enhanced initial states
gsap.set(['.subtitle-line', '.hero-description', '.cta-btn'], {
    y: 60,
    opacity: 0,
    scale: 0.9
});

gsap.set('.scroll-indicator', {
    opacity: 0,
    y: 20
});

gsap.set('.expressive-text .char', {
    y: 100,
    rotationX: 90,
    opacity: 0,
    transformOrigin: '50% 50%'
});

// Add loading class to body
document.body.classList.add('loading');