// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
}

// Update theme icon
function updateThemeIcon(theme) {
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (!icon) return;
  
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  themeToggle.setAttribute('aria-label', 
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

// Toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

// Event listeners
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
  }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initTheme); 