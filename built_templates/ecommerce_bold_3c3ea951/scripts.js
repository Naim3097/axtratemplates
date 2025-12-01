/* filename: scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
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
    const leanXTriggers = document.querySelectorAll('.lean-x-trigger, a[href="#"], .btn[href="#"]');
    
    // Create Modal HTML
    if (!document.querySelector('.modal-overlay')) {
        const modalHTML = `
            <div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(131, 24, 67, 0.9); display: flex; justify-content: center; align-items: center; z-index: 9999; opacity: 0; visibility: hidden; transition: all 0.3s ease;">
                <div class="modal-content" style="background: #9D174D; padding: 3rem; max-width: 500px; width: 90%; text-align: center; position: relative; border: 2px solid #EC4899; transform: translateY(20px); transition: all 0.3s ease;">
                    <button class="modal-close" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #FBCFE8; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    <h2 style="font-family: 'Anton', sans-serif; color: #FBCFE8; margin-bottom: 1rem; font-size: 2.5rem; text-transform: uppercase;">Join the Club</h2>
                    <p style="color: #fff; margin-bottom: 2rem; font-family: 'Roboto', sans-serif;">Get exclusive access to limited drops and member-only discounts.</p>
                    <button style="background: #EC4899; color: #fff; border: none; padding: 1rem 2rem; font-family: 'Anton', sans-serif; font-size: 1.2rem; cursor: pointer; width: 100%; text-transform: uppercase;">Sign Up with Google</button>
                    <p style="margin-top: 1rem; font-size: 0.8rem; color: #FBCFE8;">Powered by Lean X</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');

    function openModal(e) {
        e.preventDefault();
        modalOverlay.style.opacity = '1';
        modalOverlay.style.visibility = 'visible';
        modalContent.style.transform = 'translateY(0)';
    }

    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalOverlay.style.visibility = 'hidden';
        modalContent.style.transform = 'translateY(20px)';
    }

    leanXTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

});
