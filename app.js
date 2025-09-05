// Enhanced Portfolio JavaScript functionality - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeCounters();
    initializeSkillBars();
    initializeContactForm();
    initializeParallaxEffects();
    initializeProjectInteractions();
    initializeCertificationAnimations();
    initializeAccessibilityFeatures();
});

// Fixed Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle with improved animation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }

    // Close menu when link is clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Fixed smooth scrolling - handle both navigation and hero button clicks
    function handleSmoothScroll(e) {
        // Check if the clicked element or its parent is a link with href starting with #
        let target = e.target;
        if (target.tagName !== 'A') {
            target = target.closest('a');
        }
        
        if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }
    }

    // Add event listeners for smooth scrolling
    document.addEventListener('click', handleSmoothScroll);

    // Enhanced header background on scroll with performance optimization
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('.header');
        if (header) {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.style.background = 'rgba(19, 52, 59, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(19, 52, 59, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Enhanced active navigation link highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    let navTicking = false;
    window.addEventListener('scroll', function() {
        if (!navTicking) {
            requestAnimationFrame(updateActiveNav);
            navTicking = true;
        }
    });
}

// Enhanced hero section animations with typing effect
function initializeHeroAnimations() {
    const heroName = document.getElementById('heroName');
    const heroSubtitle = document.getElementById('heroSubtitle');
    
    if (heroName) {
        const nameText = 'Gaddam Vamsi Vardhan Reddy';
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid var(--color-teal-300)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < nameText.length) {
                heroName.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                    // Start subtitle animation
                    if (heroSubtitle) {
                        heroSubtitle.classList.add('fade-in');
                        // Animate CTA buttons
                        setTimeout(() => {
                            const ctaButtons = document.querySelectorAll('.hero__cta .btn');
                            ctaButtons.forEach((btn, index) => {
                                setTimeout(() => {
                                    btn.classList.add('fade-in-up');
                                }, index * 150);
                            });
                        }, 300);
                    }
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced scroll-triggered animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-category')) {
                    setTimeout(() => animateSkillBars(entry.target), 300);
                }
                
                if (entry.target.classList.contains('highlight')) {
                    setTimeout(() => animateCounter(entry.target), 500);
                }

                if (entry.target.classList.contains('cert-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.card, .skill-category, .project-card, .cert-card, .highlight, .timeline-item'
    );
    
    animateElements.forEach((element, index) => {
        // Set initial state for cert cards
        if (element.classList.contains('cert-card')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(element);
    });
}

// Enhanced counters with proper initialization and animation
function initializeCounters() {
    const counters = document.querySelectorAll('.highlight__number');
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        // Set initial display value
        counter.textContent = target;
    });
}

function animateCounter(element) {
    const counter = element.querySelector('.highlight__number');
    if (!counter || counter.classList.contains('animated')) return;
    
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const updateCounter = () => {
        if (step < steps) {
            current += increment;
            step++;
            
            // Format number based on target (decimal for CGPA)
            if (target < 10 && target.toString().includes('.')) {
                counter.textContent = Math.min(current, target).toFixed(1);
            } else {
                counter.textContent = Math.floor(Math.min(current, target));
            }
            
            setTimeout(updateCounter, duration / steps);
        } else {
            // Ensure final value is exact
            if (target < 10 && target.toString().includes('.')) {
                counter.textContent = target.toFixed(1);
            } else {
                counter.textContent = target;
            }
        }
    };
    
    counter.classList.add('animated');
    counter.textContent = '0';
    setTimeout(updateCounter, 100);
}

// Enhanced skill bar animations with staggered effect
function initializeSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars(skillCategory) {
    if (skillCategory.classList.contains('skill-animated')) return;
    
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            
            // Add pulse effect when animation completes
            setTimeout(() => {
                bar.style.boxShadow = '0 0 10px rgba(33, 128, 141, 0.5)';
                setTimeout(() => {
                    bar.style.boxShadow = 'none';
                }, 500);
            }, 1000);
        }, index * 200);
    });
    
    skillCategory.classList.add('skill-animated');
}

