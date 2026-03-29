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
    
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
});

// ===================================
// Custom Toast System
// ===================================

function showToast(title, message, type = 'info', duration = 5000) {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconMap[type] || iconMap.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Progress bar animation
    const progress = toast.querySelector('.toast-progress');
    progress.style.transitionDuration = `${duration}ms`;
    progress.style.transform = 'scaleX(0)';

    // Individual close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    // Auto remove
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);

    function removeToast(el) {
        clearTimeout(timeout);
        el.classList.remove('show');
        el.addEventListener('transitionend', () => {
            el.remove();
        }, { once: true });
    }
}

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
const formInputs = document.getElementById('form-inputs');
const otpSection = document.getElementById('otp-section');
const otpEmailDisplay = document.getElementById('otp-email-display');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const cancelOtpBtn = document.getElementById('cancelOtpBtn');
const otpInput = document.getElementById('otp-input');

let generatedOTP = null;
let currentFormData = null;

async function sendOTP(email, name) {
    try {
        // --- OTP GENERATION & SENDING VIA EMAILJS ---
        // 1. Generate 6-digit OTP and expiry time
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 15 * 60000).toLocaleTimeString();
        
        // Debugging (Remove in Production)
        console.log(`%c[DEBUG] Generated OTP: ${generatedOTP}`, 'color: #ec4899; font-weight: bold;');
        
        // 2. Send OTP to the user's email using EmailJS
        const EMAILJS_SERVICE_ID = 'service_lpr6jjg'; 
        const EMAILJS_TEMPLATE_ID = 'template_p9kbpku'; 
        const EMAILJS_PUBLIC_KEY = 'Hk0hjpSAekyVTjmJE'; 
        
        if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
            const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_PUBLIC_KEY,
                    template_params: {
                        to_email: email,
                        to_name: name,
                        passcode: generatedOTP,
                        time: expiryTime
                    }
                })
            });

            if (!emailjsResponse.ok) {
                const errorText = await emailjsResponse.text();
                console.error("EmailJS Error Response:", errorText);
                throw new Error(`EmailJS Error: ${errorText}`);
            }
        }
        
        return true;
    } catch (error) {
        showToast('System Error', `Failed to send code: ${error.message}`, 'error');
        console.error('OTP Error:', error);
        return false;
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('mainSubmitBtn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Change button state to show loading
    submitBtn.innerHTML = '<span>Sending OTP...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    // Get form data
    currentFormData = new FormData(contactForm);
    const email = currentFormData.get('email');
    const name = currentFormData.get('name');

    // Send the OTP using the refactored function
    const success = await sendOTP(email, name);
    
    if (success) {
        // Hide form inputs, show OTP section
        formInputs.style.display = 'none';
        otpSection.style.display = 'block';
        otpEmailDisplay.textContent = email;
        showToast('Code Sent!', `We've sent a verification code to ${email}`, 'info');
    }

    // Restore main button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.style.opacity = '1';
    submitBtn.disabled = false;
});

// Resend OTP Link Handler
const resendOtpBtn = document.getElementById('resendOtpBtn');

resendOtpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!currentFormData) return;
    
    const email = currentFormData.get('email');
    const name = currentFormData.get('name');
    
    resendOtpBtn.style.opacity = '0.5';
    resendOtpBtn.style.pointerEvents = 'none';
    resendOtpBtn.textContent = 'Resending...';
    
    const success = await sendOTP(email, name);
    
    if (success) {
        showToast('Resent!', 'A new code has been sent to your email.', 'success');
        otpInput.value = '';
    }
    
    resendOtpBtn.style.opacity = '1';
    resendOtpBtn.style.pointerEvents = 'auto';
    resendOtpBtn.textContent = 'Resend OTP';
});

// Cancel OTP verification
cancelOtpBtn.addEventListener('click', () => {
    otpSection.style.display = 'none';
    formInputs.style.display = 'block';
    otpInput.value = '';
    generatedOTP = null;
});

// Verify OTP and send message securely
verifyOtpBtn.addEventListener('click', async () => {
    // 1. Force string type and strip ALL non-numeric characters for comparison
    const enteredOTP = otpInput.value.toString().replace(/\D/g, '').trim();
    const expectedOTP = generatedOTP ? generatedOTP.toString().replace(/\D/g, '').trim() : '';
    
    // Debugging (Remove in Production)
    console.log(`%c[DEBUG] Comparison: Entered[${enteredOTP}] vs Expected[${expectedOTP}]`, 'color: #8b5cf6;');
    
    if (!expectedOTP) {
        showToast('Error', 'No verification code found. Please resend.', 'error');
        return;
    }
    
    if (enteredOTP !== expectedOTP) {
        showToast('Verification Failed', 'The OTP code is incorrect. Please try again.', 'error');
        return;
    }

    const originalBtnText = verifyOtpBtn.innerHTML;
    verifyOtpBtn.innerHTML = '<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>';
    verifyOtpBtn.style.opacity = '0.7';
    verifyOtpBtn.disabled = true;

    try {
        // Using Web3Forms API for final email forwarding
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: 'f90dec90-d503-4ef0-8236-ad8a22065c5b',
                name: currentFormData.get('name'),
                email: currentFormData.get('email'),
                subject: currentFormData.get('subject'),
                message: currentFormData.get('message')
            })
        });
        
        const json = await response.json();
        if (response.status == 200) {
            showToast('Success!', `Thanks ${currentFormData.get('name')}, your message has been sent successfully.`, 'success');
            contactForm.reset();
            otpSection.style.display = 'none';
            formInputs.style.display = 'block';
            otpInput.value = '';
        } else {
            console.error(response);
            showToast('Submission Error', json.message || 'Error sending message. Please try again.', 'error');
        }
    } catch (error) {
        showToast('Connection Error', 'Failed to connect to the server. Please try again later.', 'error');
        console.error('Error:', error);
    } finally {
        verifyOtpBtn.innerHTML = originalBtnText;
        verifyOtpBtn.style.opacity = '1';
        verifyOtpBtn.disabled = false;
    }
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
