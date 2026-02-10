// ===================================
// Dark Mode Toggle
// ===================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// ===================================
// Scroll Progress Indicator
// ===================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// ===================================
// Back to Top Button
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Animated Counter for Stats
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// ===================================
// Intersection Observer for Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate stats when visible
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for reveal animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});

// ===================================
// FAQ Accordion
// ===================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===================================
// Testimonials Carousel
// ===================================
const testimonialsTrack = document.getElementById('testimonialsTrack');
if (testimonialsTrack) {
    const cards = Array.from(testimonialsTrack.children);

    // Clone cards for infinite effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialsTrack.appendChild(clone);
    });

    let position = 0;
    const speed = 0.5; // Adjusted speed for better readability

    function animateCarousel() {
        position -= speed;

        // Reset position when half the track (the original set) has passed
        const trackWidth = testimonialsTrack.scrollWidth / 2;
        if (Math.abs(position) >= trackWidth) {
            position = 0;
        }

        testimonialsTrack.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateCarousel);
    }

    // Start animation
    animateCarousel();
}

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            submitBtn.textContent = '✓ Mensaje Enviado';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            // Show success alert
            showNotification('¡Gracias por su consulta! Nos pondremos en contacto con usted pronto.', 'success');
        }, 1500);
    });
}

// ===================================
// Form Validation
// ===================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(220, 53, 69)') {
            input.style.borderColor = '';
        }
    });
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #c82333)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===================================
// Natural Scroll Effect for Hero
// ===================================
// The hero now scrolls naturally with the page flow.
// We add a very subtle fade out as the user scrolls down for a professional feel.
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - scrolled / 600);
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===================================
// Add Hover Effect to Cards
// ===================================
const cards = document.querySelectorAll('.area-card, .testimonial-card, .credential-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Enhanced Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.area-card, .testimonial-card, .credential-item, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ===================================
// Accessibility Enhancements
// ===================================
// Add keyboard navigation for FAQ
faqQuestions.forEach((question, index) => {
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }

        // Arrow key navigation
        if (e.key === 'ArrowDown' && index < faqQuestions.length - 1) {
            e.preventDefault();
            faqQuestions[index + 1].focus();
        }

        if (e.key === 'ArrowUp' && index > 0) {
            e.preventDefault();
            faqQuestions[index - 1].focus();
        }
    });
});

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any load-dependent animations
    document.body.classList.add('loaded');

    // Trigger any initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});
