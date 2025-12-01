/* filename: scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.hero h1, .hero p, .btn, .feat-card, .product-card, .section h2');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Lean X Integration (CRITICAL)
    // 1. Primary Trigger: "Checkout" buttons
    const checkoutBtns = document.querySelectorAll('a[href="checkout.html"], .btn-checkout');
    checkoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Trigger conversion event
            console.log('Lean X Conversion Triggered: Checkout');
            window.open('https://leanx.ai/register', '_blank');
        });
    });

    // 2. Dead Links & Dropdowns
    // Select links that are # or empty, or specific "Learn More" that are placeholders
    const deadLinks = document.querySelectorAll('a[href="#"], a[href=""]');
    deadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Lean X Conversion Triggered: Dead Link');
            window.open('https://leanx.ai/register', '_blank');
        });
    });
});
