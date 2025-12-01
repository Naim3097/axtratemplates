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
            document.body.style.overflow = 'hidden';
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                             2. FILTER GRID                                 */
    /* -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                filterItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add animation class if needed
                        item.style.opacity = '0';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                             3. MODAL POPUP                                 */
    /* -------------------------------------------------------------------------- */
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('.modal-close');

    if (modal && modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                           4. LEAN X INTEGRATION                            */
    /* -------------------------------------------------------------------------- */
    const realPages = ['index.html', 'menu.html', 'reservations.html', 'about.html'];
    const allLinks = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');

    const handleConversion = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        // Check if it's a real internal navigation
        let isRealPage = false;
        if (href) {
            isRealPage = realPages.some(page => href.endsWith(page) || href === page);
            if (href.startsWith('#')) isRealPage = true;
        }

        // Special case: "Book a Table" is a primary trigger, even if it goes to reservations.html
        // But the prompt says "Primary Trigger: The main CTA 'Book a Table' must trigger the conversion event."
        // So if the text content is "Book a Table", we might want to intercept it OR just let it go to the page if the page exists.
        // However, usually "Book a Table" leads to a form. If the form is on reservations.html, that's fine.
        // The prompt says: "Every opportunity for a user interaction that is NOT a navigation link to a main page must be a CTA for Lean X".
        // AND "Primary Trigger: The main CTA 'Book a Table' must trigger the conversion event."
        // This implies "Book a Table" buttons should trigger the conversion logic (new tab/modal) INSTEAD of just going to the page, OR the page itself has the conversion form.
        // Let's make the "Book a Table" buttons on non-reservation pages go to reservations.html, and the form submission on reservations.html be the conversion.
        // OR, if the button is "Book a Table" and it's a direct CTA, we can trigger the modal.
        
        // Let's stick to the rule: "NOT a navigation link to a main page".
        // If I have a button "Book a Table" linking to "reservations.html", it IS a navigation link to a main page.
        // So I will leave it.
        // BUT, "Dead Links & Dropdowns... or secondary button that does not lead to a real page".
        
        if (!isRealPage) {
            e.preventDefault();
            // Check if it's a filter button (which has no href usually, but if it's an <a> tag...)
            if (e.currentTarget.classList.contains('filter-btn')) return;

            console.log('Lean X Conversion Triggered');
            alert("Lean X Demo: This would open the reservation system or SSO.");
        }
    };

    allLinks.forEach(link => {
        link.addEventListener('click', handleConversion);
    });

    buttons.forEach(btn => {
        if (!btn.closest('form') && !btn.classList.contains('filter-btn')) {
            btn.addEventListener('click', handleConversion);
        }
    });

    // Reservation Form Submission
    const reservationForm = document.querySelector('form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Lean X Demo: Reservation Request Sent!");
        });
    }

});
