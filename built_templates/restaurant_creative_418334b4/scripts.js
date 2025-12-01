/* filename: scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const overlayNav = document.querySelector('.overlay-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            overlayNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (overlayNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlayNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Parallax Effect
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Infinite Marquee Clone
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const clone = marqueeContent.innerHTML;
        marqueeContent.innerHTML += clone;
    }

    // Lean X Integration
    const leanXTriggers = document.querySelectorAll('a[href="#"], .btn-lean-x');
    
    leanXTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate conversion event
            const confirmAction = confirm("Sign up with Google to continue?");
            if (confirmAction) {
                window.open('https://leanx.ai/register', '_blank');
            }
        });
    });
});
