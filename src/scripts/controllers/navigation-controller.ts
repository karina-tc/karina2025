function initializeUnderline() {
    const nav = document.querySelector('.menu-container');
    const underline = nav?.querySelector('.dynamic-underline') as HTMLElement;
    const links = nav?.querySelectorAll('a');
    const activeLink = nav?.querySelector('a.active');
    
    // Use ResizeObserver instead of window.resize
    const resizeObserver = new ResizeObserver(updateActiveUnderline);
    if (nav) resizeObserver.observe(nav);
    
    // Use requestAnimationFrame for smooth animations
    let rafId: number;
    
    function updateUnderline(link: Element | null) {
        if (!link || !underline || !nav) return;
        
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const span = link.querySelector('span');
            const spanRect = span?.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            
            if (spanRect) {
                const left = Math.round(spanRect.left - navRect.left);
                const width = Math.round(spanRect.width);
                
                underline.style.setProperty('--left', `${left}px`);
                underline.style.setProperty('--width', `${width}px`);
            }
        });
    }

    function updateActiveUnderline() {
        updateUnderline(activeLink ?? null);
    }

    // Event delegation for better performance
    nav?.addEventListener('mouseover', (e) => {
        const link = (e.target as Element).closest('a');
        if (link) updateUnderline(link);
    });

    nav?.addEventListener('mouseleave', updateActiveUnderline);

    // Initial position
    updateActiveUnderline();
}
// Ensure the function runs when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeUnderline);