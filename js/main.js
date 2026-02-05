/* RAJ SHAMANI - MAIN FUNCTIONALITY */

let isMenuOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initScrollIndicator();
    console.log('Raj Shamani Website Loaded Successfully!');
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
}

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.authority-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
            scrollIndicator.style.opacity = opacity;
        });
    }
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}