import { animationManager } from './utils.js';

class ShareManager {
    constructor() {
        this.shareButtons = document.querySelectorAll('.share-btn');
        this.pageUrl = encodeURIComponent(window.location.href);
        this.pageTitle = encodeURIComponent(document.title);
    }

    init() {
        this.setupShareButtons();
        this.animateButtons();
    }

    setupShareButtons() {
        this.shareButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleShare(e));
        });
    }

    animateButtons() {
        this.shareButtons.forEach((button, index) => {
            button.style.opacity = '0';
            setTimeout(() => {
                button.style.opacity = '1';
                button.classList.add('animate');
            }, index * 100);
        });
    }

    handleShare(event) {
        const button = event.currentTarget;
        const platform = button.getAttribute('aria-label').toLowerCase();
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        const shareUrl = this.getShareUrl(platform);
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    getShareUrl(platform) {
        switch(platform) {
            case 'share on facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${this.pageUrl}`;
            case 'share on twitter':
                return `https://twitter.com/intent/tweet?url=${this.pageUrl}&text=${this.pageTitle}`;
            case 'share on linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${this.pageUrl}&title=${this.pageTitle}`;
            case 'share via email':
                return `mailto:?subject=${this.pageTitle}&body=Check out this page: ${this.pageUrl}`;
            default:
                return null;
        }
    }
}

// Initialize share functionality
document.addEventListener('DOMContentLoaded', () => {
    const shareManager = new ShareManager();
    shareManager.init();
}); 