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

    // Filter Grid
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                // Remove active class
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    // Lean X Integration (Modal Simulation)
    const leanXTriggers = document.querySelectorAll('.lean-x-trigger, a[href="#"], .btn[href="#"]');
    
    leanXTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate Modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            
            modal.innerHTML = `
                <div style="background: #262626; padding: 3rem; border: 2px solid #FACC15; max-width: 500px; width: 90%; text-align: center; position: relative; box-shadow: 10px 10px 0 #000;">
                    <button style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;" onclick="this.parentElement.parentElement.remove()">×</button>
                    <h2 style="margin-bottom: 1rem; font-family: 'Oswald', sans-serif; color: #FACC15; text-transform: uppercase;">Access Restricted</h2>
                    <p style="margin-bottom: 2rem; color: #A3A3A3;">Join our exclusive network to view this content.</p>
                    <button style="background: #FACC15; color: #000; border: none; padding: 1rem 2rem; font-family: 'Oswald', sans-serif; font-weight: bold; text-transform: uppercase; cursor: pointer; width: 100%;">Sign Up with Google</button>
                    <p style="margin-top: 1rem; font-size: 0.8rem; color: #666;">Powered by Lean X</p>
                </div>
            `;
            
            document.body.appendChild(modal);
        });
    });

});
