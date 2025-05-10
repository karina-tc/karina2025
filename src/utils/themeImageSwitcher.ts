interface ThemeImages {
  light: string;
  dark: string;
}

export function initThemeImageSwitcher(imageId: string, images: ThemeImages) {
  function updateThemeImage() {
    const theme = document.documentElement.getAttribute('data-theme');
    const imageElement = document.getElementById(imageId) as HTMLImageElement;
    
    if (imageElement) {
      switch(theme) {
        case 'dark':
          imageElement.src = images.dark;
          break;
        default:
          imageElement.src = images.light;
      }
    }
  }

  // Initial check
  updateThemeImage();

  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        updateThemeImage();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
} 