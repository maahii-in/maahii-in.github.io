import React, { useEffect, useState, useCallback } from "react";

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    setScrollProgress(scrollPercentage);
  }, []);

  useEffect(() => {
    // Add immediate calculation on mount
    updateScrollProgress();
    
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [updateScrollProgress]);

  return (
    <>
      <div
        className="fixed left-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-blue-500 z-50"
        style={{
          width: `${scrollProgress}%`,
          top: "0",
          zIndex: 100,
          transition: "none", // Remove transition for instant response
        }}
      />
      <style>
        {`
          @media (max-width: 768px) {
            .progress-bar {
              top: 4rem; /* Adjust for mobile if navbar or other element is causing overlap */
              z-index: 100; /* Ensure the progress bar appears above other elements */
            }
          }
        `}
      </style>
    </>
  );
};

export default ProgressBar;
