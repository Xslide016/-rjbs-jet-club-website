// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                grade: document.getElementById('grade').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };
            
            // Simple validation
            if (validateForm(formData)) {
                // Simulate form submission
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                
                // In a real application, you would send the data to a server here
                console.log('Form submitted:', formData);
            }
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
                console.log('Newsletter subscription:', email);
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });
    }

    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openModal(imgSrc);
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', highlightActiveNav);

    // Initialize counters for statistics
    initializeCounters();

    // Initialize event countdowns
    initializeEventCountdowns();

    // Create scroll to top button
    createScrollToTopButton();

    // Add hover effects to member cards
    initializeMemberCardEffects();

    // Add loading animation for images
    initializeImageLoading();
});

// Form validation
function validateForm(formData) {
    if (!formData.name.trim()) {
        showNotification('Please enter your name.', 'error');
        document.getElementById('name').focus();
        return false;
    }
    
    if (!validateEmail(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!formData.grade.trim()) {
        showNotification('Please enter your grade level.', 'error');
        document.getElementById('grade').focus();
        return false;
    }
    
    if (!formData.message.trim()) {
        showNotification('Please enter your message.', 'error');
        document.getElementById('message').focus();
        return false;
    }
    
    return true;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Modal functionality for gallery
function openModal(imgSrc) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="${imgSrc}" alt="Gallery Image">
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const modalImg = modal.querySelector('img');
    modalImg.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: none;
        border: none;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    modalClose.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255,255,255,0.2)';
    });
    
    modalClose.addEventListener('mouseleave', function() {
        this.style.background = 'none';
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Escape key to close modal
    function closeModalOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeModalOnEscape);
        }
    }
    
    document.addEventListener('keydown', closeModalOnEscape);
    
    document.body.appendChild(modal);
}

// Active navigation highlighting
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Statistics counters
function initializeCounters() {
    // Add statistics section to about section
    const aboutSection = document.getElementById('about');
    if (aboutSection && !document.querySelector('.stats-container')) {
        const statsHTML = `
            <div class="stats-container">
                <div class="stat">
                    <div class="counter" data-target="100">0</div>
                    <p>Active Members</p>
                </div>
                <div class="stat">
                    <div class="counter" data-target="25">0</div>
                    <p>Projects Completed</p>
                </div>
                <div class="stat">
                    <div class="counter" data-target="15">0</div>
                    <p>Awards Won</p>
                </div>
                <div class="stat">
                    <div class="counter" data-target="3">0</div>
                    <p>Years Active</p>
                </div>
            </div>
        `;
        
        aboutSection.querySelector('.features').insertAdjacentHTML('afterend', statsHTML);
        
        // Add styles for stats
        const statsStyle = document.createElement('style');
        statsStyle.textContent = `
            .stats-container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 30px;
                margin-top: 50px;
                text-align: center;
            }
            
            .stat {
                padding: 30px 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
            }
            
            .stat:hover {
                transform: translateY(-5px);
            }
            
            .counter {
                font-size: 2.5rem;
                font-weight: bold;
                color: var(--primary);
                margin-bottom: 10px;
            }
            
            @media (max-width: 768px) {
                .stats-container {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 480px) {
                .stats-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(statsStyle);
        
        // Initialize counter animation
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + '+';
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// Event countdown timers
function initializeEventCountdowns() {
    const eventDates = [
        '2023-10-15',
        '2023-11-05',
        '2023-12-10',
        '2024-01-20',
        '2024-02-15'
    ];
    
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach((item, index) => {
        if (index < eventDates.length) {
            const countdownElement = document.createElement('div');
            countdownElement.className = 'event-countdown';
            countdownElement.style.cssText = `
                margin-top: 10px;
                padding: 5px 10px;
                background: var(--accent);
                color: white;
                border-radius: 15px;
                font-size: 0.9rem;
                display: inline-block;
                font-weight: 600;
            `;
            
            item.querySelector('.event-date').appendChild(countdownElement);
            updateCountdown(countdownElement, eventDates[index]);
            
            // Update countdown every hour
            setInterval(() => {
                updateCountdown(countdownElement, eventDates[index]);
            }, 3600000); // 1 hour
        }
    });
}

function updateCountdown(element, eventDate) {
    const eventTime = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const distance = eventTime - now;
    
    if (distance < 0) {
        element.textContent = 'Event completed';
        element.style.background = '#6c757d';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        element.textContent = 'Today!';
        element.style.background = '#e63946';
    } else if (days === 1) {
        element.textContent = 'Tomorrow!';
        element.style.background = '#e63946';
    } else if (days < 7) {
        element.textContent = `${days} days left`;
        element.style.background = '#f4a261';
    } else {
        element.textContent = `${days} days left`;
        element.style.background = '#2a9d8f';
    }
}

// Scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
        opacity: 0;
        transform: translateY(20px);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.background = 'var(--secondary)';
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary)';
        this.style.transform = 'translateY(0)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'block';
            setTimeout(() => {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'translateY(0)';
            }, 10);
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    scrollBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Member card effects
function initializeMemberCardEffects() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
}

// Image loading animation
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Check if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Fallback in case load event doesn't fire
            setTimeout(() => {
                img.style.opacity = '1';
            }, 1000);
        }
    });
}

// Add CSS animations dynamically
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    nav a.active {
        color: var(--secondary) !important;
        font-weight: 600;
        position: relative;
    }
    
    nav a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--secondary);
    }
    
    @media (max-width: 768px) {
        nav ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--primary);
            flex-direction: column;
            padding: 20px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
        }
        
        nav ul.active {
            display: flex;
        }
        
        nav ul li {
            margin: 10px 0;
            text-align: center;
        }
        
        nav ul li a {
            padding: 10px 0;
            display: block;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    .modal {
        animation: fadeIn 0.3s ease;
    }
    
    .scroll-to-top {
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(dynamicStyles);

// Add intersection observer for fade-in animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollAnimations, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab key navigation - add focus styles
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add loading state for forms
function setFormLoading(form, isLoading) {
    const button = form.querySelector('button[type="submit"]');
    if (isLoading) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
    } else {
        button.innerHTML = 'Send Message';
        button.disabled = false;
    }
}

// Simulate form submission with loading state
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    setFormLoading(this, true);
    
    // Simulate API call
    setTimeout(() => {
        setFormLoading(this, false);
        showNotification('Message sent successfully!', 'success');
        this.reset();
    }, 2000);
});