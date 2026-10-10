"use client";

import { Moon, SunDim } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "../../hooks/useTheme";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback: Just toggle theme without animation
      toggleTheme();
      return;
    }

    try {
      await document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1200,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (error) {
      // If animation fails, still toggle the theme
      console.warn("View transition failed, falling back to simple toggle:", error);
      toggleTheme();
    }
  };
  
  return (
    <button 
      ref={buttonRef} 
      onClick={changeTheme} 
      className={cn(
        "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group relative",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunDim className="w-5 h-5 text-amber-500 transition-all duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 transition-all duration-300" />
      )}
    </button>
  );
};
