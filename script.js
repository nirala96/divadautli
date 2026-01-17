/**
 * DIVA DAULTI - Website Interactions
 * Premium Fashion Manufacturing & Export House
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initProcessTimeline();
    initJourneyScrolling();
});

/**
 * Navbar Scroll Effect
 * Adds background and reduces padding on scroll
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const scrollThreshold = 50;
    const calloutThreshold = 300; // Show callout after scrolling 300px
    let calloutShown = false;
    let calloutTimeout = null;
    
    const updateNavbar = () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show WhatsApp callout on scroll
        if (whatsappFloat && window.scrollY > calloutThreshold && !calloutShown) {
            calloutShown = true;
            whatsappFloat.classList.add('scrolled');
            
            // Hide callout after 5 seconds
            calloutTimeout = setTimeout(() => {
                whatsappFloat.classList.remove('scrolled');
            }, 5000);
        }
        
        // Reset callout if scrolled back to top
        if (whatsappFloat && window.scrollY <= calloutThreshold) {
            calloutShown = false;
            if (calloutTimeout) {
                clearTimeout(calloutTimeout);
            }
        }
    };
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateNavbar();
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    if (!menuBtn || !mobileMenu) return;
    
    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Scroll Reveal Animations using Intersection Observer
 */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.service-card, .why-card, .section-header, .premium-text, .premium-visual, .trust-content, .cta-content'
    );
    
    // Add fade-in class to all elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('why-us-grid'))) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Process Timeline Animation
 */
function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    
    if (steps.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    steps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(step);
    });
}

/**
 * Parallax Effect for Hero Background
 * Subtle movement for premium feel
 */
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroBg.style.transform = `translateY(${rate}px)`;
    });
}

/**
 * Counter Animation for Stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

/**
 * Magnetic Button Effect
 * Premium hover interaction
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/**
 * Lazy Load Images
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }
}

/**
 * Handle Reduced Motion Preference
 */
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Remove animations
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
        
        document.querySelectorAll('.process-step').forEach(step => {
            step.classList.add('visible');
        });
    }
}

// Check reduced motion preference
checkReducedMotion();

/**
 * Performance: Debounce Helper
 */
function debounce(func, wait = 20) {
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

/**
 * Manufacturing Journey Scroll Storytelling
 * Napkin.ai inspired sticky horizontal scroll
 */
function initJourneyScrolling() {
    const scrollSection = document.querySelector('.manufacturing-scroll');
    const steps = document.querySelectorAll('.scroll-step');
    const visuals = document.querySelectorAll('.visual-image');
    
    if (!scrollSection || steps.length === 0) return;
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 1024;
    
    if (isMobile()) {
        // On mobile, use scroll-based image switching
        initMobileScrolling();
        return;
    }
    
    // Desktop: Sticky scroll behavior
    let ticking = false;
    let currentActiveIndex = 0;
    
    function updateActiveStep() {
        const viewportHeight = window.innerHeight;
        const centerLine = viewportHeight * 0.5;
        
        let newActiveIndex = currentActiveIndex;
        let closestDistance = Number.POSITIVE_INFINITY;
        
        steps.forEach((step, index) => {
            const stepRect = step.getBoundingClientRect();
            const stepCenter = stepRect.top + (stepRect.height / 2);
            const distance = Math.abs(stepCenter - centerLine);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                newActiveIndex = index;
            }
        });
        
        steps.forEach((step, index) => {
            step.classList.remove('active', 'passed', 'upcoming');
            
            if (index === newActiveIndex) {
                step.classList.add('active');
            } else if (index < newActiveIndex) {
                step.classList.add('passed');
            } else {
                step.classList.add('upcoming');
            }
        });
        
        // Always update background color via data attribute
        scrollSection.setAttribute('data-active-step', String(newActiveIndex));
        
        // Only update visuals if active index changed
        if (newActiveIndex !== currentActiveIndex) {
            currentActiveIndex = newActiveIndex;
            
            // Update visuals
            visuals.forEach((visual, index) => {
                if (index === newActiveIndex) {
                    visual.classList.add('active');
                } else {
                    visual.classList.remove('active');
                }
            });
        }
    }
    
    function initMobileScrolling() {
        // Mobile-specific scroll behavior
        let mobileTicking = false;
        
        function updateMobileView() {
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight * 0.5;
            
            let activeIndex = 0;
            let minDistance = Number.POSITIVE_INFINITY;
            
            // Find which step is closest to viewport center
            steps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                const stepCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(stepCenter - viewportCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });
            
            // Update background color
            scrollSection.setAttribute('data-active-step', String(activeIndex));
            
            // Update active visual to match active step
            visuals.forEach((visual, index) => {
                if (index === activeIndex) {
                    visual.classList.add('active');
                } else {
                    visual.classList.remove('active');
                }
            });
        }
        
        window.addEventListener('scroll', () => {
            if (!mobileTicking) {
                window.requestAnimationFrame(() => {
                    updateMobileView();
                    mobileTicking = false;
                });
                mobileTicking = true;
            }
        });
        
        // Initial mobile update
        visuals[0]?.classList.add('active');
        scrollSection.setAttribute('data-active-step', '0');
        setTimeout(updateMobileView, 100);
    }
    
    // Scroll listener with RAF throttling
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveStep();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update - set first step active and trigger initial calculation
    steps[0]?.classList.add('active');
    visuals[0]?.classList.add('active');
    scrollSection.setAttribute('data-active-step', '0');
    
    // Run initial update after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateActiveStep();
    }, 100);
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            location.reload(); // Reload to re-initialize with correct behavior
        }, 300);
    });
}
                    else step.classList.remove('active');
                });
                visuals.forEach((v, i) => {
                    if (i === 0) v.classList.add('active');
                    else v.classList.remove('active');
                });
            }
        }, 250);
    });
}

/**
 * Cursor Follower (Optional Premium Effect)
 * Uncomment to enable
 */
/*
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Grow on hover over interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}
*/
