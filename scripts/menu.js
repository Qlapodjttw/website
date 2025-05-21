/* scripts/menu.js - Mega-menu & Mobile Nav */

function initMenu() {
  // Elements
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const megaMenuItems = document.querySelectorAll('.mega-menu > li');

  // Mobile nav toggle
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !expanded);
    mobileNav.classList.toggle('hidden');
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Mega-menu click handling
  megaMenuItems.forEach(item => {
    const trigger = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;

    // Set ARIA attributes
    item.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');

    // Toggle dropdown on click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close other open dropdowns
      megaMenuItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('a').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.dropdown').setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current dropdown
      const isActive = item.classList.contains('active');
      item.classList.toggle('active');
      trigger.setAttribute('aria-expanded', !isActive);
      dropdown.setAttribute('aria-hidden', isActive);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
        trigger.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstLink = dropdown.querySelector('a');
        firstLink && firstLink.focus();
      }
    });

    // Close on blur of last link
    const links = dropdown.querySelectorAll('a');
    const lastLink = links[links.length - 1];
    lastLink.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

// Expose initMenu
export { initMenu };
