document.addEventListener('DOMContentLoaded', () => {
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // Read Time Calculator
    const article = document.querySelector('.article-content');
    if (article) {
        const text = article.innerText;
        const wpm = 200;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        
        const readTimeEl = document.getElementById('readTime');
        if (readTimeEl) {
            readTimeEl.innerText = `${time} min read`;
        }
    }

    // Exit Intent Popup
    const popup = document.getElementById('newsletterPopup');
    const closeBtn = document.querySelector('.popup-close');
    let popupShown = false;

    if (popup) {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0 && !popupShown) {
                popup.style.display = 'flex';
                popupShown = true;
            }
        });

        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // Lean X Conversion Trigger (Newsletter)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Lean X: Conversion Event Triggered');
            alert('Thanks for subscribing!');
            if (popup) popup.style.display = 'none';
            form.reset();
        });
    });

});
