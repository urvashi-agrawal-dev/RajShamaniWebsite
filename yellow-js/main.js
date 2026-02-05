/* RAJ SHAMANI - YELLOW BRAND WEBSITE - Main JavaScript */

let isMenuOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFormHandling();
    initMobileMenu();
    console.log('Yellow Brand Website Loaded Successfully!');
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
                targetSection.scrollIntoView({ behavior: 'smooth' });
                if (isMenuOpen) toggleMobileMenu();
            }
        });
    });
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
    }
}

function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = e.target.querySelector('.form-submit');
            submitButton.querySelector('span').textContent = 'SENDING...';
            
            setTimeout(() => {
                submitButton.querySelector('span').textContent = 'MESSAGE SENT!';
                setTimeout(() => {
                    e.target.reset();
                    submitButton.querySelector('span').textContent = 'SEND MESSAGE';
                }, 2000);
            }, 1500);
        });
    }
}
