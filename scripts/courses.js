/* scripts/courses.js - Dynamic Catalog Rendering & Filters (Updated with Unsplash stock image URLs) */

function initCourses() {
  // Sample static data with Unsplash stock images
  const courses = [
    { id: 1, title: 'Conversational English', skill: 'speaking', level: 'beginner', image: 'https://source.unsplash.com/400x300/?english,conversation', description: 'Speak confidently in everyday situations.' },
    { id: 2, title: 'Business English', skill: 'writing', level: 'advanced', image: 'https://source.unsplash.com/400x300/?business,meeting', description: 'Professional communication skills.' },
    { id: 3, title: 'Grammar Mastery', skill: 'reading', level: 'intermediate', image: 'https://source.unsplash.com/400x300/?grammar,books', description: 'In-depth grammar lessons.' },
    { id: 4, title: 'Exam Prep TOEFL', skill: 'listening', level: 'advanced', image: 'https://source.unsplash.com/400x300/?toefl,exam', description: 'Get top scores on TOEFL.' },
    { id: 5, title: 'IELTS Intensive', skill: 'reading', level: 'intermediate', image: 'https://source.unsplash.com/400x300/?ielts,study', description: 'Comprehensive IELTS prep.' },
    { id: 6, title: 'Writing Workshop', skill: 'writing', level: 'beginner', image: 'https://source.unsplash.com/400x300/?writing,workshop', description: 'Creative writing fundamentals.' },
    { id: 7, title: 'Pronunciation Clinic', skill: 'speaking', level: 'advanced', image: 'https://source.unsplash.com/400x300/?pronunciation,practice', description: 'Perfect your accent.' },
    { id: 8, title: 'Listening Lab', skill: 'listening', level: 'beginner', image: 'https://source.unsplash.com/400x300/?listening,audio', description: 'Improve comprehension skills.' }
  ];

  // Pagination settings
  const ITEMS_PER_PAGE = 4;
  let currentPage = 1;
  let filtered = [...courses];

  // DOM elements
  const grid = document.getElementById('courses-catalog');
  const skillFilter = document.getElementById('filter-skill');
  const levelFilter = document.getElementById('filter-level');
  const searchInput = document.getElementById('search-courses');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  // Render a page of cards
  function renderPage(page) {
    grid.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);
    pageItems.forEach(course => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" loading="lazy" />
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <a href="course-detail.html?id=${course.id}" class="btn enroll">Learn More</a>
      `;
      grid.appendChild(card);
    });
    updatePagination();
    // trigger scroll reveal for new elements
    document.querySelectorAll('.fade-in').forEach(el => {
      if (!el.classList.contains('visible') && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }

  // Update pagination buttons and info
  function updatePagination() {
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Filter logic
  function applyFilters() {
    const skill = skillFilter.value;
    const level = levelFilter.value;
    const query = searchInput.value.trim().toLowerCase();

    filtered = courses.filter(c => {
      return (skill === 'all' || c.skill === skill) &&
             (level === 'all' || c.level === level) &&
             (c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
    });
    currentPage = 1;
    renderPage(currentPage);
  }

  // Event listeners
  skillFilter.addEventListener('change', applyFilters);
  levelFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', debounce(applyFilters, 300));
  prevBtn.addEventListener('click', () => { currentPage--; renderPage(currentPage); });
  nextBtn.addEventListener('click', () => { currentPage++; renderPage(currentPage); });

  // Initialize view
  applyFilters();
}

export { initCourses };
