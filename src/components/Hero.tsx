import React, { useEffect, useState } from "react";
import { ChevronDown, Download, Loader2 } from "lucide-react";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import confetti from "canvas-confetti";
import NameAnimation from "./NameAnimation";
import Typewriter from "./TypeWriter";

const HeroSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResumeDownload = async () => {
    setIsDownloading(true);

    // Simulate loading for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Download the resume
    const link = document.createElement("a");
    link.href = "/documents/resume.pdf";
    link.download = "Mahieshwar_Budati_Resume.pdf";
    link.click();

    setIsDownloading(false);
    setShowToast(true);

    // Hide success tooltip after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Confetti effect for image hover
  const handleImageHover = async () => {
    await confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
    });
  };

  // Fullscreen functionality when 'F' key is pressed (only when not typing)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is typing in any input field, textarea, or contenteditable element
      const target = event.target as HTMLElement;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.contentEditable === "true" ||
          target.closest("input, textarea, [contenteditable]"));

      // Only trigger fullscreen if not typing and F key is pressed alone
      if (
        event.key.toLowerCase() === "f" &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !isTyping
      ) {
        event.preventDefault();

        if (!document.fullscreenElement) {
          // Enter fullscreen
          document.documentElement.requestFullscreen?.() ||
            (document.documentElement as any).webkitRequestFullscreen?.() ||
            (document.documentElement as any).msRequestFullscreen?.();
        } else {
          // Exit fullscreen
          document.exitFullscreen?.() ||
            (document as any).webkitExitFullscreen?.() ||
            (document as any).msExitFullscreen?.();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-start lg:items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-0 lg:pb-0"
    >
      <div className="container mx-auto max-w-7xl z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 min-h-[auto] lg:min-h-[80vh]">
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start">
            <p className="text-blue-500 font-medium mb-2 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
              Hello, I'm
            </p>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight text-center lg:text-left break-words max-w-full">
              <NameAnimation />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl text-blue-600 font-light mb-6 min-h-[2rem] sm:min-h-[2.5rem] text-center lg:text-left break-words max-w-full">
              <Typewriter />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-sm sm:text-base leading-relaxed mx-auto lg:mx-0">
              I build NLP and LLM applications, RAG systems and live voice agents
              using Python, LangChain, FastAPI and vector databases.
            </p>

            {/* Social Icons Section */}
            <div className="flex items-center space-x-4 sm:space-x-6 justify-center lg:justify-start mb-8">
              <div className="relative group flex items-center">
                <a
                  href="https://github.com/maahii-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={16} className="sm:w-4 sm:h-4" />
                </a>
                {/* Tooltip */}
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  GitHub Profile
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white"></div>
                </div>
              </div>

              <div className="relative group flex items-center">
                <a
                  href="https://www.linkedin.com/in/mahi-budati1209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <SiLinkedin size={16} className="sm:w-4 sm:h-4" />
                </a>
                {/* Tooltip */}
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  LinkedIn Profile
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white"></div>
                </div>
              </div>

              <div className="relative group flex items-center">
                <a
                  href="mailto:mahieshwar.budati@gmail.com"
                  className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Send Email"
                >
                  <SiGmail size={16} className="sm:w-4 sm:h-4" />
                </a>
                {/* Tooltip */}
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  Send Email
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white"></div>
                </div>
              </div>

              <div className="relative group flex items-center">
                <button
                  onClick={handleResumeDownload}
                  disabled={isDownloading}
                  className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-300 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Download Resume"
                >
                  {isDownloading ? (
                    <Loader2 size={20} className="sm:w-6 sm:h-6 animate-spin" />
                  ) : (
                    <Download size={16} className="sm:w-4 sm:h-4" />
                  )}
                </button>

                {/* Success tooltip - always visible when showToast is true */}
                {showToast && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-green-600 dark:bg-green-500 text-white text-xs font-medium rounded whitespace-nowrap z-[60] shadow-lg opacity-100">
                    Resume Downloaded!
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-green-600 dark:border-t-green-500"></div>
                  </div>
                )}

                {/* Regular tooltip - only show when not in success state */}
                {!showToast && (
                  <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {isDownloading ? "Downloading..." : "Download Resume"}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Right Side with new.png and Blog Background */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Blog Background */}
              <div className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/30 dark:via-gray-800/50 dark:to-blue-800/30 shadow-xl">
                {/* Blog Content Lines */}
                <div className="absolute top-6 sm:top-8 left-4 sm:left-6 right-4 sm:right-6 space-y-1.5 sm:space-y-2 opacity-30 dark:opacity-25">
                  <div className="h-0.5 sm:h-1 bg-blue-400 dark:bg-blue-300 rounded-full w-[90%]"></div>
                  <div className="h-0.5 sm:h-1 bg-blue-300 dark:bg-blue-400 rounded-full w-[75%]"></div>
                  <div className="h-0.5 sm:h-1 bg-blue-200 dark:bg-blue-500 rounded-full w-[95%]"></div>
                </div>

                {/* Blog Article Snippets */}
                <div className="absolute top-12 sm:top-16 left-3 sm:left-4 right-3 sm:right-4 space-y-2 sm:space-y-3 opacity-20 dark:opacity-15 text-xs text-gray-700 dark:text-gray-300">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="h-1.5 sm:h-2 bg-gray-400 dark:bg-gray-300 rounded w-[85%]"></div>
                    <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-400 rounded w-[80%]"></div>
                    <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-400 rounded w-[75%]"></div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="h-1.5 sm:h-2 bg-blue-400 dark:bg-blue-300 rounded w-[85%]"></div>
                    <div className="h-0.5 sm:h-1 bg-blue-300 dark:bg-blue-400 rounded w-[90%]"></div>
                  </div>
                </div>

                {/* Blog Tags */}
                <div className="absolute bottom-6 sm:bottom-8 left-3 sm:left-6 right-3 sm:right-6 flex flex-wrap gap-0.5 sm:gap-1 opacity-30 dark:opacity-25">
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-200 dark:bg-blue-700 rounded-full text-xs text-blue-800 dark:text-blue-200">
                    #React
                  </div>
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-200 dark:bg-green-700 rounded-full text-xs text-green-800 dark:text-green-200">
                    #Web
                  </div>
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-200 dark:bg-purple-700 rounded-full text-xs text-purple-800 dark:text-purple-200">
                    #Blog
                  </div>
                </div>

                {/* Code Snippets */}
                <div className="absolute top-1/3 left-1.5 sm:left-2 right-1.5 sm:right-2 opacity-15 dark:opacity-12">
                  <div className="space-y-0.5 sm:space-y-1 text-xs font-mono text-gray-600 dark:text-gray-300">
                    <div className="flex space-x-1">
                      <span className="text-blue-500 dark:text-blue-400">
                        const
                      </span>
                      <span>blog = { }</span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="text-purple-500 dark:text-purple-400">
                        function
                      </span>
                      <span className="text-green-500 dark:text-green-400">
                        write()
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <img
                src="img/me.svg"
                alt="Mahieshwar Budati - AI Engineer"
                className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white dark:border-gray-700"
                onMouseEnter={handleImageHover}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 lg:absolute lg:bottom-12 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex flex-col items-center z-20 pb-8 lg:pb-0">
          <span className="text-gray-600 dark:text-gray-300 text-sm mb-2 font-medium">
            Scroll Down
          </span>
          <ChevronDown className="text-blue-500 dark:text-blue-400 animate-bounce w-6 h-6 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
