/* ===================================
   MAIN JAVASCRIPT FUNCTIONALITY
   Core interactions and utilities
   =================================== */

// Custom cursor implementation - REMOVED for normal cursor experience
// Users prefer standard cursor behavior

// Smooth scrolling utility
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: offsetTop,
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }
}

new SmoothScroll();

// Intersection Observer for performance optimization
class LazyAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for lazy animation
        document.querySelectorAll('.episode-card, .achievement-item, .topic-item').forEach(el => {
            this.observer.observe(el);
        });
    }
}

new LazyAnimations();

// Audio/Video controls for podcast episodes
class MediaControls {
    constructor() {
        this.currentlyPlaying = null;
        this.init();
    }

    init() {
        // Add click handlers to play buttons
        document.querySelectorAll('.play-button, .episode-play').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePlayClick(btn);
            });
        });

        // Platform button handlers
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePlatformClick(btn);
            });
        });
    }

    handlePlayClick(button) {
        // Animate play button
        gsap.to(button, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Simulate play functionality
        const playIcon = button.querySelector('.play-icon') || button;
        const isPlaying = playIcon.textContent === '⏸';

        if (isPlaying) {
            playIcon.textContent = '▶';
            this.currentlyPlaying = null;
        } else {
            // Stop other playing episodes
            document.querySelectorAll('.play-icon').forEach(icon => {
                icon.textContent = '▶';
            });
            
            playIcon.textContent = '⏸';
            this.currentlyPlaying = button;
        }

        // Add visual feedback
        const episodeCard = button.closest('.episode-card, .featured-episode');
        if (episodeCard) {
            if (!isPlaying) {
                episodeCard.classList.add('playing');
            } else {
                episodeCard.classList.remove('playing');
            }
        }
    }

    handlePlatformClick(button) {
        // Animate platform button
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Simulate external link opening
        const platform = button.textContent.toLowerCase();
        console.log(`Opening ${platform} link...`);
        
        // Add temporary visual feedback
        const originalBg = button.style.backgroundColor;
        button.style.backgroundColor = button.classList.contains('youtube') ? '#ff0000' : '#1db954';
        
        setTimeout(() => {
            button.style.backgroundColor = originalBg;
        }, 200);
    }
}

new MediaControls();

