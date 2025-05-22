document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToSlide(currentIndex);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto-advance slides
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-advance on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  // Course Selection Buttons
  const courseButtons = document.querySelectorAll('.course-btn');
  
  courseButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      courseButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Here you can add logic to show/hide relevant course content
      const courseType = button.dataset.course;
      // Example: updateCourseContent(courseType);
    });
  });
}); 