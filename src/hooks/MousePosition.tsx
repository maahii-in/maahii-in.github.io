"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  useEffect(() => {
    // Skip execution on server
    if (typeof window === "undefined") return;

    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    // Throttle the mouse move event for better performance
    let ticking = false;
    const handleMouseMove = (event: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateMousePosition(event);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
