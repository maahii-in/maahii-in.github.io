import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Simple and direct theme-color update
    const color = theme === "dark" ? "#000000" : "#ffffff";
    
    // Find and update the existing theme-color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    } else {
      // Create new one if it doesn't exist
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      themeColorMeta.setAttribute('content', color);
      document.head.appendChild(themeColorMeta);
    }

    // Update Apple status bar style
    let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (statusBarMeta) {
      statusBarMeta.setAttribute('content', theme === "dark" ? 'black-translucent' : 'default');
    }

    // Force a repaint to ensure the browser picks up the changes
    document.documentElement.style.setProperty('--theme-color', color);
    
    // Additional viewport meta update for some browsers
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const content = viewport.getAttribute('content');
      if (content && !content.includes('viewport-fit=cover')) {
        viewport.setAttribute('content', content + ', viewport-fit=cover');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
