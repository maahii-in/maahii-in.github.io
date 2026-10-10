import { useState, useEffect } from "react";
import {
  Home,
  Wrench,
  GraduationCap,
  FolderKanban,
  Award,
  Mail,
  Star,
  Download,
  X,
  Loader2,
} from "lucide-react";
import { Link } from "./Link";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "../hooks/useActiveSection";
import { TextShimmer } from "./text-shimmer";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const activeSection = useActiveSection();
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleResumeDownload = async () => {
    setIsDownloading(true);
    
    // Simulate loading for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Download the resume
    const link = document.createElement('a');
    link.href = '/documents/resume.pdf';
    link.download = 'Mahieshwar_Budati_Resume.pdf';
    link.click();
    
    setIsDownloading(false);
    setShowToast(true);
    toggleMenu(); // Close menu after download
    
    // Hide success tooltip after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Prevent body scroll when navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 p-4 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 transition-all md:hidden">
        <div className="container mx-auto max-w-7xl flex justify-between items-center px-4 relative">
          <div className="text-lg font-bold dark:text-gray-100">
            <TextShimmer 
              className="text-4xl sm:text-5xl" 
              style={{ fontFamily: "'Qwitcher Grypen', cursive" }}
              duration={3}
            >
              Mahieshwar
            </TextShimmer>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300 md:hover:scale-110 md:hover:-translate-y-1 relative z-20 group nav-item-compact w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-gray-700/30 md:bg-transparent md:dark:bg-transparent"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center items-center w-4 h-4">
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm mb-0.5"></span>
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm mb-0.5"></span>
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}      {/* Mobile Side Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-[55%] transform transition-all duration-500 ease-out z-50 shadow-2xl md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >        {/* Clean Background */}
        <div className="absolute inset-0 bg-white/95 dark:bg-black backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/10 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/5"></div>
        
        {/* Content Container */}
        <div className="relative h-full flex flex-col">          {/* Simple Header */}
        <div className="relative p-4 border-b border-gray-200/40 dark:border-gray-700/40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                Navigation
              </h3>
            </div>            <button
              onClick={toggleMenu}
              className="p-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Main Sections */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sections
                </span>
              </div>              <div className="space-y-2">
                <Link href="#home" icon={<Home className="w-4 h-4" />} label="Home" onClick={toggleMenu} isActive={activeSection === 'home'} className="w-full justify-start px-4 py-3" />
                <Link href="#skills" icon={<Wrench className="w-4 h-4" />} label="Skills" onClick={toggleMenu} isActive={activeSection === 'skills'} className="w-full justify-start px-4 py-3" />
                <Link href="#education" icon={<GraduationCap className="w-4 h-4" />} label="Education" onClick={toggleMenu} isActive={activeSection === 'education'} className="w-full justify-start px-4 py-3" />
                <Link href="#projects" icon={<FolderKanban className="w-4 h-4" />} label="Projects" onClick={toggleMenu} isActive={activeSection === 'projects'} className="w-full justify-start px-4 py-3" />
                <Link href="#certifications" icon={<Award className="w-4 h-4" />} label="Certifications" onClick={toggleMenu} isActive={activeSection === 'certifications'} className="w-full justify-start px-4 py-3" />
                <Link href="#experience" icon={<Star className="w-4 h-4" />} label="Experience" onClick={toggleMenu} isActive={activeSection === 'experience'} className="w-full justify-start px-4 py-3" />
                <Link href="#contact" icon={<Mail className="w-4 h-4" />} label="Contact" onClick={toggleMenu} isActive={activeSection === 'contact'} className="w-full justify-start px-4 py-3" />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quick Actions
                </span>
              </div>
              
              {/* Enhanced Download Resume Button */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <button
                  onClick={handleResumeDownload}
                  disabled={isDownloading}
                  className="relative flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-xl p-3 shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 text-white font-bold group w-full"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-white" />
                  )}
                  <span className="text-sm">
                    {isDownloading ? "Downloading..." : showToast ? "Downloaded!" : "Resume"}
                  </span>
                  
                  {/* Animated pulse indicator - hide when downloading or completed */}
                  {!isDownloading && !showToast && (
                    <>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-md"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                      
                      {/* Sparkle effects */}
                      <div className="absolute top-1 right-1 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-150"></div>
                    </>
                  )}
                </button>
              </div>
              
              {/* Download stats or additional info */}
              <div className="mt-2 text-center">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  PDF • Updated Recently
                </span>
              </div>
            </div>


          </div>
        </div>
        </div>
      </div>
    </>
  );
}
