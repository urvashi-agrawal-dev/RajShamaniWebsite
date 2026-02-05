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
    
    gsap.utils.toArray('.podcast-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });
    
    gsap.utils.toArray('.social-link').forEach((link, i) => {
        gsap.fromTo(link, {
            opacity: 0,
            scale: 0.9
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: link,
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