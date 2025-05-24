// Alternative name spellings for SEO
const nameVariations = [
    "Nilashis Saha",
    "Nilashis",
    "Nilasis",
    "Nilasis Saha",
    "Nilasish",
    "Nilasish Saha"
];

// This function is used to help search engines index alternative name spellings
// It adds hidden text to the page that is only visible to search engines
function addNameVariations() {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.width = '1px';
    container.style.height = '1px';
    container.style.overflow = 'hidden';
    container.style.opacity = '0.01';
    container.setAttribute('aria-hidden', 'true');

    const heading = document.createElement('h2');
    heading.textContent = 'Also known as';
    container.appendChild(heading);

    const list = document.createElement('ul');

    nameVariations.forEach(name => {
        const item = document.createElement('li');
        item.textContent = name;
        list.appendChild(item);
    });

    container.appendChild(list);
    document.body.appendChild(container);
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addNameVariations);
