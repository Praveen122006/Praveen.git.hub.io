document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--color-bg-surface-glass)';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.borderBottom = '1px solid var(--color-bg-surface-glass-border)';
                navLinks.style.backdropFilter = 'blur(16px)';
            }
        });
    }

    // Simple smooth scroll logic for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu on click
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = '';
                }

                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');

                // Reset styles set by JS so CSS animation takes over cleanly
                setTimeout(() => {
                    entry.target.style.opacity = '';
                    entry.target.style.transform = '';
                }, 800); // 800ms matches the transition duration

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.section-title, .about-text, .glow-box, .skill-category, .project-card, .contact-box');

    animateElements.forEach((el, index) => {
        // Add staggered delays for grid items
        if (el.classList.contains('skill-category') || el.classList.contains('project-card')) {
            el.style.animationDelay = `${(index % 3) * 0.15}s`;
        }

        // Prepare them for animation by setting initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.classList.remove('animate-slide-up'); // Ensure class is not there

        observer.observe(el);
    });
});
