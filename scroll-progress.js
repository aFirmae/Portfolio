// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', () => {
    // Create progress indicator element
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress-indicator';
    document.body.appendChild(progressIndicator);

    // Function to update scroll progress
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Calculate scroll percentage
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        // Update progress indicator width
        progressIndicator.style.width = `${scrollPercentage}%`;
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    // Initial update
    updateScrollProgress();
});

// Smooth scroll enhancement
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll to all elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Create custom smooth scroll with easing
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000; // ms
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);

                    // Easing function (easeInOutCubic)
                    const easing = percentage < 0.5
                        ? 4 * percentage * percentage * percentage
                        : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easing);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            }
        });
    });
});
