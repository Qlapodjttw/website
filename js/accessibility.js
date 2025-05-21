// Accessibility Features
document.addEventListener('DOMContentLoaded', function() {
    // Font size controls
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const body = document.body;
    let currentFontSize = 16; // Default font size

    increaseFontBtn.addEventListener('click', () => {
        currentFontSize = Math.min(currentFontSize + 2, 24);
        body.style.fontSize = `${currentFontSize}px`;
    });

    decreaseFontBtn.addEventListener('click', () => {
        currentFontSize = Math.max(currentFontSize - 2, 12);
        body.style.fontSize = `${currentFontSize}px`;
    });

    // High contrast mode
    const highContrastBtn = document.getElementById('high-contrast');
    highContrastBtn.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        const isHighContrast = body.classList.contains('high-contrast');
        highContrastBtn.setAttribute('aria-pressed', isHighContrast);
    });

    // Screen reader mode
    const screenReaderBtn = document.getElementById('screen-reader');
    screenReaderBtn.addEventListener('click', () => {
        body.classList.toggle('screen-reader-mode');
        const isScreenReaderMode = body.classList.contains('screen-reader-mode');
        screenReaderBtn.setAttribute('aria-pressed', isScreenReaderMode);
        
        // Add descriptive text for screen readers
        if (isScreenReaderMode) {
            document.querySelectorAll('img').forEach(img => {
                if (!img.hasAttribute('alt')) {
                    img.setAttribute('alt', 'Image');
                }
            });
        }
    });

    // Dyslexia-friendly font
    const dyslexiaBtn = document.getElementById('dyslexia-friendly');
    dyslexiaBtn.addEventListener('click', () => {
        body.classList.toggle('dyslexia-friendly');
        const isDyslexiaFriendly = body.classList.contains('dyslexia-friendly');
        dyslexiaBtn.setAttribute('aria-pressed', isDyslexiaFriendly);
    });

    // Impact Stories
    const storyCards = document.querySelectorAll('.story-card');
    let currentStoryIndex = 0;

    function showStory(index) {
        storyCards.forEach(card => card.classList.remove('active'));
        storyCards[index].classList.add('active');
    }

    // Initialize first story
    showStory(currentStoryIndex);

    // Auto-rotate stories every 5 seconds
    setInterval(() => {
        currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
        showStory(currentStoryIndex);
    }, 5000);

    // Allow manual navigation through stories
    storyCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentStoryIndex = index;
            showStory(currentStoryIndex);
        });
    });

    // Save accessibility preferences
    function savePreferences() {
        const preferences = {
            fontSize: currentFontSize,
            highContrast: body.classList.contains('high-contrast'),
            screenReader: body.classList.contains('screen-reader-mode'),
            dyslexiaFriendly: body.classList.contains('dyslexia-friendly')
        };
        localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    }

    // Load saved preferences
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('accessibilityPreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            currentFontSize = preferences.fontSize;
            body.style.fontSize = `${currentFontSize}px`;
            
            if (preferences.highContrast) {
                body.classList.add('high-contrast');
                highContrastBtn.setAttribute('aria-pressed', 'true');
            }
            
            if (preferences.screenReader) {
                body.classList.add('screen-reader-mode');
                screenReaderBtn.setAttribute('aria-pressed', 'true');
            }
            
            if (preferences.dyslexiaFriendly) {
                body.classList.add('dyslexia-friendly');
                dyslexiaBtn.setAttribute('aria-pressed', 'true');
            }
        }
    }

    // Save preferences when they change
    [increaseFontBtn, decreaseFontBtn, highContrastBtn, screenReaderBtn, dyslexiaBtn].forEach(btn => {
        btn.addEventListener('click', savePreferences);
    });

    // Load preferences on page load
    loadPreferences();
}); 