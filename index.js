// ===================================
// Modern Portfolio - JavaScript
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100
});

// ===================================
// Typing Animation
// ===================================

const typingText = document.getElementById('typingText');
const phrases = [
    'CS Student',
    'DSA Enthusiast',
    'Java Developer',
    'Problem Solver',
    'Competitive Programmer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ===================================
// Sticky Navbar & Scroll Progress
// ===================================

const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    // Sticky navbar effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ===================================
// Mobile Navigation Toggle
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section');

function setActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



// ===================================
// Back to Top Button
// ===================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Particle Background Animation
// ===================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const size = Math.random() * 3 + 1;

        // Random animation duration
        const duration = Math.random() * 20 + 10;

        // Random delay
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
        `;

        particlesContainer.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 0.8;
        }
        90% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// Create particles on page load
createParticles();

// ===================================
// Form Submission Handler
// ===================================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Change button state to show loading
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Using Web3Forms API for reliable email forwarding
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: 'f90dec90-d503-4ef0-8236-ad8a22065c5b',
            name: name,
            email: email,
            subject: subject,
            message: message
        })
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        } else {
            console.error(response);
            alert(json.message || 'Error sending message. Please try again.');
        }
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
    })
    .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================

const heroSection = document.querySelector('.hero-section');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;

    if (heroSection && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================

const fadeElements = document.querySelectorAll('.about-card, .highlight-card, .project-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ===================================
// Preloader (Optional)
// ===================================

function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(99, 102, 241, 0.2);
            border-top-color: var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .preloader-content p {
            color: var(--text-secondary);
            font-size: 1rem;
        }
    `;

    document.head.appendChild(preloaderStyle);
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Uncomment to enable preloader
// showPreloader();

// ===================================
// Console Message
// ===================================

console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Keshav Verma', 'color: #8b5cf6; font-size: 14px;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #ec4899; font-size: 12px;');

// ===================================
// Performance Optimization
// ===================================

// Lazy load images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Easter Egg - Konami Code
// ===================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';

        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        console.log('%c🎉 You found the Easter Egg!', 'color: #10b981; font-size: 24px; font-weight: bold;');
    }
});
