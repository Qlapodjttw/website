/* scripts/form.js - AJAX Form Validation & Submission */

function initForm() {
  // Select forms
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.querySelector('.newsletter-form');

  // Utility: validate email regex
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Utility: show message
  function showMessage(form, type, message) {
    // Clear existing
    let msgEl = form.querySelector(`.form-${type}`);
    if (!msgEl) {
      msgEl = document.createElement('div');
      msgEl.className = `form-${type}`;
      form.prepend(msgEl);
    }
    msgEl.textContent = message;
    msgEl.style.display = 'block';
  }

  // Utility: clear messages
  function clearMessages(form) {
    form.querySelectorAll('.form-error, .form-success').forEach(el => el.remove());
  }

  // Utility: toggle loading overlay
  function setLoading(form, isLoading) {
    if (isLoading) form.classList.add('form-loading');
    else form.classList.remove('form-loading');
  }

  // Common submit handler
  function handleSubmit(e, url) {
    e.preventDefault();
    const form = e.target;
    clearMessages(form);

    // Simple validation
    const data = {};
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(field => {
      const name = field.name;
      const value = field.value.trim();

      // Honeypot: skip if hidden field
      if (field.classList.contains('honeypot') && value !== '') {
        valid = false;
      }

      // Required
      if (field.hasAttribute('required') && value === '') {
        showMessage(form, 'error', 'Please fill all required fields.');
        valid = false;
      }

      // Email
      if (field.type === 'email' && value && !isValidEmail(value)) {
        showMessage(form, 'error', 'Please enter a valid email address.');
        valid = false;
      }

      data[name] = value;
    });

    if (!valid) return;

    // Submit via AJAX
    setLoading(form, true);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(json => {
        showMessage(form, 'success', json.message || 'Thank you! We will be in touch soon.');
        form.reset();
      })
      .catch(err => {
        console.error('Form submission error:', err);
        showMessage(form, 'error', 'Sorry, there was a problem. Please try again later.');
      })
      .finally(() => setLoading(form, false));
  }

  // Bind contact form
  if (contactForm) {
    contactForm.addEventListener('submit', e => handleSubmit(e, '/api/contact'));
  }

  // Bind newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => handleSubmit(e, '/api/subscribe'));
  }
}

// Export for main.js
export { initForm };
