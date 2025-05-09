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

  // Mega-menu ARIA roles & keyboard support
  megaMenuItems.forEach(item => {
    const trigger = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;

    // Set ARIA attributes
    item.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');

    // Show on hover/focus
    item.addEventListener('mouseenter', () => openDropdown());
    item.addEventListener('mouseleave', () => closeDropdown());
    trigger.addEventListener('focus', () => openDropdown());

    // Keyboard navigation: Esc to close
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
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
        closeDropdown();
      }
    });

    function openDropdown() {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-hidden', 'false');
    }
    function closeDropdown() {
      dropdown.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  });

  // Click outside to close any open dropdown
  document.addEventListener('click', (e) => {
    megaMenuItems.forEach(item => {
      const dropdown = item.querySelector('.dropdown');
      const trigger = item.querySelector('a');
      if (dropdown && !item.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

// Expose initMenu
export { initMenu };
