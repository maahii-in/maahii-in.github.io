import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "./components/Navigation";
import { NavigationDock } from "./components/NavigationDock";
import HeroSection from "./components/Hero";
import { Skills } from "./components/Skills";
import Education from "./components/Education";
import { Projects } from "./components/Projects";
import Certifications from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AllProjects } from "./components/AllProjects";
import SearchDialog from "./components/SearchDialog";
import "./components/Global.css";
import ProgressBar from "./components/ProgressBar";
import Experience from "./components/Experience";
import { useTheme } from "./hooks/useTheme";
// import WaveLoadingAnimation from "./components/WaveAnimation";
/* import ParticleSwarmCursor from "./components/CustomCursor"; */
 import { SmoothCursor } from "./components/magicui/SmoothCursor";
import ClickEffect from "./components/ClickEffect";
import { NeuralNetworkBackground } from "./components/NeuralNetworkBackground";

const App: React.FC = () => {
  // Initialize theme hook to ensure mobile status bar colors are set
  const { theme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3700);

  //   return () => clearTimeout(timer);
  // }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Ensure proper mobile viewport and theme handling
  useEffect(() => {
    // Force a theme color update whenever theme changes
    const color = theme === "dark" ? "#000000" : "#ffffff";
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200 relative overflow-x-hidden w-full max-w-full">
        <NeuralNetworkBackground />
        <div className="relative z-10">
          <Analytics />
          {/* {loading ? (
            <WaveLoadingAnimation />
          ) : ( */}
          <>
            <SmoothCursor />
            <ClickEffect />
            <ProgressBar />
            <Navigation />
            
            {/* Top Navigation Dock - positioned at top, hidden on mobile */}
            <NavigationDock 
              className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50" 
              onOpenSearch={() => setIsSearchOpen(true)}
            />
            
            <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
  
                      <Skills />
                      <Experience />
                      <Education />
                      <Projects />
                      <Certifications />
                      <Contact />
                    </>
                  }
                />
                <Route path="/all-projects" element={<AllProjects />} />{" "}
                {/* New Projects Route */}
              </Routes>
            </main>
            <Footer />
          </>
          {/* )} */}
        </div>
      </div>
    </Router>
  );
};

export default App;
