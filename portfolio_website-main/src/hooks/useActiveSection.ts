import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = [
      'home',
      'skills', 
      'education',
      'projects',
      'certifications',
      'internships',
      'contact'
    ];

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we're at the very top, always show home as active
      if (scrollY < 50) {
        setActiveSection('home');
        return;
      }
      
      // If we're near the bottom, show contact as active
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Find which section is currently most visible or closest to center
      let currentSection = 'home';
      let bestScore = -1;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementHeight = rect.height;
          const elementCenter = elementTop + elementHeight / 2;
          const viewportCenter = windowHeight / 2;

          // Calculate visibility score
          const visibleTop = Math.max(0, -elementTop);
          const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Calculate center distance score (closer to center is better)
          const centerDistance = Math.abs(elementCenter - viewportCenter);
          const centerScore = Math.max(0, windowHeight - centerDistance) / windowHeight;
          
          // Combined score: visibility + center proximity
          const score = (visibleHeight / elementHeight) * 0.7 + centerScore * 0.3;

          // If this section has a better score and is reasonably visible, make it active
          if (score > bestScore && visibleHeight > 20) {
            bestScore = score;
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Update on mount
    updateActiveSection();

    // Update on scroll
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return activeSection;
};
