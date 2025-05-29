// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    // Store theme preference in memory (not localStorage due to artifact limitations)
    window.themePreference = newTheme;
}

// Load saved theme and initialize everything
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = window.themePreference || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    animateNumbers();
    
    // Initialize contact form - MOVED HERE
    initializeContactForm();
});

// Separate function to initialize contact form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Create a proper form submit handler by finding the submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get form inputs
                const nameInput = contactForm.querySelector('input[type="text"]');
                const emailInput = contactForm.querySelector('input[type="email"]');
                const messageTextarea = contactForm.querySelector('textarea');
                
                if (!nameInput || !emailInput || !messageTextarea) {
                    showNotification('Form elements not found. Please refresh the page.', 'error');
                    return;
                }
                
                // Get values and trim whitespace
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const message = messageTextarea.value.trim();
                
                // Validation
                if (!name || !email || !message) {
                    showNotification('Please fill in all fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual endpoint)
                setTimeout(() => {
                    // Reset form and button
                    nameInput.value = '';
                    emailInput.value = '';
                    messageTextarea.value = '';
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    showNotification('Thank you for your message! I will get back to you soon. For urgent matters, please email me directly at adarsh0670@gmail.com', 'success');
                }, 1500);
            });
        } else {
            console.error('Submit button not found in contact form');
        }
    } else {
        console.error('Contact form not found');
    }
}

// Download Resume - Now downloads the actual PDF
function downloadResume() {
    // Create a link to download the actual PDF
    const link = document.createElement('a');
    link.href = './MyResume.pdf'; // Path to your actual PDF
    link.download = 'Abhishek_Adarsh_Resume.pdf';
    link.target = '_blank';
    
    // Fallback: If PDF is not found, show message
    link.onerror = function() {
        alert('Resume PDF not found. Please contact me directly at adarsh0670@gmail.com');
    };
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: rgba(0, 255, 136, 0.1); border-color: #00ff88;' : 
          type === 'error' ? 'background: rgba(255, 0, 0, 0.1); border-color: #ff4444;' : 
          'background: var(--glass-bg);'}
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        color: var(--text-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
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
`;
document.head.appendChild(notificationStyles);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate numbers counting up
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent.replace('+', '');
                const isPlus = target.textContent.includes('+');
                
                let current = 0;
                const increment = finalNumber / 50; // Adjust speed here
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        current = finalNumber;
                        clearInterval(counter);
                    }
                    target.textContent = Math.floor(current) + (isPlus ? '+' : '');
                }, 30); // Adjust timing here
                
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}