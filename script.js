// Enhanced Portfolio JavaScript with Modern Features

// Email decryption utility
function getDecryptedEmail() {
    const encryptedEmail = 'bW9jLmxpYW1nQG5lbGx1Y3dlaWxyYWhj';
    const decoded = atob(encryptedEmail);
    return decoded.split('').reverse().join('');
}

// Theme Management

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeToggleBtn) {
            const icon = this.themeToggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }

        // Update Bootstrap theme
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (theme === 'dark') {
                navbar.classList.replace('navbar-light', 'navbar-dark');
                navbar.classList.replace('bg-light', 'bg-dark');
            } else {
                navbar.classList.replace('navbar-dark', 'navbar-light');
                navbar.classList.replace('bg-dark', 'bg-light');
            }
        }
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Navigation Active State
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateActiveNavOnScroll();
        this.updateActiveNavOnLoad();
    }

    updateActiveNavOnLoad() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath.split('/').pop() || 
                (currentPath.includes('index') && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavOnScroll() {
        if (window.location.pathname.includes('index')) {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (scrollY >= sectionTop) {
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
    }
}

// Animation on Scroll
class AnimationOnScroll {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Observe cards for hover effects
        const cards = document.querySelectorAll('.card, .stat-card, .skill-card, .project-card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Resume Generator
function generateResume() {
    // Create a simple text-based resume
    const resumeContent = `
CHARLIE CULLEN
Full-Stack Developer & Computer Science Graduate
Email: ${getDecryptedEmail()}
LinkedIn: linkedin.com/in/charliewcullen
GitHub: github.com/charlieijk
Location: San Francisco, CA

EDUCATION
University College Cork (2023-2025)
Bachelor of Science in Computer Science
Upper Second-Class Honors (2.1)

TECHNICAL SKILLS
Programming Languages: Python, JavaScript, Java, C, Shell, MIPS Assembly
Web Technologies: React, HTML5, CSS3, Bootstrap, Flask, Jinja
Database & Systems: SQL/SQLite, POSIX Threads, UDP/TCP Networking
Tools & Frameworks: Git, Linux, Node.js (learning), Docker (learning)

PROJECTS
1. Atlantic Ocean Explorer - Interactive web application with advanced CSS
2. BizzarBazzar - Full-stack quiz game with Flask and SQLite
3. Aunty Betty's Lair - JavaScript game with AI and multiplayer features
4. Dijkstra Algorithm Implementation - Advanced graph algorithms
5. Inter-Process Communication System - C/Python cross-language IPC
6. Parallel Matrix Multiplication - Multithreaded computing with POSIX
7. UDP Communication System - Network programming with reliability

CURRENT FOCUS
Actively seeking tech internships while completing prerequisites
Passionate about full-stack development and systems programming
Open to opportunities in web development, backend systems, and software engineering
    `;

    // Create and download the resume
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Charlie_Cullen_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show feedback
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check me-2"></i>Downloaded!';
    button.classList.add('btn-success');
    button.classList.remove('btn-success', 'btn-outline-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-success');
    }, 2000);
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Optimize scroll performance
                this.optimizeScrollElements();
            }, 16); // ~60fps
        });
    }

    optimizeScrollElements() {
        // Add any scroll optimization logic here
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Example: Hide/show elements based on scroll position
        const expensiveElements = document.querySelectorAll('.expensive-animation');
        expensiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < windowHeight && rect.bottom > 0;
            
            if (isVisible) {
                el.style.willChange = 'transform';
            } else {
                el.style.willChange = 'auto';
            }
        });
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.handleError(e.error);
        });

        // Promise rejection handling
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    handleError(error) {
        // Log error details
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack || 'No stack trace',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // In a real application, you might send this to a logging service
        console.error('Error logged:', errorInfo);

        // Show user-friendly message if needed
        if (error.message && error.message.includes('network')) {
            this.showUserMessage('Network error. Please check your connection.');
        }
    }

    showUserMessage(message) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            border: 1px solid #f5c6cb;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 5000);
    }
}

