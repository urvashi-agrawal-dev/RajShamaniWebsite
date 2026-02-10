/* RAJ SHAMANI - ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    initVideoAutoplay();
    initSocialAnimations();
});

function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-cta-secondary', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
    }, '-=0.6')
    .to('.scroll-indicator', {
        opacity: 0.7,
        duration: 0.6
    }, '-=0.3');
    
    // Video title animation with delay
    gsap.to('.video-content', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.impact-video-section',
            start: 'top 80%'
        }
    });
}

function initScrollAnimations() {
    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            }
        });
    });
    
    // Timeline items stagger
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            }
        });
    });
    
    // Quote block
    gsap.to('.quote-block', {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.quote-block',
            start: 'top 85%'
        }
    });
    
    // Figuring Out logo
    gsap.to('.figuring-out-logo', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.figuring-out-logo',
            start: 'top 80%'
        }
    });
    
    // Podcast cards
    gsap.utils.toArray('.podcast-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            }
        });
    });
    
    // About image
    gsap.fromTo('.about-image img', {
        opacity: 0,
        scale: 0.95
        }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%'
        }
    });
}

function initCounters() {
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        // Animate stat item appearance
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.impact-section',
                start: 'top 70%'
            }
        });
    });
    
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        
        gsap.fromTo(counter, {
            textContent: 0
        }, {
            textContent: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 0.1 },
            scrollTrigger: {
                trigger: '.impact-section',
                start: 'top 70%'
            },
            onUpdate: function() {
                const val = this.targets()[0].textContent;
                counter.textContent = Math.ceil(val * 10) / 10;
            }
        });
    });
}

function initVideoAutoplay() {
    const video = document.querySelector('.impact-video');
    
    if (video) {
        video.play().catch(() => {
            console.log('Video autoplay prevented, will play on scroll');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(err => console.log('Video play error:', err));
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(video);
        });
    }
}

function initSocialAnimations() {
    gsap.utils.toArray('.social-link').forEach((link, i) => {
        gsap.fromTo(link, {
            opacity: 0,
            scale: 0,
            rotation: -180
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: link,
                start: 'top 85%'
            }
        });
    });
}