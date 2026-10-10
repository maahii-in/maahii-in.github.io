"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useMousePosition } from "../hooks/MousePosition";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
}

export default function ParticleSwarmCursor() {
  const mousePosition = useMousePosition();
  const cursorControls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);

  useEffect(() => {
    if (!mousePosition.x || !mousePosition.y) return;

    // Update target position for particles
    targetXRef.current = mousePosition.x;
    targetYRef.current = mousePosition.y;

    // Animate cursor
    cursorControls.start({
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      transition: { type: "spring", damping: 25, stiffness: 400 },
    });
  }, [mousePosition, cursorControls]);

  // Set up canvas for particle swarm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const createParticle = () => {
      const colors = [
        "#cc0066", // thicker pink
        "#0055cc", // thicker blue
        "#00aa55", // thicker green
        "#cc5500", // thicker orange;
      ];

      return {
        x: targetXRef.current + (Math.random() - 0.5) * 100,
        y: targetYRef.current + (Math.random() - 0.5) * 100,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0.7 + Math.random() * 0.3,
      };
    };

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    // Animation loop
    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (Math.random() > 0.9) {
        particlesRef.current.push(createParticle());
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Calculate direction to target
        const dx = targetXRef.current - particle.x;
        const dy = targetYRef.current - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update velocity based on distance to target
        if (distance > 5) {
          particle.speedX += (dx / distance) * 0.2;
          particle.speedY += (dy / distance) * 0.2;
        }

        // Apply some friction
        particle.speedX *= 0.95;
        particle.speedY *= 0.95;

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reduce life
        particle.life -= 0.005;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.life * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      requestAnimationFrame(updateParticles);
    };

    updateParticles();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Particle swarm canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      />

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-black dark:bg-white pointer-events-none z-50"
        animate={cursorControls}
        style={{
          width: 10,
          height: 10,
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
        }}
      />
    </>
  );
}
