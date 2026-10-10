import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

const ClickEffect: React.FC = () => {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [rippleId, setRippleId] = useState(0);

  const createRipple = useCallback((e: MouseEvent) => {
    // Skip if clicking on form elements or interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, button, a, select, [role="button"], [contenteditable]')) {
      return;
    }

    const newRipple: ClickRipple = {
      id: rippleId,
      x: e.clientX,
      y: e.clientY,
    };

    setRipples(prev => [...prev, newRipple]);
    setRippleId(prev => prev + 1);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  }, [rippleId]);

  useEffect(() => {
    // Listen to both document and window to catch more events
    const handleDocumentClick = (e: MouseEvent) => createRipple(e);
    const handleWindowClick = (e: MouseEvent) => createRipple(e);
    
    document.addEventListener('click', handleDocumentClick, true); // Use capture phase
    window.addEventListener('click', handleWindowClick, true); // Also listen on window
    
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      window.removeEventListener('click', handleWindowClick, true);
    };
  }, [createRipple]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {/* Single visible circle */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-gray-800/80 dark:border-white/80 bg-gray-200/20 dark:bg-white/10" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickEffect;