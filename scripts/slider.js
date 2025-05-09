/* scripts/slider.js - Hero Slider Logic */

function initSlider() {
  const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  let currentIndex = 0;
  let autoplayTimer;
  const AUTOPLAY_INTERVAL = 7000; // 7 seconds

  // Set initial state
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'inactive');
      if (i === index) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.add('inactive');
        slide.setAttribute('aria-hidden', 'true');
      }
    });
    currentIndex = index;
  }

  // Next / Prev handlers
  function goNext() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }
  function goPrev() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goNext, AUTOPLAY_INTERVAL);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    goNext();
    startAutoplay();
  });
  prevBtn.addEventListener('click', () => {
    goPrev();
    startAutoplay();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      goNext();
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      goPrev();
      startAutoplay();
    }
  });

  // Swipe support for touch
  let touchStartX = 0;
  let touchEndX = 0;
  const threshold = 50;
  const slider = document.querySelector('.hero-slider');
  slider.addEventListener('touchstart', (e) => {
    stopAutoplay();
    touchStartX = e.changedTouches[0].screenX;
  });
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });
  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goPrev(); else goNext();
    }
  }

  // Initialize ARIA roles
  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });

  // Kickoff
  showSlide(0);
  startAutoplay();
}

export { initSlider };
