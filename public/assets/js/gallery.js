document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                         Page Transition (Back to Home)                     */
    /* -------------------------------------------------------------------------- */
    const backLink = document.querySelector('a[href="/"]');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.getElementById('page-transition-overlay');
            if (overlay) {
                overlay.classList.add('active');
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                
                setTimeout(() => {
                    window.location.href = backLink.href;
                }, 300);
            } else {
                window.location.href = backLink.href;
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                               Lazy Loading                                 */
    /* -------------------------------------------------------------------------- */
    const images = document.querySelectorAll('.gallery-image');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.onload = () => {
                        img.classList.add('loaded'); // For CSS transition
                        img.classList.remove('opacity-0'); // Remove Tailwind opacity-0
                        
                        // Hide skeleton loader
                        const wrapper = img.closest('.image-wrapper');
                        if (wrapper) {
                            const skeleton = wrapper.querySelector('.skeleton-loader');
                            if (skeleton) {
                                skeleton.style.display = 'none';
                            }
                        }
                    };
                    img.onerror = () => {
                         console.error(`Failed to load image: ${src}`);
                         // Optionally show an error placeholder
                    }
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '100px 0px', // Load images slightly before they come into viewport
        threshold: 0.01
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });


    /* -------------------------------------------------------------------------- */
    /*                          Download Notification                             */
    /* -------------------------------------------------------------------------- */
    const downloadBtns = document.querySelectorAll('.download-btn');
    const toast = document.getElementById('toast-notification');
    let toastTimeout;

    function showToast() {
        if (toast) {
            toast.dataset.show = 'true';
            toast.classList.remove('translate-y-[-20px]', 'opacity-0', 'hidden'); // Ensure hidden removal if using display:none

            // Clear existing timeout to prevent premature hiding
            if (toastTimeout) clearTimeout(toastTimeout);

            toastTimeout = setTimeout(() => {
                hideToast();
            }, 3000);
        }
    }

    function hideToast() {
        if (toast) {
            toast.dataset.show = 'false';
            toast.classList.add('translate-y-[-20px]', 'opacity-0');
        }
    }

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
             // Let the default link behavior happen if it's an anchor wrapper, 
             // but here we are using a button with data-href.
             // We need to trigger a download manually or wrap in <a> tag.
             e.preventDefault();
             e.stopPropagation();

             const link = btn.getAttribute('data-href');
             if (link) {
                 // Trigger download
                 const a = document.createElement('a');
                 a.href = link;
                 a.download = link.split('/').pop(); // Extract filename
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);

                 // Show Toast
                 showToast();
             }
        });
    });
});
