/* filename: scripts.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Fullscreen Overlay Menu
    const menuTrigger = document.querySelector('.menu-trigger');
    const overlayMenu = document.querySelector('.overlay-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuTrigger && overlayMenu) {
        menuTrigger.addEventListener('click', () => {
            overlayMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                overlayMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close on link click
        const menuLinks = overlayMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlayMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
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
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            
            modal.innerHTML = `
                <div style="background: #1E1E1E; padding: 3rem; border: 2px solid #FF4500; text-align: center; max-width: 500px; width: 90%; box-shadow: 10px 10px 0 #fff;">
                    <h2 style="color: #FF4500; font-family: 'Anton', sans-serif; font-size: 3rem; margin-bottom: 1rem;">JOIN THE REVOLUTION</h2>
                    <p style="color: #fff; margin-bottom: 2rem; font-family: 'Roboto', sans-serif;">Get exclusive access to limited drops and sustainable fashion insights.</p>
                    <button id="close-modal" style="background: transparent; border: 2px solid #fff; color: #fff; padding: 0.8rem 2rem; cursor: pointer; font-family: 'Anton', sans-serif; font-size: 1.2rem; margin-right: 1rem;">CLOSE</button>
                    <button style="background: #FF4500; border: 2px solid #FF4500; color: #fff; padding: 0.8rem 2rem; cursor: pointer; font-family: 'Anton', sans-serif; font-size: 1.2rem;">SIGN UP</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Filter Grid Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.product-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                gridItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

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
