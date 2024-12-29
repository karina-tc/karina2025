function initializeUnderline() {
    const nav = document.querySelector('.menu-container');
    const underline = nav?.querySelector('.dynamic-underline') as HTMLElement;
    const links = nav?.querySelectorAll('a');
    const activeLink = nav?.querySelector('a.active');

    function updateUnderline(link: Element | null) {
        if (!link || !underline || !nav) return;
        
        // Get the relative position within the nav container
        const linkRect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        
        // Account for any scrolling
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Calculate position relative to the nav container
        const left = linkRect.left - navRect.left + nav.scrollLeft;
        
        underline.style.setProperty('--left', `${left}px`);
        underline.style.setProperty('--width', `${linkRect.width}px`);
    }
    // Set initial position
    updateUnderline(activeLink ?? null);

    // Add event listeners
    links?.forEach(link => {
        link.addEventListener('mouseenter', () => updateUnderline(link));
    });
    nav?.addEventListener('mouseleave', () => {
        updateUnderline(activeLink ?? null);
    });

    // Update on resize
    window.addEventListener('resize', () => {
        updateUnderline(activeLink ?? null);
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeUnderline); 