// Form validation and enhancement
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Add real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearErrors(field));
        });

        // Enhanced form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing errors
        this.clearErrors(field);

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Apply validation styles
        if (!isValid) {
            field.style.borderColor = '#ff4444';
            this.showError(field, errorMessage);
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }

        return isValid;
    }

    clearErrors(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff4444;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            opacity: 0;
        `;
        
        field.parentNode.appendChild(errorElement);
        
        gsap.to(errorElement, {
            opacity: 1,
            duration: 0.3
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            // Shake form on error
            gsap.to(this.form, {
                x: -10,
                duration: 0.1,
                yoyo: true,
                repeat: 5,
                ease: 'power2.inOut'
            });
        }
    }

    submitForm() {
        const submitBtn = this.form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        // Disable form
        this.form.style.pointerEvents = 'none';
        submitBtn.textContent = 'SENDING...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE SENT!';
            gsap.to(submitBtn, {
                backgroundColor: '#4CAF50',
                duration: 0.3
            });
            
            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                this.form.style.pointerEvents = 'auto';
                submitBtn.textContent = originalText;
                gsap.to(submitBtn, {
                    backgroundColor: '#ff4444',
                    duration: 0.3
                });
                
                // Clear all field styles
                this.form.querySelectorAll('input, textarea').forEach(field => {
                    this.clearErrors(field);
                });
            }, 3000);
        }, 1500);
    }
}

new FormHandler();

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor scroll performance
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Reduce animations on slower devices
        this.optimizeForDevice();
    }

    updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / maxScroll;
        
        // Update any scroll-dependent elements
        document.documentElement.style.setProperty('--scroll-progress', progress);
    }

    optimizeForDevice() {
        // Detect device capabilities
        const isLowEnd = navigator.hardwareConcurrency < 4 || 
                        navigator.deviceMemory < 4 ||
                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEnd) {
            // Reduce animation complexity
            document.body.classList.add('low-performance');
            gsap.globalTimeline.timeScale(1.5);
        }
    }
}

// Image loading handler
class ImageLoader {
    constructor() {
        this.init();
    }

    init() {
        // Handle all images with loading states
        const images = document.querySelectorAll('.hero-bg-image, .episode-bg-image, .about-bg-image, .book-cover-img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                
                img.addEventListener('error', () => {
                    // Handle image load error
                    console.log(`Failed to load image: ${img.src}`);
                    img.style.display = 'none';
                });
            }
        });
    }
}

new ImageLoader();

new PerformanceMonitor();

// Keyboard navigation enhancement
class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    this.closeModals();
                    break;
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
            }
        });
    }

    closeModals() {
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    }

    handleTabNavigation(e) {
        // Enhance focus visibility for keyboard users
        document.body.classList.add('keyboard-navigation');
        
        // Remove class on mouse interaction
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        }, { once: true });
    }
}

new KeyboardNavigation();

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Generate random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
};

// Export utilities for use in other scripts
window.Utils = Utils;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Cinematic Raj Shamani Website Loaded');
    console.log('🚀 All systems ready for an immersive experience');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when tab becomes visible
        gsap.globalTimeline.resume();
    }
});
// Most Viewed Podcasts Carousel
class PodcastCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.currentIndex = 0;
        this.itemWidth = 320; // 300px + 20px gap
        this.maxIndex = 2; // 5 items - 3 visible = 2
        this.init();
    }

    init() {
        if (!this.track) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Auto-play carousel
        this.startAutoPlay();
        
        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        this.updateButtons();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.itemWidth;
        gsap.to(this.track, {
            x: translateX,
            duration: 0.6,
            ease: 'power2.out'
        });
        this.updateButtons();
    }

    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.maxIndex;
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.maxIndex) {
                this.next();
            } else {
                this.currentIndex = 0;
                this.updateCarousel();
            }
        }, 4000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Enhanced Content Animations
class ContentAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateOnScroll();
        this.addHoverEffects();
        this.enhanceButtons();
    }

    animateOnScroll() {
        // Animate most viewed section
        gsap.fromTo('.most-viewed-section', {
            y: 100,
            opacity: 0,
            scale: 0.9
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.most-viewed-section',
                start: 'top 80%'
            }
        });

        // Animate podcast highlights
        gsap.fromTo('.podcast-highlight', {
            y: 80,
            opacity: 0,
            rotationX: 45
        }, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.most-viewed-carousel',
                start: 'top 85%'
            }
        });
    }

    addHoverEffects() {
        // Enhanced podcast highlight hover effects
        document.querySelectorAll('.podcast-highlight').forEach(highlight => {
            highlight.addEventListener('mouseenter', () => {
                gsap.to(highlight, {
                    y: -15,
                    scale: 1.03,
                    rotationY: 5,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            highlight.addEventListener('mouseleave', () => {
                gsap.to(highlight, {
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    enhanceButtons() {
        // Add ripple effect to buttons
        document.querySelectorAll('.cta-btn, .explore-btn, .carousel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
            });
        });
    }
}

// Enhanced Text Animations
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateTextReveal();
        this.addTypewriterEffect();
    }

    animateTextReveal() {
        // Animate text blocks with clip-path
        gsap.utils.toArray('.large-text, .about-paragraph').forEach(text => {
            gsap.fromTo(text, {
                clipPath: 'inset(0 0 100% 0)',
                y: 50
            }, {
                clipPath: 'inset(0 0 0% 0)',
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%'
                }
            });
        });
    }

    addTypewriterEffect() {
        // Add typewriter effect to philosophy quote
        const quote = document.querySelector('.philosophy-quote blockquote');
        if (quote) {
            const text = quote.textContent;
            quote.textContent = '';
            
            ScrollTrigger.create({
                trigger: quote,
                start: 'top 80%',
                onEnter: () => {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        quote.textContent += text[i];
                        i++;
                        if (i >= text.length) {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }
            });
        }
    }
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    new PodcastCarousel();
    new ContentAnimations();
    new TextAnimations();
});

// Enhanced Performance Monitoring
class EnhancedPerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor FPS
        this.monitorFPS();
        
        // Optimize for device
        this.optimizeForDevice();
        
        // Handle visibility changes
        this.handleVisibilityChange();
    }

    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;
        
        const checkFPS = (currentTime) => {
            frames++;
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Reduce animations if FPS is low
                if (fps < 30) {
                    document.body.classList.add('low-fps');
                    gsap.globalTimeline.timeScale(1.5);
                } else {
                    document.body.classList.remove('low-fps');
                    gsap.globalTimeline.timeScale(1);
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }

    optimizeForDevice() {
        // Detect device capabilities
        const isLowEnd = navigator.hardwareConcurrency < 4 || 
                        navigator.deviceMemory < 4 ||
                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEnd) {
            document.body.classList.add('low-performance');
            // Reduce particle count
            document.querySelectorAll('.float-element').forEach((el, index) => {
                if (index > 5) el.remove();
            });
        }
    }

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                gsap.globalTimeline.pause();
            } else {
                gsap.globalTimeline.resume();
            }
        });
    }
}

new EnhancedPerformanceMonitor();