// For module version of the script
export function initMathsPage() {
    // Import the main script functionality
    const scriptElement = document.createElement('script');
    scriptElement.src = 'math.js';
    scriptElement.type = 'text/javascript';
    document.body.appendChild(scriptElement);
}

// Auto-initialize if used directly
if (typeof window !== 'undefined') {
    document.body.classList.add('loaded');
}
