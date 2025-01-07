function initializeIntersectionObserver() {
  // Use WeakMap for better memory management
  const observedElements = new WeakMap();
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !observedElements.has(entry.target)) {
          entry.target.classList.add("visible");
          observedElements.set(entry.target, true);
          // Unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  // Use more specific selectors
  document.querySelectorAll(".content-section:not(.visible)").forEach((section) => {
    observer.observe(section);
  });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeIntersectionObserver); 

function optimizeImageLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01
    }
  );

  images.forEach((img) => imageObserver.observe(img));
} 