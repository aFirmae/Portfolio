// Constellation Background
class ConstellationBackground {
    constructor() {
        this.container = document.getElementById('constellation');
        this.stars = [];
        this.lines = [];
        this.mousePosition = { x: 0, y: 0 };

        this.init();
        this.bindEvents();
    }

    init() {
        this.createStars();
        this.createLines();
        this.animate();
    }

    createStars() {
        const numStars = window.innerWidth < 768 ? 50 : 100;

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = '0px';
            star.style.top = '0px';
            star.style.transform = `translate(${x}%, ${y}%)`;
            star.style.animationDelay = Math.random() * 3 + 's';

            this.container.appendChild(star);
            this.stars.push({
                element: star,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1
            });
        }
    }

    createLines() {
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const distance = this.getDistance(this.stars[i], this.stars[j]);
                if (distance < 20 && Math.random() > 0.7) {
                    this.createLine(this.stars[i], this.stars[j]);
                }
            }
        }
    }

    createLine(star1, star2) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        this.container.appendChild(line);

        this.lines.push({
            element: line,
            star1: star1,
            star2: star2
        });

        this.updateLine(line, star1, star2);
    }

    updateLine(line, star1, star2) {
        const x1 = (star1.x / 100) * window.innerWidth;
        const y1 = (star1.y / 100) * window.innerHeight;
        const x2 = (star2.x / 100) * window.innerWidth;
        const y2 = (star2.y / 100) * window.innerHeight;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}deg)`;
    }

    getDistance(star1, star2) {
        return Math.sqrt((star1.x - star2.x) ** 2 + (star1.y - star2.y) ** 2);
    }

    animate() {
        // Use requestAnimationFrame for smoother animations and reduce flashing
        this.animationId = requestAnimationFrame(() => this.animate());

        this.stars.forEach(star => {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0 || star.x > 100) star.vx *= -1;
            if (star.y < 0 || star.y > 100) star.vy *= -1;

            // Use transform for better performance
            star.element.style.transform = `translate(${star.x}%, ${star.y}%)`;
        });

        // Update lines less frequently for better performance
        if (this.frameCount % 2 === 0) {
            this.lines.forEach(line => {
                this.updateLine(line.element, line.star1, line.star2);
            });
        }
        this.frameCount = (this.frameCount || 0) + 1;
    }

    // Add cleanup method
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.container.innerHTML = '';
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;

            this.stars.forEach(star => {
                const rect = star.element.getBoundingClientRect();
                const starCenterX = rect.left + rect.width / 2;
                const starCenterY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    (starCenterX - this.mousePosition.x) ** 2 +
                    (starCenterY - this.mousePosition.y) ** 2
                );

                if (distance < 100) {
                    star.element.style.background = '#60a5fa';
                    star.element.style.transform = `translate(${star.x}%, ${star.y}%) scale(1.5)`;
                    star.element.style.boxShadow = '0 0 15px #60a5fa';
                } else {
                    star.element.style.background = '#94a3b8';
                    star.element.style.transform = `translate(${star.x}%, ${star.y}%) scale(1)`;
                    star.element.style.boxShadow = 'none';
                }
            });
        });

        window.addEventListener('resize', () => {
            this.lines.forEach(line => {
                this.updateLine(line.element, line.star1, line.star2);
            });
        });
    }
}

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
                        pdfViewer.openPDF(pdfItem.file, pdfItem.title);
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

// Utility function to detect OS and get appropriate modifier key
function getModifierKey() {
    const platform = navigator.platform.toLowerCase();
    const isMac = platform.includes('mac') || platform.includes('darwin');
    return isMac ? 'Cmd' : 'Ctrl';
}

// Set OS-specific tooltips
function setOSSpecificTooltips() {
    const modifier = getModifierKey();
    
    // Set zoom button tooltips
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetZoomBtn = document.getElementById('resetZoomBtn');
    
    if (zoomInBtn) zoomInBtn.title = `Zoom in (${modifier} + +)`;
    if (zoomOutBtn) zoomOutBtn.title = `Zoom out (${modifier} + -)`;
    if (resetZoomBtn) resetZoomBtn.title = `Reset zoom (${modifier} + 0)`;
}
class PDFViewer {
    constructor() {
        this.modal = document.getElementById('pdfModal');
        this.canvas = document.getElementById('pdfCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.modalTitle = document.getElementById('modalTitle');
        this.pageInfo = document.getElementById('pageInfo');

        this.currentPDF = null;
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentFile = '';
        this.resizeTimeout = null;
        this.currentScale = 1;
        this.baseScale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.scaleStep = 0.2;

        this.bindEvents();
    }

    bindEvents() {
        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Navigation
        document.getElementById('prevPage').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPage();
            }
        });

        document.getElementById('nextPage').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.renderPage();
            }
        });

        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            this.zoomIn();
        });

        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            this.zoomOut();
        });

        document.getElementById('resetZoomBtn').addEventListener('click', () => {
            this.resetZoom();
        });

        // Download button in modal
        document.getElementById('downloadModalBtn').addEventListener('click', () => {
            this.downloadPDF();
        });

        // New tab button in modal
        document.getElementById('newTabModalBtn').addEventListener('click', () => {
            this.openInNewTab();
        });

        // PDF item buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-pdf-btn')) {
                const pdfItem = e.target.closest('.pdf-item');
                const pdfFile = pdfItem.dataset.pdf;
                const title = pdfItem.dataset.title;
                this.openPDF(pdfFile, title);
            }

            if (e.target.closest('.download-pdf-btn')) {
                const pdfItem = e.target.closest('.pdf-item');
                const pdfFile = pdfItem.dataset.pdf;
                this.downloadPDFDirect(pdfFile);
            }

            if (e.target.closest('.open-new-tab-btn')) {
                const pdfItem = e.target.closest('.pdf-item');
                const pdfFile = pdfItem.dataset.pdf;
                this.openInNewTabDirect(pdfFile);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('hidden')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        this.renderPage();
                    }
                    break;
                case 'ArrowRight':
                    if (this.currentPage < this.totalPages) {
                        this.currentPage++;
                        this.renderPage();
                    }
                    break;
                case '=':
                case '+':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.zoomIn();
                    }
                    break;
                case '-':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.zoomOut();
                    }
                    break;
                case '0':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.resetZoom();
                    }
                    break;
            }
        });

        // Window resize handler for PDF canvas
        window.addEventListener('resize', () => {
            if (!this.modal.classList.contains('hidden') && this.currentPDF) {
                // Debounce resize to avoid too many redraws
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.calculateBaseScale();
                    this.renderPage();
                }, 150);
            }
        });
    }

    async openPDF(filename, title) {
        try {
            // Set modal content
            this.modalTitle.textContent = title;
            this.currentFile = filename;

            // Show modal smoothly without flashing
            this.modal.classList.remove('hidden');

            // Use requestAnimationFrame to prevent flashing
            requestAnimationFrame(() => {
                this.modal.style.opacity = '1';
            });

            // Show loading state
            this.pageInfo.textContent = 'Loading PDF...';

            // Clear previous canvas to prevent flashing
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const loadingTask = pdfjsLib.getDocument(filename);
            this.currentPDF = await loadingTask.promise;
            this.totalPages = this.currentPDF.numPages;
            this.currentPage = 1;

            // Calculate initial scale
            this.calculateBaseScale();
            this.currentScale = this.baseScale;

            await this.renderPage();

        } catch (error) {
            console.error('Error loading PDF:', error);
            this.pageInfo.textContent = 'Error loading PDF';
            alert('Error loading PDF. Please make sure the file exists and try again.');
            this.closeModal();
        }
    }

    calculateBaseScale() {
        if (!this.currentPDF) return;

        // Get container dimensions
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth - 40; // Account for padding
        const containerHeight = container.clientHeight - 40;

        // Get page dimensions at scale 1
        this.currentPDF.getPage(this.currentPage).then(page => {
            const viewport = page.getViewport({ scale: 1 });
            const scaleX = containerWidth / viewport.width;
            const scaleY = containerHeight / viewport.height;
            this.baseScale = Math.min(scaleX, scaleY, 1.5); // Max base scale of 1.5
        });
    }

    async renderPage() {
        if (!this.currentPDF) return;

        try {
            const page = await this.currentPDF.getPage(this.currentPage);

            // Use current scale for rendering
            const finalScale = this.baseScale * this.currentScale;
            const scaledViewport = page.getViewport({ scale: finalScale });

            // Set canvas dimensions
            this.canvas.width = scaledViewport.width;
            this.canvas.height = scaledViewport.height;

            // Set canvas style dimensions for proper display
            this.canvas.style.width = scaledViewport.width + 'px';
            this.canvas.style.height = scaledViewport.height + 'px';

            // Clear canvas before rendering to prevent flashing
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const renderContext = {
                canvasContext: this.ctx,
                viewport: scaledViewport
            };

            await page.render(renderContext).promise;

            // Update page info with zoom level
            const zoomPercent = Math.round(this.currentScale * 100);
            this.pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages} (${zoomPercent}%)`;

            // Update navigation buttons
            this.updateNavigationButtons();

        } catch (error) {
            console.error('Error rendering page:', error);
            this.pageInfo.textContent = 'Error loading page';
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        if (this.currentPage === 1) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        if (this.currentPage === this.totalPages) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }

        // Update zoom buttons
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');

        if (this.currentScale >= this.maxScale) {
            zoomInBtn.style.opacity = '0.5';
            zoomInBtn.style.cursor = 'not-allowed';
        } else {
            zoomInBtn.style.opacity = '1';
            zoomInBtn.style.cursor = 'pointer';
        }

        if (this.currentScale <= this.minScale) {
            zoomOutBtn.style.opacity = '0.5';
            zoomOutBtn.style.cursor = 'not-allowed';
        } else {
            zoomOutBtn.style.opacity = '1';
            zoomOutBtn.style.cursor = 'pointer';
        }
    }

    zoomIn() {
        if (this.currentScale < this.maxScale) {
            this.currentScale = Math.min(this.currentScale + this.scaleStep, this.maxScale);
            // Use requestAnimationFrame to prevent flashing
            requestAnimationFrame(() => {
                this.renderPage();
            });
        }
    }

    zoomOut() {
        if (this.currentScale > this.minScale) {
            this.currentScale = Math.max(this.currentScale - this.scaleStep, this.minScale);
            // Use requestAnimationFrame to prevent flashing
            requestAnimationFrame(() => {
                this.renderPage();
            });
        }
    }

    resetZoom() {
        if (this.currentScale !== 1) {
            this.currentScale = 1;
            // Use requestAnimationFrame to prevent flashing
            requestAnimationFrame(() => {
                this.renderPage();
            });
        }
    }

    closeModal() {
        // Smooth close without flashing
        this.modal.style.opacity = '0';

        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.modal.style.opacity = '';

            // Clean up PDF resources
            if (this.currentPDF) {
                this.currentPDF.cleanup?.();
            }

            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvas.width = 0;
            this.canvas.height = 0;

            // Reset state
            this.currentPDF = null;
            this.currentPage = 1;
            this.totalPages = 0;
            this.currentFile = '';
            this.currentScale = 1;
            this.baseScale = 1;
            this.pageInfo.textContent = '';

        }, 250);
    }

    downloadPDF() {
        if (this.currentFile) {
            this.downloadPDFDirect(this.currentFile);
        }
    }

    downloadPDFDirect(filename) {
        const link = document.createElement('a');
        link.href = filename;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    openInNewTab() {
        if (this.currentFile) {
            this.openInNewTabDirect(this.currentFile);
        }
    }

    openInNewTabDirect(filename) {
        window.open(filename, '_blank');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash by showing body after DOM is ready
    document.body.classList.add('loaded');

    // Set OS-specific tooltips
    setOSSpecificTooltips();

    // Initialize constellation background
    new ConstellationBackground();

    // Initialize search functionality
    new SearchManager();

    // Initialize PDF viewer
    window.pdfViewer = new PDFViewer();

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

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';