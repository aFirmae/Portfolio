// PDF Data
const pdfData = [
    {
        title: "Formulation of ODE",
        unit: "Ordinary Differential Equations",
        file: "Formulation of ODE.pdf",
        available: true,
        icon: "fas fa-file-alt"
    },
    // Sequence and Series
    {
        title: "Arithmetic Progressions",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-calculator"
    },
    {
        title: "Geometric Progressions",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-chart-line"
    },
    {
        title: "Infinite Series",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-infinity"
    },
    {
        title: "Convergence Tests",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-square-root-alt"
    },
    {
        title: "Fourier Series",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-wave-square"
    },
    {
        title: "Power Series",
        unit: "Sequence and Series",
        file: null,
        available: false,
        icon: "fas fa-function"
    },
    // Complex Numbers
    {
        title: "Complex Plane",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-project-diagram"
    },
    {
        title: "Polar Form",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-compass"
    },
    {
        title: "Complex Functions",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-function"
    },
    {
        title: "Complex Conjugates",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-sync"
    },
    {
        title: "Roots of Unity",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-square-root-alt"
    },
    {
        title: "Cauchy-Riemann Equations",
        unit: "Complex Numbers",
        file: null,
        available: false,
        icon: "fas fa-chart-area"
    },
    // Ordinary Differential Equations
    {
        title: "First Order ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-sort-numeric-down"
    },
    {
        title: "Higher Order ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-layer-group"
    },
    {
        title: "Separable Equations",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-divide"
    },
    {
        title: "Linear ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-random"
    },
    {
        title: "Laplace Transforms",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-exchange-alt"
    },
    {
        title: "Systems of ODEs",
        unit: "Ordinary Differential Equations",
        file: null,
        available: false,
        icon: "fas fa-project-diagram"
    },
    // Vector Calculus
    {
        title: "Vector Fields",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-arrows-alt"
    },
    {
        title: "Line Integrals",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-route"
    },
    {
        title: "Green's Theorem",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-draw-polygon"
    },
    {
        title: "Surface Integrals",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-cube"
    },
    {
        title: "Divergence Theorem",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-expand-arrows-alt"
    },
    {
        title: "Stokes' Theorem",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-sync-alt"
    },
    {
        title: "Curl and Divergence",
        unit: "Vector Calculus",
        file: null,
        available: false,
        icon: "fas fa-tornado"
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
                <div class="glass-card rounded-lg p-4 mt-2 cursor-pointer hover:bg-slate-700/50 transition-colors search-result-item ${!item.available ? 'opacity-60' : ''}" 
                     data-unit="${item.unit}" data-title="${item.title}" data-available="${item.available}" data-file="${item.file || ''}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="${item.icon} ${item.available ? 'text-green-400' : 'text-slate-400'} mr-3"></i>
                            <div>
                                <h3 class="text-white font-semibold">${item.title}</h3>
                                <p class="text-slate-400 text-sm">${item.unit}</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            ${item.available ? `
                                <button class="p-2 icon-btn-download transition-all duration-300" title="Download PDF">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="p-2 icon-btn-external transition-all duration-300" title="Open in new tab">
                                    <i class="fas fa-external-link-alt"></i>
                                </button>
                            ` : `
                                <button class="p-2 text-slate-500 cursor-not-allowed" title="Not available">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="p-2 text-slate-500 cursor-not-allowed" title="Not available">
                                    <i class="fas fa-external-link-alt"></i>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.searchResults.classList.remove('hidden');

        // Add click handlers to search results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            const isAvailable = item.dataset.available === 'true';

            if (isAvailable) {
                // Add click handler for available items
                item.addEventListener('click', (e) => {
                    // Check if click was on download or external link button
                    if (e.target.closest('.icon-btn-download')) {
                        e.stopPropagation();
                        const file = item.dataset.file;
                        if (file) downloadPDFDirect(file);
                        return;
                    }

                    if (e.target.closest('.icon-btn-external')) {
                        e.stopPropagation();
                        const file = item.dataset.file;
                        if (file) openInNewTabDirect(file);
                        return;
                    }

                    // Default click action - open in new tab
                    const file = item.dataset.file;
                    if (file) openInNewTabDirect(file);

                    this.hideResults();
                    this.searchInput.value = '';
                });

                // Add specific button handlers
                const downloadBtn = item.querySelector('.icon-btn-download');
                const externalBtn = item.querySelector('.icon-btn-external');

                if (downloadBtn) {
                    downloadBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const file = item.dataset.file;
                        if (file) downloadPDFDirect(file);
                    });
                }

                if (externalBtn) {
                    externalBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const file = item.dataset.file;
                        if (file) openInNewTabDirect(file);
                    });
                }
            }
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