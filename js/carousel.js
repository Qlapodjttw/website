document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      // Scroll Down
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      // Scroll Up
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Course showcase navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const courseCards = document.querySelectorAll('.course-card');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.dataset.category;
      
      // Filter and animate course cards
      courseCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
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

  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  let autoSlideInterval;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.opacity = i === index ? '1' : '0';
      testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100px)';
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Initialize testimonial slider
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
    testimonialSlider.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
  }

  // Quick view functionality
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  const closeModal = document.querySelector('.close-modal');

  quickViewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.course-card');
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('.course-description').textContent;
      const features = Array.from(card.querySelectorAll('.feature')).map(feature => ({
        icon: feature.querySelector('i').className,
        text: feature.querySelector('span').textContent
      }));
      
      // Populate modal content
      modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="modal-features">
          ${features.map(feature => `
            <div class="feature">
              <i class="${feature.icon}"></i>
              <span>${feature.text}</span>
            </div>
          `).join('')}
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary">Enroll Now</button>
          <button class="btn btn-secondary">Learn More</button>
        </div>
      `;
      
      // Show modal with animation
      modal.style.display = 'flex';
      setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
      }, 50);
    });
  });

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    if (hero && heroContent) {
      const scrolled = window.pageYOffset;
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize animations on page load
  // Animate hero content
  const heroElements = document.querySelectorAll('.hero-text > *');
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 300);
  });
  
  // Animate course cards
  const cards = document.querySelectorAll('.course-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}); 