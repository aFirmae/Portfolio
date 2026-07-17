// Enhanced Mobile menu toggle with animations
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    // Toggle hamburger animation
    mobileMenuBtn.classList.toggle('active');

    // Toggle mobile menu
    mobileMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll('.mobile-menu-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Escape':
            // Close mobile menu
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Close context menu
            contextMenu.classList.remove('active');
            break;

        case 'Home':
            if (e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            break;

        case 'End':
            if (e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
            break;
    }
});

// Tab switching functionality
// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active text classes from all tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('text-white');
        btn.classList.add('text-gray-500', 'hover:text-gray-900');
    });

    // Show selected tab content
    const selectedContent = document.getElementById(tabName + '-content');
    if(selectedContent) selectedContent.classList.add('active');

    // Activate selected tab button text
    const selectedButton = document.getElementById(tabName + '-tab');
    if (selectedButton) {
        selectedButton.classList.add('text-white');
        selectedButton.classList.remove('text-gray-500', 'hover:text-gray-900');

        // Move the animated background indicator
        const indicator = document.getElementById('tab-indicator');
        if (indicator) {
            indicator.style.width = selectedButton.offsetWidth + 'px';
            indicator.style.transform = `translateX(${selectedButton.offsetLeft - 8}px)`; // -8px for container padding
        }

        // Remember the active tab for page reloads
        sessionStorage.setItem('activeExperienceTab', tabName);
    }
}

// Initialize tab indicator on load
window.addEventListener('DOMContentLoaded', () => {
    // Fetch previously active tab or default to 'work'
    const savedTab = sessionStorage.getItem('activeExperienceTab') || 'work';
    const activeTabEl = document.getElementById(savedTab + '-tab');
    
    if (activeTabEl) {
        // Wait for fonts to load to ensure layout dimensions are correct
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setTimeout(() => switchTab(savedTab), 50);
            });
        } else {
            // Fallback delay
            setTimeout(() => switchTab(savedTab), 200);
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Use a larger offset for mobile devices
            const isMobile = window.innerWidth < 768;
            const headerOffset = isMobile ? 120 : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'; // Tailwind shadow-md
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .timeline-dot, .skill-tag');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Apple-style fade-in animation for hero section
function applyFadeInAnimation() {
    const heroTitle = document.querySelector('#home h1');
    const heroSubtitle = document.querySelector('#home p');
    const heroButtons = document.querySelectorAll('#home .animate-on-load');
    const heroSocial = document.querySelector('#home .flex.justify-center.space-x-6');

    // Apply initial styles
    [heroTitle, heroSubtitle, ...heroButtons, heroSocial].forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

            // Stagger the animations
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        }
    });
}

// Initialize animation when page loads
function initHeroAnimations() {
    setTimeout(applyFadeInAnimation, 500);
}

window.addEventListener('load', initHeroAnimations);

// Handle browser back button (BFCache)
window.addEventListener('pageshow', (e) => {
    // If the page is restored from cache, re-trigger the animations
    if (e.persisted) {
        initHeroAnimations();
        
        // Also clear any transition overlays if they were active
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.classList.add('opacity-0', 'pointer-events-none');
        }
    }
});

// Add scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrollPercent}%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    // Use a more subtle parallax effect on mobile
    const isMobile = window.innerWidth < 768;
    const rate = isMobile ? scrolled * -0.2 : scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click effect to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .tab-content {
        animation: fadeInUp 0.5s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
}

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });


// Fetch LeetCode Stats (Tashif API + Error Handling)
document.addEventListener('DOMContentLoaded', () => {
    const username = 'aFirma';
    const card = document.getElementById('leetcode-card');

    async function fetchLeetCodeStats() {
        const cacheKey = 'leetcode_stats_cache';
        const cacheDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

        const updateUI = (statsData, profileData) => {
            // Helper to update text safely
            const updateText = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.innerText = text;
            };

            // Update text content
            updateText('leetcode-total', statsData.totalSolved);
            updateText('leetcode-rank', statsData.ranking.toLocaleString());

            // Detailed stats & Denominators from API
            updateText('leetcode-easy', statsData.easySolved);
            updateText('leetcode-total-easy', statsData.totalEasy);

            updateText('leetcode-medium', statsData.mediumSolved);
            updateText('leetcode-total-medium', statsData.totalMedium);

            updateText('leetcode-hard', statsData.hardSolved);
            updateText('leetcode-total-hard', statsData.totalHard);

            // Progress Bars
            const updateBar = (id, pct) => {
                const el = document.getElementById(id);
                if (el) el.style.width = `${pct}%`;
            };

            updateBar('leetcode-easy-bar', (statsData.easySolved / statsData.totalEasy) * 100);
            updateBar('leetcode-medium-bar', (statsData.mediumSolved / statsData.totalMedium) * 100);
            updateBar('leetcode-hard-bar', (statsData.hardSolved / statsData.totalHard) * 100);

            // Acceptance Rate
            updateText('leetcode-acceptance', `${statsData.acceptanceRate}%`);
            // Badges
            updateText('leetcode-badges', profileData.badges.length);
        };

        try {
            // Check cache first
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                const { statsData, profileData, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < cacheDuration) {
                    updateUI(statsData, profileData);
                    return;
                }
            }

            // Fetch from API if no valid cache
            const statsPromise = fetch(`https://leetcode-stats.tashif.codes/${username}`);
            const profilePromise = fetch(`https://leetcode-stats.tashif.codes/${username}/profile`);

            const [statsRes, profileRes] = await Promise.all([statsPromise, profilePromise]);
            const statsData = await statsRes.json();
            const profileData = await profileRes.json();

            if (statsData.status === 'success' && profileData.status === 'success') {
                updateUI(statsData, profileData);
                // Save to session storage
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    statsData,
                    profileData,
                    timestamp: Date.now()
                }));
            } else {
                throw new Error('API Error');
            }
        } catch (err) {
            console.error('Error fetching LeetCode stats:', err);
            // Error Fallback UI
            card.innerHTML = `
                <div class="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">LEETCODE</div>
                
                <div class="flex items-center mb-8">
                    <div class="w-12 h-12 md:w-16 md:h-16 border-2 border-gray-100 rounded-lg flex items-center justify-center mr-4 shadow-lg shadow-black-100 flex-shrink-0">
                        <img src="/assets/images/leetcode.svg" alt="LeetCode" class="w-8 h-8 md:w-10 md:h-10">
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">Competitive Programmer</h3>
                        <p class="text-gray-500">Unleashing Algorithms</p>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center py-6 text-center">
                    <div class="bg-red-50 p-4 rounded-full mb-4 animate-bounce">
                        <i class="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                    </div>
                    <h4 class="text-xl font-bold text-gray-800 mb-2">Stats Temporarily Unavailable</h4>
                    <p class="text-gray-500 mb-6 max-w-xs text-sm">Couldn't fetch the latest stats right now, but you can verify my skills directly on LeetCode.</p>
                    <a href="https://leetcode.com/u/${username}/" target="_blank" class="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        View Full Profile <i class="fas fa-external-link-alt ml-2"></i>
                    </a>
                </div>
            `;
        }
    }

    fetchLeetCodeStats();
});