// Contact Form Enhancement
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupValidation();
            this.setupSubmission();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('is-invalid');
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field must be at least 2 characters long';
                }
                break;
            case 'textarea':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearErrors(field) {
        field.classList.remove('is-invalid');
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    setupSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            const inputs = this.form.querySelectorAll('input[required], textarea[required]');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                this.submitForm();
            }
        });
    }

    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `From: ${data.name} (${data.email})\n\n${data.message}`
        );
        const mailtoLink = `mailto:${getDecryptedEmail()}?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Opening Email Client...';
        submitBtn.classList.add('btn-success');
        submitBtn.classList.remove('btn-primary');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-primary');
            submitBtn.disabled = false;
        }, 3000);
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
            if (e.key === 'Escape') {
                this.handleEscapeKey(e);
            }
        });
    }

    handleTabNavigation(e) {
        // Ensure proper tab order for custom components
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    handleEscapeKey(e) {
        // Close any open modals or dropdowns
        const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    setupFocusManagement() {
        // Add visible focus indicators for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions where needed
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (!card.getAttribute('aria-label')) {
                const title = card.querySelector('.card-title, h1, h2, h3, h4, h5, h6');
                if (title) {
                    card.setAttribute('aria-label', title.textContent);
                }
            }
        });

        // Add skip links for better navigation
        this.addSkipLinks();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 9999;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Project Date Display from HTML Comments
class ProjectDateDisplay {
    constructor() {
        this.init();
    }

    init() {
        this.displayDatesFromComments();
    }

    displayDatesFromComments() {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            const card = item.querySelector('.project-card');
            if (card) {
                // Find the HTML comment before this project item
                const comment = this.findProjectComment(item);
                if (comment) {
                    const date = this.extractDateFromComment(comment);
                    if (date) {
                        this.displayDate(card, date);
                    }
                }
            }
        });
    }

    findProjectComment(element) {
        // Look for the comment node before this element
        let node = element.previousSibling;
        while (node) {
            if (node.nodeType === Node.COMMENT_NODE) {
                return node.nodeValue;
            }
            node = node.previousSibling;
        }
        return null;
    }

    extractDateFromComment(comment) {
        // Extract date in format YYYY-MM-DD from comment like "Project 22: Atlantic Ocean Explorer (2023-12-08)"
        const match = comment.match(/\((\d{4})-(\d{2})-(\d{2})\)/);
        if (match) {
            return {
                year: match[1],
                month: match[2],
                day: match[3]
            };
        }
        return null;
    }

    displayDate(card, date) {
        const cardBody = card.querySelector('.card-body');

        // Check if date already exists
        if (cardBody.querySelector('.project-date')) {
            return;
        }

        // Format date (Month Year only)
        const formattedDate = this.formatDate(date);

        // Create date element
        const dateElement = document.createElement('p');
        dateElement.className = 'project-date text-muted small mb-2';
        dateElement.innerHTML = `<i class="fas fa-calendar-alt me-1"></i>${formattedDate}`;

        // Insert after title
        const title = cardBody.querySelector('.card-title');
        if (title) {
            title.parentNode.insertBefore(dateElement, title.nextSibling);
        }
    }

    formatDate(date) {
        // Convert month number to month name
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthIndex = parseInt(date.month) - 1;
        const monthName = monthNames[monthIndex];

        return `${monthName} ${date.year}`;
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    new ThemeManager();
    new SmoothScroll();
    new NavigationManager();
    new AnimationOnScroll();
    new PerformanceMonitor();
    new ErrorHandler();
    new ContactFormHandler();
    new AccessibilityManager();
    new ProjectDateDisplay();

    // Initialize typing effect on homepage
    // const typingElement = document.querySelector('.typing-effect');
    // if (typingElement) {
    //     new TypingEffect(typingElement, [
    //         'Full-Stack Developer',
    //         'Computer Science Graduate',
    //         'Tech Enthusiast'
    //     ], 150);
    // }

    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Console message for developers
    console.log('%c👋 Hello Developer!', 'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('%cThanks for checking out my portfolio code! Feel free to reach out if you have any questions.', 'color: #666; font-size: 12px;');
    console.log('%c📧 ' + getDecryptedEmail(), 'color: #007bff; font-size: 12px;');

    console.log('Portfolio loaded successfully');
});