// Fixed contact form with comprehensive validation
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Clear error state on input
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear any existing feedback
            const existingFeedback = document.querySelector('.form-feedback');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') ? formData.get('name').trim() : '';
            const email = formData.get('email') ? formData.get('email').trim() : '';
            const subject = formData.get('subject') ? formData.get('subject').trim() : '';
            const message = formData.get('message') ? formData.get('message').trim() : '';
            
            // Validate individual fields
            let isValid = true;
            const nameField = contactForm.querySelector('#name');
            const emailField = contactForm.querySelector('#email');
            const subjectField = contactForm.querySelector('#subject');
            const messageField = contactForm.querySelector('#message');

            if (!validateField(nameField)) isValid = false;
            if (!validateField(emailField)) isValid = false;
            if (!validateField(subjectField)) isValid = false;
            if (!validateField(messageField)) isValid = false;
            
            // Show general form validation message if invalid
            if (!isValid) {
                showFormFeedback('error', 'Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showFormFeedback('success', 'Thank you! Your message has been received. I\'ll get back to you soon.');
                contactForm.reset();
                
                // Clear any field errors
                inputs.forEach(input => {
                    input.classList.remove('error');
                    const errorMsg = input.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                });
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function validateField(field) {
    if (!field) return true;
    
    const value = field.value ? field.value.trim() : '';
    let isValid = true;
    let errorMessage = '';

    // Remove existing error first
    removeFieldError(field);
    field.classList.remove('error');

    switch (field.type) {
        case 'email':
            if (!value) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        case 'text':
            if (!value) {
                const fieldName = field.name || field.id || 'Field';
                errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Must be at least 2 characters long';
                isValid = false;
            }
            break;
        default:
            if (field.tagName.toLowerCase() === 'textarea') {
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
            }
            break;
    }

    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    removeFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-xs);
        margin-top: var(--space-4);
        display: block;
    `;
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFormFeedback(type, message) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback status status--${type}`;
    feedback.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i> ${message}`;
    feedback.style.cssText = `
        margin-top: 16px;
        padding: 12px 16px;
        border-radius: var(--radius-base);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    // Add feedback to form
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(feedback);
    
    // Remove feedback after 6 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }
    }, 6000);
}

// Enhanced parallax effects with performance optimization
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Enhanced project card interactions
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    });
}

// Enhanced certification card animations
function initializeCertificationAnimations() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.cert-icon');
            const skillBadges = this.querySelectorAll('.skill-badge');
            
            if (icon) {
                icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Animate skill badges
            skillBadges.forEach((badge, badgeIndex) => {
                setTimeout(() => {
                    badge.style.transform = 'translateY(-2px)';
                    badge.style.transition = 'transform 0.2s ease';
                }, badgeIndex * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.cert-icon');
            const skillBadges = this.querySelectorAll('.skill-badge');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            skillBadges.forEach(badge => {
                badge.style.transform = 'translateY(0)';
            });
        });
    });
}

// Enhanced accessibility features
function initializeAccessibilityFeatures() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focused');
        });
        
        element.addEventListener('mousedown', function() {
            this.classList.remove('keyboard-focused');
        });
    });

    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-white);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 2000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhanced button click effects with ripple animation
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Loading animation and initial setup
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations for elements in viewport
    setTimeout(() => {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            if (isElementInViewport(highlight)) {
                animateCounter(highlight);
            }
        });
    }, 1000);

    // Initialize skill categories that are in viewport
    setTimeout(() => {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            if (isElementInViewport(category)) {
                animateSkillBars(category);
            }
        });
    }, 1500);
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    // Navigate sections with arrow keys when focused on nav
    if (document.activeElement && document.activeElement.classList.contains('nav__link')) {
        const navLinks = Array.from(document.querySelectorAll('.nav__link'));
        const currentIndex = navLinks.indexOf(document.activeElement);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
            navLinks[prevIndex].focus();
        }
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .keyboard-focused {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px;
    }
    
    .form-control.error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
    }
    
    .skill-badge {
        transition: transform 0.2s ease;
    }
    
    .tech-tag {
        transition: transform 0.2s ease;
    }
    
    .fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loaded .hero__content > * {
        animation-fill-mode: both;
    }
    
    .error-message {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Performance optimization with debounce
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

// Apply debouncing to resize events
const debouncedResize = debounce(function() {
    // Recalculate any size-dependent elements
    const skillCategories = document.querySelectorAll('.skill-category.skill-animated');
    skillCategories.forEach(category => {
        const skillBars = category.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    });
}, 250);

window.addEventListener('resize', debouncedResize);