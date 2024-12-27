function initializeIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  document.querySelectorAll(".content-section").forEach((section) => {
    observer.observe(section);
  });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeIntersectionObserver); 