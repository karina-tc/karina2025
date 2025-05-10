export function initFadeAnimation(threshold = 0.2) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((section) => {
        section.classList.add("fade-up");
        observer.observe(section);
    });
}