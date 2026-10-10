"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

interface WaveLoadingProps {
  /**
   * Number of balls in the animation
   */
  ballCount?: number;

  /**
   * Size of each ball in pixels
   */
  ballSize?: number;

  /**
   * Animation duration in seconds
   */
  duration?: number;

  /**
   * Whether to show the loading text
   */
  showText?: boolean;

  /**
   * Custom loading text
   */
  loadingText?: string;

  /**
   * Custom colors for the balls (pastel colors by default)
   */
  colors?: string[];
}

export default function WaveLoadingAnimation({
  ballCount = 5,
  ballSize = 18,
  duration = 1.25,
  showText = true,
  loadingText = "Loading...",
  colors = [
    "#FF1493", // Deep Pink
    "#1E90FF", // Dodger Blue
    "#00CED1", // Dark Turquoise
    "#8A2BE2", // Blue Violet
    "#FFD700", // Gold
  ],
}: WaveLoadingProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Ensure animations only run after component is mounted (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full ${theme === 'dark' ? 'bg-[#000000]' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="relative h-[100px] flex items-center justify-center">
        {Array.from({ length: ballCount }).map((_, i) => {
          // Calculate delay for wave effect
          const delay = (i / ballCount) * (duration / 2);

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: ballSize,
                height: ballSize,
                backgroundColor: colors[i % colors.length],
                left: `calc(50% - ${ballSize / 2}px)`,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                x: `calc(${i - ballCount / 2 + 0.5} * ${ballSize * 1.5}px)`,
              }}
              animate={{
                y: [0, -40, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                y: {
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay,
                },
                scale: {
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay,
                },
              }}
            />
          );
        })}
      </div>

      {showText && (
        <motion.div
          className="mt-6 text-gray-600 dark:text-gray-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loadingText}
        </motion.div>
      )}
    </div>
  );
}
