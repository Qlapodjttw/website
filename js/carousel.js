document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  let currentPosition = 0;
  const cardWidth = 300; // Width of each card including gap
  const cardsPerView = Math.floor(window.innerWidth / cardWidth);
  const totalCards = document.querySelectorAll('.course-card').length;
  
  // Update cards per view on window resize
  window.addEventListener('resize', () => {
    const newCardsPerView = Math.floor(window.innerWidth / cardWidth);
    if (newCardsPerView !== cardsPerView) {
      location.reload();
    }
  });

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    if (currentPosition < 0) {
      currentPosition += cardWidth;
      track.style.transform = `translateX(${currentPosition}px)`;
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxPosition = -(cardWidth * (totalCards - cardsPerView));
    if (currentPosition > maxPosition) {
      currentPosition -= cardWidth;
      track.style.transform = `translateX(${currentPosition}px)`;
    }
  });

  // Category filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Filter cards based on category
      const category = btn.textContent.toLowerCase();
      const cards = document.querySelectorAll('.course-card');
      
      cards.forEach(card => {
        const cardLevel = card.querySelector('.course-level').textContent.toLowerCase();
        if (category === 'all courses' || cardLevel === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Reset carousel position
      currentPosition = 0;
      track.style.transform = 'translateX(0)';
    });
  });

  // Touch/Swipe support
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
        // Swipe left
        nextBtn.click();
      } else {
        // Swipe right
        prevBtn.click();
      }
    }
  }
}); 