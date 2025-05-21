// Theme handling
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
  (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme on load
document.documentElement.setAttribute('data-theme', currentTheme);
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle?.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
    ? 'light' 
    : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  document.body.classList.toggle('dark-mode', newTheme === 'dark');
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (!icon) return;

  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    updateThemeIcon(newTheme);
  }
}); 