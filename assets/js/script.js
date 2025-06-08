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
function switchTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-slate-700', 'text-white');
        btn.classList.add('text-slate-600', 'hover:text-slate-300');
    });

    // Show selected tab content
    const selectedContent = document.getElementById(tabName + '-content');
    selectedContent.classList.add('active');

    // Activate selected tab button
    const selectedButton = document.getElementById(tabName + '-tab');
    selectedButton.classList.add('bg-slate-700', 'text-white');
    selectedButton.classList.remove('text-slate-600', 'hover:text-slate-300');
}

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
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
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
    const heroButtons = document.querySelectorAll('#home a');
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
window.addEventListener('load', () => {
    setTimeout(applyFadeInAnimation, 500);

    // Animate hero image
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('loaded');
        }, 200);
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
            background: linear-gradient(90deg, #1e3a8a, #1e1b4b);
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

// Add contact form functionality (if you want to add a contact form later)
function handleContactForm(event) {
    event.preventDefault();
    // Add your contact form handling logic here
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

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Mouse Scroll Indicator functionality
const scrollIndicator = document.getElementById('scroll-indicator');
let isAtTop = true;

function handleScrollIndicator() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldShow = scrollTop <= 50; // Show when within 50px of top

    if (shouldShow && !isAtTop) {
        // Show indicator
        scrollIndicator.classList.remove('hidden');
        isAtTop = true;
    } else if (!shouldShow && isAtTop) {
        // Hide indicator
        scrollIndicator.classList.add('hidden');
        isAtTop = false;
    }
}

// Initial state - show indicator if at top
document.addEventListener('DOMContentLoaded', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= 50) {
        scrollIndicator.classList.remove('hidden');
        isAtTop = true;
    } else {
        scrollIndicator.classList.add('hidden');
        isAtTop = false;
    }
});

// Listen for scroll events
window.addEventListener('scroll', handleScrollIndicator);

// Optional: Hide indicator when clicking on it
scrollIndicator.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});