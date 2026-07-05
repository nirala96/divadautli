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
    initCatalogue();
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
 * Separate implementations for mobile and desktop
 */
function initJourneyScrolling() {
    const scrollSection = document.querySelector('.manufacturing-scroll');
    const steps = document.querySelectorAll('.scroll-step');
    const visuals = document.querySelectorAll('.visual-image');
    const visualColumn = document.querySelector('.scroll-visual-column');
    
    if (!scrollSection || steps.length === 0) return;

    // Determine viewport type
    const isMobile = () => window.innerWidth <= 1024;
    
    // ========== MOBILE IMPLEMENTATION ==========
    function initMobileScrolling() {
        // Clear any existing mobile images
        scrollSection.querySelectorAll('.mobile-step-image').forEach(el => el.remove());
        
        // Add images to each step for mobile
        steps.forEach((step, index) => {
            const visual = visuals[index];
            const img = visual ? visual.querySelector('img') : null;
            if (!img) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-step-image';
            wrapper.appendChild(img.cloneNode(true));
            step.appendChild(wrapper);
        });
        
        // Set up Intersection Observer for mobile background color changes
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(steps).indexOf(entry.target);
                    scrollSection.setAttribute('data-active-step', String(index));
                }
            });
        }, observerOptions);
        
        // Observe all steps
        steps.forEach(step => observer.observe(step));
        
        // Set initial background
        scrollSection.setAttribute('data-active-step', '0');
    }
    
    // ========== DESKTOP IMPLEMENTATION ==========
    function initDesktopScrolling() {
        // Remove mobile images if they exist
        scrollSection.querySelectorAll('.mobile-step-image').forEach(el => el.remove());
        
        let ticking = false;
        let currentActiveIndex = 0;
        
        function updateActiveStep() {
            const viewportHeight = window.innerHeight;
            const centerLine = viewportHeight * 0.5;
            let newActiveIndex = -1;
            
            steps.forEach((step, index) => {
                const stepRect = step.getBoundingClientRect();
                if (stepRect.top <= centerLine && stepRect.bottom >= centerLine) {
                    newActiveIndex = index;
                }
            });
            
            if (newActiveIndex === -1) {
                const firstRect = steps[0].getBoundingClientRect();
                const lastRect = steps[steps.length - 1].getBoundingClientRect();
                
                if (centerLine < firstRect.top) {
                    newActiveIndex = 0;
                } else if (centerLine > lastRect.bottom) {
                    newActiveIndex = steps.length - 1;
                } else {
                    for (let i = steps.length - 1; i >= 0; i--) {
                        if (steps[i].getBoundingClientRect().top < centerLine) {
                            newActiveIndex = i;
                            break;
                        }
                    }
                }
            }
            
            // Update step states
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
            
            // Update background color
            scrollSection.setAttribute('data-active-step', String(newActiveIndex));
            
            // Update visuals if changed
            if (newActiveIndex !== currentActiveIndex) {
                currentActiveIndex = newActiveIndex;
                
                visuals.forEach((visual, index) => {
                    if (index === newActiveIndex) {
                        visual.classList.add('active');
                    } else {
                        visual.classList.remove('active');
                    }
                });
            }
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
        
        // Initial update
        updateActiveStep();
        visuals[0]?.classList.add('active');
    }
    
    // ========== INITIALIZE BASED ON VIEWPORT ==========
    if (isMobile()) {
        initMobileScrolling();
    } else {
        initDesktopScrolling();
    }
    
    // Handle resize - reinitialize if crossing mobile/desktop breakpoint
    let wasMobile = isMobile();
    window.addEventListener('resize', debounce(() => {
        const nowMobile = isMobile();
        if (wasMobile !== nowMobile) {
            wasMobile = nowMobile;
            if (nowMobile) {
                initMobileScrolling();
            } else {
                initDesktopScrolling();
            }
        }
    }, 250));
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

/**
 * Catalogue Lazy Loading
 * Progressively loads images as user scrolls
 */
function initCatalogue() {
    const catalogueGrid = document.getElementById('catalogueGrid');
    const catalogueLoader = document.getElementById('catalogueLoader');
    
    if (!catalogueGrid) return;
    
    // All catalogue images
    const catalogueImages = [
        'Handwoven Crop Shirt – Soft Blue Stripes2.webp',
        'IMG_0381.webp',
        'IMG_0383.webp',
        'IMG_0389.webp',
        'IMG_0397.webp',
        'IMG_0402.webp',
        'IMG_0406.webp',
        'IMG_0409.webp',
        'IMG_0414.webp',
        'IMG_0418.webp',
        'IMG_0420.webp',
        'IMG_0429.webp',
        'Pink Cotton Wrap Top with Floral Motifs.webp',
        'Smocked Plaid Shirt – Ivory & Green Checks4.webp',
        'ailyciwkmnn8b2dgdmpa.webp',
        'almt5b4eezyat5ic1wlv.webp',
        'axaqg0fancnetoicvr7u.webp',
        'b0juuwafodr1e3oqot0p.webp',
        'b3etajsa8yaw4apjmfki.webp',
        'cnescsc5kkn3elu1cpxj.webp',
        'dkerv3vaeqvarddzpux9.webp',
        'dvczza2yfdxuxjlikeij.webp',
        'e4g1w6t2zotybakt01sq.webp',
        'ebkhwenajdyxg6gm5rbk.webp',
        'eotp2twgvqoj01x1btvm.webp',
        'fbikdsv1acsm7isrckim.webp',
        'g5oe5h8ebdlm898msy7a.webp',
        'gnemswvbg9cadmmvaig6.webp',
        'gyvlwtlb2jee1wgzgxv1.webp',
        'i73gabvoqavgq3njq4i5.webp',
        'jbcf1sityhpjmknunvkw.webp',
        'jlkk45ytxsgvwqvbh4ms.webp',
        'jufx7srosuqq1nxv836y.webp',
        'lojwysrhwgpkfhzl3bxs.webp',
        'luwhidncjqdz447mblky.webp',
        'mekm1vv4pxqqyn6zndm3.webp',
        'nayxt0zdvl0y7erqzo1o.webp',
        'oa08ebj4zhi6eqo9uhpg.webp',
        'oib5jvq0o2rhnuuq2831.webp',
        'otimg7meyikb5gmwquo5.webp',
        'pao2f1jcvajqtvcrp4my.webp',
        'qpvdt1yxeprasv6sbkql.webp',
        'v9y4ybwy0grrdbavobrv.webp',
        'vcvwgdufeeoqxi41mkvt.webp',
        've59mgcm39dpk4ohktwb.webp',
        'w0fjlddxfyrih0kpiwdr.webp',
        'wo9i6x5xfl94dadkfugp.webp',
        'xlpkhsurnuxrczqrmybt.webp',
        'yw4p7rxzinztdz29a2ig.webp',
        'zcwqzsc7owxbvtczlkdi.webp',
        'zdtzxfwcwp8cukjixfoh.webp',
        'zmuioafywt9conja0ysq.webp',
        'zyiydto89dbsoxkrbszw.webp'
    ];
    
    let currentIndex = 0;
    const imagesPerLoad = 6; // Load 6 images at a time
    let isLoading = false;
    
    // Create image element with lazy loading
    function createImageElement(imageName, index) {
        const imageItem = document.createElement('div');
        imageItem.className = 'catalogue-item';
        imageItem.style.opacity = '0';
        imageItem.style.transform = 'translateY(20px)';
        
        const img = document.createElement('img');
        // Use absolute path from root to work in both homepage and /catalogue/ subdirectory
        const basePath = window.location.pathname.includes('/catalogue/') ? '../images/catelogue/' : 'images/catelogue/';
        img.dataset.src = `${basePath}${imageName}`;
        img.alt = imageName.replace(/\.(webp|jpg|png)$/i, '').replace(/[_-]/g, ' ');
        img.className = 'catalogue-image';
        
        imageItem.appendChild(img);
        
        // Animate in after a short delay
        setTimeout(() => {
            imageItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            imageItem.style.opacity = '1';
            imageItem.style.transform = 'translateY(0)';
        }, index * 100); // Stagger animation
        
        return imageItem;
    }
    
    // Load images function
    function loadImages() {
        if (isLoading || currentIndex >= catalogueImages.length) {
            if (currentIndex >= catalogueImages.length && catalogueLoader) {
                catalogueLoader.style.display = 'none';
            }
            return;
        }
        
        isLoading = true;
        if (catalogueLoader) {
            catalogueLoader.style.display = 'flex';
        }
        
        const endIndex = Math.min(currentIndex + imagesPerLoad, catalogueImages.length);
        const fragment = document.createDocumentFragment();
        
        for (let i = currentIndex; i < endIndex; i++) {
            const imageElement = createImageElement(catalogueImages[i], i - currentIndex);
            fragment.appendChild(imageElement);
        }
        
        catalogueGrid.appendChild(fragment);
        
        // Lazy load the actual images using Intersection Observer
        const images = catalogueGrid.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        currentIndex = endIndex;
        
        setTimeout(() => {
            isLoading = false;
            if (catalogueLoader && currentIndex >= catalogueImages.length) {
                catalogueLoader.style.display = 'none';
            }
        }, 500);
    }
    
    // Initial load
    loadImages();
    
    // Infinite scroll observer
    if (catalogueLoader) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isLoading && currentIndex < catalogueImages.length) {
                    loadImages();
                }
            });
        }, {
            rootMargin: '200px' // Start loading 200px before loader is visible
        });
        
        scrollObserver.observe(catalogueLoader);
    }
}
