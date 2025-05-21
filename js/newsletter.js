document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('newsletter-popup');
    const closeButton = document.querySelector('.close-popup');
    const form = document.querySelector('.popup-form');

    // Show popup after 5 seconds if not shown before
    setTimeout(() => {
        if (!localStorage.getItem('newsletterShown')) {
            popup.classList.add('visible');
        }
    }, 5000);

    // Close popup
    closeButton.addEventListener('click', () => {
        popup.classList.remove('visible');
        localStorage.setItem('newsletterShown', 'true');
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = 'var(--color-secondary)';
        form.innerHTML = '';
        form.appendChild(successMessage);
        
        // Close popup after 2 seconds
        setTimeout(() => {
            popup.classList.remove('visible');
            localStorage.setItem('newsletterShown', 'true');
        }, 2000);
    });
}); 