// Global variables
let isThemeTransitioning = false;
let typingIndex = 0;
let typingText = '';
const typingTexts = [
    'Frontend Developer',
    'AI Enthusiast', 
    'Problem Solver',
    'Tech Innovator'
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeCursor();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeStatsAnimation();
    initializeNavigation();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    if (isThemeTransitioning) return;
    
    isThemeTransitioning = true;
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class
    body.style.transition = 'all 0.3s ease';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    setTimeout(() => {
        body.style.transition = '';
        isThemeTransitioning = false;
    }, 300);
}

// Custom Cursor
function initializeCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .text-block, .skill-category, .project-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Stats Animation
function initializeStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    });
    
    if (stats.length > 0) {
        observer.observe(stats[0].closest('.stats-section'));
    }
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                stat.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
            }, 40);
        });
    }
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span class="btn-text">Sending...</span>
            <div class="btn-icon">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        `;
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validate
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            resetSubmitButton();
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            resetSubmitButton();
            return;
        }
        
        // Simulate sending (replace with actual endpoint)
        setTimeout(() => {
            form.reset();
            resetSubmitButton();
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
        }, 2000);
        
        function resetSubmitButton() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        maxWidth: '400px',
        padding: '16px 20px',
        borderRadius: '12px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 
                   type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                   'rgba(99, 102, 241, 0.1)',
        color: 'var(--text-primary)',
        animation: 'slideInRight 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Resume Download
function downloadResume() {
    const link = document.createElement('a');
    link.href = './MyResume.pdf';
    link.download = 'Abhishek_Adarsh_Resume.pdf';
    link.target = '_blank';
    
    link.onerror = function() {
        showNotification('Resume PDF not found. Please contact me directly at adarsh0670@gmail.com', 'error');
    };
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .nav-link.active {
        color: var(--accent-primary) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        '/assets/WhatsApp Image 2025-05-28 at 17.11.53_9a01b3fd.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();