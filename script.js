document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu on click
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Form Validation (Contact Page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                showError(name, 'Te rugăm să introduci numele.');
                isValid = false;
            } else {
                clearError(name);
            }

            if (!isValidEmail(email.value)) {
                showError(email, 'Te rugăm să introduci o adresă de email validă.');
                isValid = false;
            } else {
                clearError(email);
            }

            if (message.value.trim() === '') {
                showError(message, 'Te rugăm să introduci un mesaj.');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                alert('Mesajul tău a fost trimis cu succes! Te vom contacta în curând.');
                contactForm.reset();
            }
        });
    }

    // Scroll Animation (Fade In Elements)
    const fadeElements = document.querySelectorAll('.card, .gallery-item');

    const fadeInOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        fadeElements.forEach(element => {
            const boxTop = element.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                // Initial state set in CSS or here
                // element.style.opacity = '0';
                // element.style.transform = 'translateY(20px)';
            }
        });
    };

    // Initialize initial styles for animation
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', fadeInOnScroll);
    // Trigger once on load
    fadeInOnScroll();

    // Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-content';
    lightbox.appendChild(lightboxImg);

    const lightboxClose = document.createElement('span');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '&times;';
    lightbox.appendChild(lightboxClose);

    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            // Basic Lightbox: Clone image source
            lightboxImg.src = image.src;
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

// Utility Functions
function showError(input, message) {
    const parent = input.parentElement;
    let error = parent.querySelector('.error-message');
    if (!error) {
        error = document.createElement('div');
        error.className = 'error-message';
        parent.appendChild(error);
    }
    error.innerText = message;
    error.style.display = 'block';
    input.style.borderColor = '#cc0000';
}

function clearError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector('.error-message');
    if (error) {
        error.style.display = 'none';
    }
    input.style.borderColor = '#ddd';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
