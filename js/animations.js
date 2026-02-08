/* RAJ SHAMANI - ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
});

function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
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
}

function initScrollAnimations() {
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%'
            }
        });
    });
    
    gsap.utils.toArray('.podcast-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 60,
            rotationY: -15
        }, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.social-link').forEach((link, i) => {
        gsap.fromTo(link, {
            opacity: 0,
            scale: 0,
            rotation: -180
        }, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: link,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.youtube-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: i === 0 ? -100 : 100,
            rotationY: i === 0 ? -20 : 20
        }, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            }
        });
    });
    
    gsap.utils.toArray('.recognition-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 30
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
}

function initCounters() {
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
                const val = this.targets()[0].textContent;
                counter.textContent = Math.ceil(val * 10) / 10;
            }
        });
    });
}