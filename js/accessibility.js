// Accessibility Features
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Font size controls
        const increaseFontBtn = document.getElementById('increase-font');
        const decreaseFontBtn = document.getElementById('decrease-font');
        const body = document.body;
        let currentFontSize = 16; // Default font size

        if (!increaseFontBtn || !decreaseFontBtn) {
            console.error('Font size control buttons not found');
            return;
        }

        increaseFontBtn.addEventListener('click', () => {
            currentFontSize = Math.min(currentFontSize + 2, 24);
            body.style.fontSize = `${currentFontSize}px`;
            savePreferences();
        });

        decreaseFontBtn.addEventListener('click', () => {
            currentFontSize = Math.max(currentFontSize - 2, 12);
            body.style.fontSize = `${currentFontSize}px`;
            savePreferences();
        });

        // High contrast mode
        const highContrastBtn = document.getElementById('high-contrast');
        if (highContrastBtn) {
            highContrastBtn.addEventListener('click', () => {
                body.classList.toggle('high-contrast');
                const isHighContrast = body.classList.contains('high-contrast');
                highContrastBtn.setAttribute('aria-pressed', isHighContrast);
                savePreferences();
            });
        }

        // Screen reader mode
        const screenReaderBtn = document.getElementById('screen-reader');
        if (screenReaderBtn) {
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
                savePreferences();
            });
        }

        // Dyslexia-friendly font
        const dyslexiaBtn = document.getElementById('dyslexia-friendly');
        if (dyslexiaBtn) {
            dyslexiaBtn.addEventListener('click', () => {
                body.classList.toggle('dyslexia-friendly');
                const isDyslexiaFriendly = body.classList.contains('dyslexia-friendly');
                dyslexiaBtn.setAttribute('aria-pressed', isDyslexiaFriendly);
                savePreferences();
            });
        }

        // Dark mode toggle
        const darkModeBtn = document.getElementById('dark-mode');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDarkMode = body.classList.contains('dark-mode');
                darkModeBtn.setAttribute('aria-pressed', isDarkMode);
                savePreferences();
            });
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
                    highContrast: body.classList.contains('high-contrast'),
                    screenReader: body.classList.contains('screen-reader-mode'),
                    dyslexiaFriendly: body.classList.contains('dyslexia-friendly'),
                    darkMode: body.classList.contains('dark-mode')
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
                    body.style.fontSize = `${currentFontSize}px`;
                    
                    if (preferences.highContrast && highContrastBtn) {
                        body.classList.add('high-contrast');
                        highContrastBtn.setAttribute('aria-pressed', 'true');
                    }
                    
                    if (preferences.screenReader && screenReaderBtn) {
                        body.classList.add('screen-reader-mode');
                        screenReaderBtn.setAttribute('aria-pressed', 'true');
                    }
                    
                    if (preferences.dyslexiaFriendly && dyslexiaBtn) {
                        body.classList.add('dyslexia-friendly');
                        dyslexiaBtn.setAttribute('aria-pressed', 'true');
                    }

                    if (preferences.darkMode && darkModeBtn) {
                        body.classList.add('dark-mode');
                        darkModeBtn.setAttribute('aria-pressed', 'true');
                    }
                }
            } catch (error) {
                console.error('Error loading preferences:', error);
            }
        }

        // Save preferences when they change
        const buttons = [increaseFontBtn, decreaseFontBtn, highContrastBtn, screenReaderBtn, dyslexiaBtn, darkModeBtn].filter(Boolean);
        buttons.forEach(btn => {
            btn.addEventListener('click', savePreferences);
        });

        // Load preferences on page load
        loadPreferences();

    } catch (error) {
        console.error('Error initializing accessibility features:', error);
    }
}); 