// Custom Context Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.getElementById('hero-image');
    const contextMenu = document.getElementById('custom-context-menu');

    if (heroImage && contextMenu) {
        heroImage.addEventListener('contextmenu', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const radius = rect.width / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

            if (distance > radius) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            hideContextMenu();

            // Calculate position
            let x = e.clientX;
            let y = e.clientY;

            // Adjust if menu goes off screen
            const menuWidth = contextMenu.offsetWidth || 192; // Fallback to w-48 (12rem = 192px)
            const menuHeight = contextMenu.offsetHeight || 100; // Approx height
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (x + menuWidth > windowWidth) {
                x = windowWidth - menuWidth - 10;
            }

            if (y + menuHeight > windowHeight) {
                y = windowHeight - menuHeight - 10;
            }

            // Set position and show
            contextMenu.style.left = `${x}px`;
            contextMenu.style.top = `${y}px`;
            contextMenu.classList.remove('hidden');
            
            // Small delay to allow display:block to apply before transition
            requestAnimationFrame(() => {
                contextMenu.classList.add('active');
                contextMenu.classList.remove('opacity-0', 'scale-95');
            });
        });

        document.addEventListener('click', (e) => {
            if (!contextMenu.contains(e.target)) {
                hideContextMenu();
            }
        });

        document.addEventListener('contextmenu', (e) => {
            if (e.target !== heroImage) {
                hideContextMenu();
            }
        });

        // Handle Download Item Click
        const downloadLink = contextMenu.querySelector('a[download]');
        if (downloadLink) {
            downloadLink.addEventListener('click', () => {
                hideContextMenu();
                showToast('Image download started');
            });
        }

        // Handle View Gallery Click
        const galleryLink = contextMenu.querySelector('a[href="/gallery"]');
        if (galleryLink) {
            galleryLink.addEventListener('click', (e) => {
                e.preventDefault();
                hideContextMenu();
                
                const overlay = document.getElementById('page-transition-overlay');
                if (overlay) {
                    overlay.classList.add('active'); // Start fade to white
                    overlay.classList.remove('opacity-0', 'pointer-events-none');
                    
                    setTimeout(() => {
                        window.location.href = galleryLink.href;
                    }, 300); // Wait for transition duration
                } else {
                     window.location.href = galleryLink.href;
                }
            });
        }

        // Hide menu on scroll
        window.addEventListener('scroll', () => {
            hideContextMenu();
        });

        function hideContextMenu() {
            if (contextMenu.classList.contains('active')) {
                contextMenu.classList.remove('active');
                contextMenu.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    // Only hide if it hasn't been re-opened
                    if (!contextMenu.classList.contains('active')) {
                        contextMenu.classList.add('hidden');
                    }
                }, 200);
            } else {
                 // Ensure it's hidden if not active
                 contextMenu.classList.add('hidden');
            }
        }
    }
});

// Toast Notification Function
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = toast.querySelector('p');

    // Update message if provided
    if (message) {
        toastMessage.textContent = message;
    }

    // Show toast
    toast.classList.remove('hidden');
    // Small delay to allow display:block to apply before transition
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-y-[-20px]');
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-[-20px]');

        // Wait for transition to finish before hiding element
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Project Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active state of buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Save to sessionStorage
            sessionStorage.setItem('activeProjectFilter', filter);

            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') ? card.getAttribute('data-category').split(' ') : [];

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Restore saved filter
    const savedFilter = sessionStorage.getItem('activeProjectFilter');
    if (savedFilter) {
        const targetBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === savedFilter);
        if (targetBtn) {
            targetBtn.click();
        }
    }
});
