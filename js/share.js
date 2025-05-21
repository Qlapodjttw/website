document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    // Add animation to buttons with delay
    shareButtons.forEach((button, index) => {
        button.style.opacity = '0';
        setTimeout(() => {
            button.style.opacity = '1';
            button.classList.add('animate');
        }, index * 100); // Stagger the animations
    });

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label').toLowerCase();
            let shareUrl;

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            switch(platform) {
                case 'share on facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'share on twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'share on linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
                    break;
                case 'share via email':
                    shareUrl = `mailto:?subject=${pageTitle}&body=Check out this page: ${pageUrl}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}); 