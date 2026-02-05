/* RAJ SHAMANI - CINEMATIC ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initParallax();
});

function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8
    }, '-=0.3');
    
    gsap.to('.hero-image', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

function initScrollAnimations() {
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%'
            }
        });
    });
    
    gsap.utils.toArray('.yellow-accent').forEach(line => {
        gsap.fromTo(line, {
            scaleX: 0
        }, {
            scaleX: 1,
            duration: 1,
            scrollTrigger: {
                trigger: line,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.guest-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.episode-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.achievement-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            }
        });
    });
}

function initCounterAnimations() {
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        
        gsap.fromTo(counter, {
            textContent: 0
        }, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 0.1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%'
            },
            onUpdate: function() {
                counter.textContent = Math.ceil(this.targets()[0].textContent * 10) / 10;
            }
        });
    });
}

function initParallax() {
    gsap.utils.toArray('.about-image img, .forbes-image img').forEach(img => {
        gsap.to(img, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    gsap.to('.collab-bg img', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.collab-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}