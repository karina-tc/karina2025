function initializeUnderline() {
    const nav = document.querySelector('.menu-container');
    const underline = nav?.querySelector('.dynamic-underline') as HTMLElement;
    const links = nav?.querySelectorAll('a');
    const activeLink = nav?.querySelector('a.active');

    function updateUnderline(link: Element | null) {
        if (!link || !underline || !nav) return;
        const rect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        underline.style.setProperty('--left', `${rect.left - navRect.left}px`);
        underline.style.setProperty('--width', `${rect.width}px`);
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