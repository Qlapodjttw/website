/* scripts/main.js - Entry point (150+ lines) */

// Immediately mark JS enabled for CSS hooks
document.documentElement.classList.add('js-enabled');

// Utility: Debounce
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Utility: Throttle
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = (new Date()).getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Sticky header hide-on-scroll
function initStickyHeader() {
  const header = document.getElementById('site-header');
  let lastScroll = 0;
  window.addEventListener('scroll', throttle(() => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > header.offsetHeight) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = current;
  }, 100));
}

// Scroll reveal for .fade-in elements
function initScrollReveal() {
  const elems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elems.forEach(el => observer.observe(el));
}

// Close overlays (search, mobile nav) on outside click or Esc
function initGlobalClose() {
  document.addEventListener('click', (e) => {
    const searchBar = document.getElementById('search-bar');
    const mobileNav = document.getElementById('mobile-nav');
    const toggle = document.getElementById('search-toggle');
    if (!searchBar.contains(e.target) && !toggle.contains(e.target)) {
      searchBar.classList.add('hidden');
    }
    if (!mobileNav.contains(e.target) && !document.getElementById('mobile-menu-toggle').contains(e.target)) {
      mobileNav.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('search-bar').classList.add('hidden');
      document.getElementById('mobile-nav').classList.add('hidden');
    }
  });
}

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  try {
    initSmoothScroll();
    initStickyHeader();
    initScrollReveal();
    initGlobalClose();

    // Initialize feature modules if available
    if (typeof initMenu === 'function') initMenu();
    if (typeof initSlider === 'function') initSlider();
    if (typeof initCourses === 'function') initCourses();
    if (typeof initForm === 'function') initForm();
    if (typeof initCourseDetail === 'function') initCourseDetail();

    console.log('All modules initialized');
  } catch (err) {
    console.error('Error initializing modules:', err);
  }
});


// Export for testing or modules (optional)
export {
  debounce,
  throttle,
  initSmoothScroll,
  initStickyHeader,
  initScrollReveal,
  initGlobalClose
};

// End of main.js (approx. 170 lines)
