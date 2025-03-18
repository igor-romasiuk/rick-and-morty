function setTheme() {
  try {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getThemePreference = () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') return true;
      if (storedTheme === 'light') return false;
      return darkQuery.matches;
    };
    
    const applyTheme = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    };

    // Apply theme immediately
    applyTheme(getThemePreference());

    // Create a MutationObserver to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Handle system theme changes
    darkQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
      }
    });

    // Handle storage changes
    window.addEventListener('storage', () => {
      applyTheme(getThemePreference());
    });

    // Handle navigation events
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        applyTheme(getThemePreference());
      }
    });
  } catch (e) {
    console.error('Theme initialization error:', e);
  }
}

// Initialize theme
setTheme();

// Backup initialization for client-side navigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setTheme);
} 