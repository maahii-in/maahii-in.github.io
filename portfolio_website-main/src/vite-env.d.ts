/// <reference types="vite/client" />

// Add View Transitions API types
interface Document {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
}
