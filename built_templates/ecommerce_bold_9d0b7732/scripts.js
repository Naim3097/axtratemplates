/* filename: scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) {
                content.classList.add('active');
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('promo-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Show modal after 5 seconds
    setTimeout(() => {
        if (modal) {
            modal.classList.add('active');
        }
    }, 5000);

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Lean X Integration
    const leanXTriggers = document.querySelectorAll('.lean-x-trigger');
    
    leanXTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate conversion event
            console.log('Lean X Conversion Triggered');
            
            // Option 1: Open new tab
            // window.open('https://leanx.ai/register', '_blank');
            
            // Option 2: Alert/Modal
            alert('Sign up with Google to continue exploring!');
        });
    });

    // Add Lean X behavior to dead links
    const deadLinks = document.querySelectorAll('a[href="#"]');
    deadLinks.forEach(link => {
        if (!link.classList.contains('lean-x-trigger')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('This feature is available for registered members. Sign up now!');
            });
        }
    });
});
