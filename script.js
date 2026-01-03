// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    const loader = document.querySelector('.loader');
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            
            // Initialize animations after loader is hidden
            setTimeout(() => {
                initAnimations();
                initScrollAnimations();
                initCounters();
                initMobileMenu();
                initNavbarBehavior();
            }, 300);
        }, 800);
    });

    // Mobile Menu Toggle
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuClose = document.querySelector('.menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar Scroll Behavior
    function initNavbarBehavior() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
                
                // Hide navbar on scroll down, show on scroll up
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
            } else {
                navbar.classList.remove('scrolled', 'hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Initialize scroll animations
    function initScrollAnimations() {
        // Create Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // If it's a skill category, add staggered animation to children
                    if (entry.target.classList.contains('skill-category')) {
                        const skillTags = entry.target.querySelectorAll('.skill-tag');
                        skillTags.forEach((tag, index) => {
                            tag.style.transitionDelay = `${index * 0.05}s`;
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll('.about-card, .skill-category, .stat-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize counter animations for stats
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 1500;
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button hover effects enhancement
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Skill tag hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card hover effect enhancement
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero visual
    function initParallax() {
        const heroVisual = document.querySelector('.hero-visual');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Initialize all animations
    function initAnimations() {
        initParallax();
        
        // Add hover effect to grid items in hero visual
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Initialize everything
    initAnimations();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initNavbarBehavior();
});
