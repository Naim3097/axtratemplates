/* filename: scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Lean X Integration
    const leanTriggers = document.querySelectorAll('.lean-x-trigger');
    
    leanTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate Lean X Modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            
            modal.innerHTML = `
                <div style="background: #1E1E1E; padding: 3rem; border: 2px solid #FF4500; text-align: center; max-width: 500px; width: 90%;">
                    <h2 style="color: #FF4500; font-family: 'Bebas Neue', sans-serif; font-size: 3rem; margin-bottom: 1rem;">Join the Club</h2>
                    <p style="color: #fff; margin-bottom: 2rem; font-family: 'Montserrat', sans-serif;">Unlock exclusive drops, early access, and member-only discounts.</p>
                    <button id="close-modal" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 0.8rem 2rem; cursor: pointer; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; margin-right: 1rem;">Close</button>
                    <button style="background: #FF4500; border: none; color: #fff; padding: 0.8rem 2rem; cursor: pointer; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem;">Sign Up</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Product Thumbnail Switcher
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update main image
                mainImage.src = thumb.src;
                
                // Update active class
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // Quantity Selector
    const qtyInputs = document.querySelectorAll('.quantity-selector');
    
    qtyInputs.forEach(selector => {
        const input = selector.querySelector('.qty-input');
        const minusBtn = selector.querySelector('.qty-btn:first-child');
        const plusBtn = selector.querySelector('.qty-btn:last-child');
        
        if (input && minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 1) {
                    input.value = val - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
        }
    });
    
    // Size Selector
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
