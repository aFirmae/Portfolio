// PDF Data
const pdfData = [
    {
        title: "Formulation of ODE",
        unit: "Ordinary Differential Equations",
        file: "Formulation of ODE.pdf",
        available: true
    },
    {
        title: "Arithmetic Progressions",
        unit: "Sequence and Series",
        file: null,
        available: false
    },
    {
        title: "Geometric Progressions",
        unit: "Sequence and Series",
        file: null,
        available: false
    },
    {
        title: "Infinite Series",
        unit: "Sequence and Series",
        file: null,
        available: false
    },
    {
        title: "Complex Plane",
        unit: "Complex Numbers",
        file: null,
        available: false
    },
    {
        title: "Polar Form",
        unit: "Complex Numbers",
        file: null,
        available: false
    },
    {
        title: "Complex Functions",
        unit: "Complex Numbers",
        file: null,
        available: false
    },
    {
        title: "First Order ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false
    },
    {
        title: "Higher Order ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false
    },
    {
        title: "Vector Fields",
        unit: "Vector Calculus",
        file: null,
        available: false
    },
    {
        title: "Line Integrals",
        unit: "Vector Calculus",
        file: null,
        available: false
    },
    {
        title: "Green's Theorem",
        unit: "Vector Calculus",
        file: null,
        available: false
    }
];

// Search Functionality
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');

        this.bindEvents();
    }

    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length === 0) {
                this.hideResults();
                return;
            }

            this.showResults(this.search(query));
        });

        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });
    }

    search(query) {
        return pdfData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.unit.toLowerCase().includes(query)
        );
    }

    showResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="glass-card rounded-lg p-4 mt-2">
                    <p class="text-slate-400">No results found</p>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map(item => `
                <div class="glass-card rounded-lg p-4 mt-2 cursor-pointer hover:bg-slate-700/50 transition-colors search-result-item" 
                     data-unit="${item.unit}" data-title="${item.title}" data-available="${item.available}">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-white font-semibold">${item.title}</h3>
                            <p class="text-slate-400 text-sm">${item.unit}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 rounded-full text-xs ${item.available ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'}">
                                ${item.available ? 'Available' : 'Coming Soon'}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.searchResults.classList.remove('hidden');

        // Add click handlers to search results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const isAvailable = item.dataset.available === 'true';
                if (isAvailable) {
                    const title = item.dataset.title;
                    const pdfItem = pdfData.find(pdf => pdf.title === title);
                    if (pdfItem && pdfItem.file) {
                        // Open PDF in new tab instead of modal viewer
                        openInNewTabDirect(pdfItem.file);
                    }
                }
                this.hideResults();
                this.searchInput.value = '';
            });
        });
    }

    hideResults() {
        this.searchResults.classList.add('hidden');
    }
}

// Utility functions for download and open in new tab
function downloadPDFDirect(filename) {
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openInNewTabDirect(filename) {
    window.open(filename, '_blank');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash by showing body after DOM is ready
    document.body.classList.add('loaded');

    // Initialize search functionality
    new SearchManager();

    // Add PDF button event handlers
    document.addEventListener('click', (e) => {
        if (e.target.closest('.download-pdf-btn')) {
            const pdfItem = e.target.closest('.pdf-item');
            const pdfFile = pdfItem.dataset.pdf;
            downloadPDFDirect(pdfFile);
        }

        if (e.target.closest('.open-new-tab-btn')) {
            const pdfItem = e.target.closest('.pdf-item');
            const pdfFile = pdfItem.dataset.pdf;
            openInNewTabDirect(pdfFile);
        }
    });

    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Improved intersection observer to reduce conflicts and flashing
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe fade-in elements with staggered delay to prevent flash
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            observer.observe(el);
        }, index * 50 + 200); // Stagger animations
    });
});