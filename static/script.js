// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
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
});

// Download Resume
function downloadResume() {
    // Create a simple resume download
    const resumeContent = `
ABHISHEK ADARSH
+91 8539092115 | adarsh0670@gmail.com

SUMMARY
Enthusiastic Electronics and Computer Science undergraduate with hands-on experience in developing innovative software solutions. Adept at building real-world projects, including AI tools, web applications, and automation systems.

TECHNICAL SKILLS
Programming Languages: C, Java, Python, HTML, CSS, JavaScript
Web Frameworks: Flask, Node.js
Data Science & ML: Tensorflow, Keras, Numpy, Pandas, Matplotlib, Scikit-learn
Databases: MySQL, MongoDB
Tools/Platforms: Git, GitHub, VS Code, Jupyter Notebook

EDUCATION
B.Tech - Electronics and Computer Science Engineering (2022 – Present)
Kalinga Institute of Industrial Technology (KIIT), Odisha

CERTIFICATIONS
• Responsive Web Design Certification - FreeCodeCamp
• MySQL Certification - Scaler
• Python Certification - Scaler
• Flask Python Certification - Great Learning
• Machine Learning Certification - Scaler
• Deep Learning Certification - Scaler
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhishek_Adarsh_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

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