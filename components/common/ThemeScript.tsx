export function ThemeScript() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --initial-color-mode: light;
        }
        
        html {
          visibility: visible;
        }
        
        html[data-theme="dark"] {
          color-scheme: dark;
        }
        
        @media (prefers-color-scheme: dark) {
          :root {
            --initial-color-mode: dark;
          }
        }
        
        body {
          transition: background-color 0.2s ease;
        }
      `}} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Check for initial value in localStorage
              let colorMode = 'light';
              try {
                const persistedColorMode = localStorage.getItem('theme');
                if (persistedColorMode) {
                  colorMode = persistedColorMode;
                } else {
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                  if (hasMediaQueryPreference) {
                    colorMode = mql.matches ? 'dark' : 'light';
                  }
                }
              } catch (err) { }
              
              if (colorMode === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })();
          `,
        }}
      />
    </>
  );
} 