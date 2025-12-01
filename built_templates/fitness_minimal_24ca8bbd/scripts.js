/* filename: scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------------------- */
    /*                               1. MOBILE MENU                               */
    /* -------------------------------------------------------------------------- */
    const navToggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                             2. SCROLL REVEAL                               */
    /* -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* -------------------------------------------------------------------------- */
    /*                             3. PARALLAX HERO                               */
    /* -------------------------------------------------------------------------- */
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Move background slower than scroll (0.5 speed)
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                           4. LEAN X INTEGRATION                            */
    /* -------------------------------------------------------------------------- */
    // Select all links that are NOT navigation links to real pages
    // In this template, real pages are index.html, classes.html, membership.html, contact.html
    const realPages = ['index.html', 'classes.html', 'membership.html', 'contact.html'];
    
    const allLinks = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');

    const handleConversion = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        // If it's a button without a type (often used as links) or a link
        // Check if it's a real internal navigation
        let isRealPage = false;
        if (href) {
            // Check if href ends with one of the real pages
            isRealPage = realPages.some(page => href.endsWith(page) || href === page);
            // Also allow anchor links on same page
            if (href.startsWith('#')) isRealPage = true;
        }

        // If NOT a real page, trigger conversion
        if (!isRealPage) {
            e.preventDefault();
            console.log('Lean X Conversion Triggered');
            
            // Option A: Open new tab (Simulated)
            // window.open('https://leanx.ai/register', '_blank');

            // Option B: Alert/Modal (Simulated)
            alert("Lean X Demo: This would open the registration or SSO modal.");
        }
    };

    allLinks.forEach(link => {
        link.addEventListener('click', handleConversion);
    });

    buttons.forEach(btn => {
        // If button is inside a form, let it submit (unless it's the newsletter which is also a conversion point usually)
        if (!btn.closest('form')) {
            btn.addEventListener('click', handleConversion);
        }
    });
    
    // Newsletter specific handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Lean X Demo: Newsletter subscription successful!");
        });
    }

});
