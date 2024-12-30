function initializeUnderline() {
    const nav = document.querySelector('.menu-container');
    const underline = nav?.querySelector('.dynamic-underline') as HTMLElement;
    const links = nav?.querySelectorAll('a');
    const activeLink = nav?.querySelector('a.active');

    function updateUnderline(link: Element | null) {
        if (!link || !underline || !nav) return;
        // Force a reflow to ensure accurate measurements
        void (nav as HTMLElement).offsetHeight;
        
        const span = link.querySelector('span');
        const spanRect = span?.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        
        if (spanRect) {
            const left = Math.round(spanRect.left - navRect.left);
            const width = Math.round(spanRect.width);
            
            requestAnimationFrame(() => {
                underline.style.setProperty('--left', `${left}px`);
                underline.style.setProperty('--width', `${width}px`);
            });
        }
    }

    // Initialize with a slight delay to ensure all styles are applied
    setTimeout(() => {
        updateUnderline(activeLink ?? null);
    }, 0);
    
    links?.forEach(link => {
        link.addEventListener('mouseenter', () => updateUnderline(link));
    });
    
    nav?.addEventListener('mouseleave', () => {
        updateUnderline(activeLink ?? null);
    });

    window.addEventListener('resize', () => {
        updateUnderline(activeLink ?? null);
    });

    // Update on page load and when all resources are loaded
    window.addEventListener('load', () => {
        updateUnderline(activeLink ?? null);
    });
}

// Ensure the function runs when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeUnderline); 