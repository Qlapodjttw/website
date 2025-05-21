// Accessibility Features
document.addEventListener('DOMContentLoaded', () => {
    const increaseFont = document.getElementById('increase-font');
    const decreaseFont = document.getElementById('decrease-font');
    const highContrast = document.getElementById('high-contrast');
    const screenReader = document.getElementById('screen-reader');
    const dyslexiaFriendly = document.getElementById('dyslexia-friendly');
    const darkMode = document.getElementById('dark-mode');

    // Font size controls
    let currentFontSize = 16;
    const minFontSize = 12;
    const maxFontSize = 24;

    increaseFont?.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    decreaseFont?.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    // High contrast mode
    highContrast?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
    });

    // Screen reader mode
    screenReader?.addEventListener('click', () => {
        document.body.classList.toggle('screen-reader-mode');
        const isScreenReader = document.body.classList.contains('screen-reader-mode');
        localStorage.setItem('screenReader', isScreenReader);
    });

    // Dyslexia-friendly font
    dyslexiaFriendly?.addEventListener('click', () => {
        document.body.classList.toggle('dyslexia-friendly');
        const isDyslexiaFriendly = document.body.classList.contains('dyslexia-friendly');
        localStorage.setItem('dyslexiaFriendly', isDyslexiaFriendly);
    });

    // Dark mode toggle
    darkMode?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Load saved preferences
    const savedPreferences = {
        highContrast: localStorage.getItem('highContrast') === 'true',
        screenReader: localStorage.getItem('screenReader') === 'true',
        dyslexiaFriendly: localStorage.getItem('dyslexiaFriendly') === 'true',
        darkMode: localStorage.getItem('darkMode') === 'true'
    };

    if (savedPreferences.highContrast) {
        document.body.classList.add('high-contrast');
    }
    if (savedPreferences.screenReader) {
        document.body.classList.add('screen-reader-mode');
    }
    if (savedPreferences.dyslexiaFriendly) {
        document.body.classList.add('dyslexia-friendly');
    }
    if (savedPreferences.darkMode) {
        document.body.classList.add('dark-mode');
    }

    // Impact Stories
    const storyCards = document.querySelectorAll('.story-card');
    let currentStoryIndex = 0;
    let storyInterval;

    function showStory(index) {
        if (!storyCards.length) return;
        storyCards.forEach(card => card.classList.remove('active'));
        storyCards[index].classList.add('active');
    }

    // Initialize first story
    showStory(currentStoryIndex);

    // Auto-rotate stories every 5 seconds
    function startStoryRotation() {
        stopStoryRotation();
        storyInterval = setInterval(() => {
            currentStoryIndex = (currentStoryIndex + 1) % storyCards.length;
            showStory(currentStoryIndex);
        }, 5000);
    }

    function stopStoryRotation() {
        if (storyInterval) {
            clearInterval(storyInterval);
        }
    }

    // Start story rotation if there are stories
    if (storyCards.length > 1) {
        startStoryRotation();
    }

    // Allow manual navigation through stories
    storyCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentStoryIndex = index;
            showStory(currentStoryIndex);
            // Reset the interval when manually changing stories
            startStoryRotation();
        });
    });

    // Save accessibility preferences
    function savePreferences() {
        try {
            const preferences = {
                fontSize: currentFontSize,
                highContrast: document.body.classList.contains('high-contrast'),
                screenReader: document.body.classList.contains('screen-reader-mode'),
                dyslexiaFriendly: document.body.classList.contains('dyslexia-friendly'),
                darkMode: document.body.classList.contains('dark-mode')
            };
            localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    }

    // Load saved preferences
    function loadPreferences() {
        try {
            const savedPreferences = localStorage.getItem('accessibilityPreferences');
            if (savedPreferences) {
                const preferences = JSON.parse(savedPreferences);
                currentFontSize = preferences.fontSize;
                document.documentElement.style.fontSize = `${currentFontSize}px`;
                
                if (preferences.highContrast) {
                    document.body.classList.add('high-contrast');
                }
                
                if (preferences.screenReader) {
                    document.body.classList.add('screen-reader-mode');
                }
                
                if (preferences.dyslexiaFriendly) {
                    document.body.classList.add('dyslexia-friendly');
                }

                if (preferences.darkMode) {
                    document.body.classList.add('dark-mode');
                }
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    }

    // Save preferences when they change
    const buttons = [increaseFont, decreaseFont, highContrast, screenReader, dyslexiaFriendly, darkMode].filter(Boolean);
    buttons.forEach(btn => {
        btn.addEventListener('click', savePreferences);
    });

    // Load preferences on page load
    loadPreferences();
}); 