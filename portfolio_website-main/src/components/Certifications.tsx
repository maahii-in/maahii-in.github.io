import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, X, Download } from "lucide-react";
import { certifications } from "../data/PortfolioData";
import { AnimatePresence, motion } from "framer-motion";
import "./Certifications.css";

const Certifications: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<
    null | (typeof certifications)[0]
  >(null);
  const [imageLoading, setImageLoading] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const cardWidth = current.scrollWidth / certifications.length;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = sliderRef.current;
      const totalScrollableWidth = scrollWidth - offsetWidth;
      const scrollPercentage = scrollLeft / totalScrollableWidth;
      const estimatedIndex = Math.round(
        scrollPercentage * (certifications.length - 1)
      );
      setActiveIndex(estimatedIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedCert && e.key === "Escape") {
        setSelectedCert(null);
      }
    };

    if (selectedCert) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const handleDownload = () => {
    if (selectedCert?.url) {
      // Create a temporary link to download the certificate
      const link = document.createElement("a");
      link.href = selectedCert.url;
      link.download = `${selectedCert.name} - ${selectedCert.issuer}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <section id="certifications" className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              Certifications
              {/* Glowing effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></span>
            </span>

            {/* Enhanced underline with animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mt-0.5 mx-auto opacity-60"></div>
            </div>

            {/* Side accent dots */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
            </div>
            <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </h2>

          {/* Subtle tagline */}
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            Professional Achievements
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <div className="flex justify-between absolute w-full top-1/2 transform -translate-y-1/2 z-10 px-2">
            <button
              onClick={() => scroll("left")}
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            onScroll={handleScroll}
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] p-4 snap-start"
              >
                <div className="bg-white dark:bg-gray-900 certification-card rounded-xl shadow-md dark:shadow-lg transition hover:shadow-lg hover:-translate-y-1 hover:scale-105 h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.url && (
                      <div className="mt-auto">
                        <span
                          onClick={() => setSelectedCert(cert)}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white text-sm font-medium cursor-pointer"
                        >
                          View Certificate
                          <Eye size={14} className="ml-2" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {certifications.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition duration-300 ${
                  index === activeIndex
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-blue-200 dark:bg-blue-700 hover:bg-blue-400"
                }`}
                aria-label={`Go to certification ${index + 1}`}
                onClick={() => {
                  if (sliderRef.current) {
                    const cardWidth =
                      sliderRef.current.scrollWidth / certifications.length;
                    sliderRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth",
                    });
                    setActiveIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 certification-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 overflow-hidden max-w-4xl w-full max-h-[90vh] mx-4 relative certification-modal-content"
              initial={{
                scale: 0.8,
                y: window.innerWidth < 768 ? 100 : 50,
                opacity: 0,
                rotateX: window.innerWidth < 768 ? -10 : -15,
              }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{
                scale: 0.8,
                y: window.innerWidth < 768 ? 100 : 50,
                opacity: 0,
                rotateX: window.innerWidth < 768 ? 10 : 15,
              }}
              transition={{
                type: "spring",
                damping: window.innerWidth < 768 ? 30 : 25,
                stiffness: window.innerWidth < 768 ? 400 : 300,
                mass: window.innerWidth < 768 ? 0.8 : 1,
                opacity: { duration: window.innerWidth < 768 ? 0.25 : 0.3 },
                scale: { duration: window.innerWidth < 768 ? 0.4 : 0.5 },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient background */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-4 text-white">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCert(null);
                  }}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all duration-200 hover:scale-110 z-50"
                  type="button"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10">
                  <motion.h3
                    className="text-lg md:text-xl font-bold mb-2"
                    initial={{
                      y: window.innerWidth < 768 ? 15 : 20,
                      opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: window.innerWidth < 768 ? 0.15 : 0.1,
                      duration: window.innerWidth < 768 ? 0.4 : 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {selectedCert.name}
                  </motion.h3>
                  <motion.div
                    className="flex flex-wrap items-center gap-4 text-white/90"
                    initial={{
                      y: window.innerWidth < 768 ? 15 : 20,
                      opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: window.innerWidth < 768 ? 0.25 : 0.2,
                      duration: window.innerWidth < 768 ? 0.4 : 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="font-medium">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span>{selectedCert.date}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto modal-scroll">
                <motion.div
                  initial={{ y: window.innerWidth < 768 ? 20 : 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: window.innerWidth < 768 ? 0.2 : 0.3,
                    duration: window.innerWidth < 768 ? 0.5 : 0.6,
                    ease: "easeOut",
                  }}
                  className="space-y-6"
                >
                  {/* Main content with image on top and details below on mobile, side-by-side on desktop */}
                  <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-3">
                    {/* Certificate Image - Full width on mobile, 2/3 on desktop */}
                    <motion.div
                      className="w-full md:col-span-2 relative group certificate-image-container"
                      initial={{
                        y: window.innerWidth < 768 ? -15 : -20,
                        opacity: 0,
                        scale: window.innerWidth < 768 ? 0.95 : 1,
                      }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: window.innerWidth < 768 ? 0.3 : 0.4,
                        duration: window.innerWidth < 768 ? 0.6 : 0.7,
                        ease: "easeOut",
                        scale: {
                          duration: window.innerWidth < 768 ? 0.5 : 0.6,
                        },
                      }}
                    >
                      <div className="relative bg-white dark:bg-gray-800 p-2 rounded-xl">
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        )}
                        <img
                          src={selectedCert.url}
                          alt={selectedCert.name}
                          className="w-full h-auto max-h-80 md:max-h-96 object-contain rounded-lg shadow-lg"
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          onLoad={() => setImageLoading(false)}
                          onLoadStart={() => setImageLoading(true)}
                          onError={() => setImageLoading(false)}
                        />
                      </div>
                    </motion.div>

                    {/* Certificate Details - Below image on mobile, right side on desktop */}
                    <div className="w-full md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-3">
                      <motion.div
                        className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded-lg border border-blue-200 dark:border-blue-700/30"
                        initial={{
                          x: window.innerWidth < 768 ? 15 : 20,
                          opacity: 0,
                          scale: window.innerWidth < 768 ? 0.9 : 1,
                        }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: window.innerWidth < 768 ? 0.4 : 0.4,
                          duration: window.innerWidth < 768 ? 0.5 : 0.6,
                          ease: "easeOut",
                        }}
                      >
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 md:mb-2 text-xs md:text-sm">
                          Details
                        </h4>
                        <div className="space-y-1 md:space-y-2 text-xs">
                          <div className="flex flex-col">
                            <span className="text-gray-600 dark:text-gray-400">
                              Issuer
                            </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {selectedCert.issuer}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-600 dark:text-gray-400">
                              Year
                            </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {selectedCert.date}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-green-50 dark:bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-200 dark:border-green-700/30"
                        initial={{
                          x: window.innerWidth < 768 ? 15 : 20,
                          opacity: 0,
                          scale: window.innerWidth < 768 ? 0.9 : 1,
                        }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: window.innerWidth < 768 ? 0.5 : 0.5,
                          duration: window.innerWidth < 768 ? 0.5 : 0.6,
                          ease: "easeOut",
                        }}
                      >
                        <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1 md:mb-2 text-xs md:text-sm">
                          Status
                        </h4>
                        <div className="flex items-center gap-1 md:gap-2">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-green-700 dark:text-green-400">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 hidden md:block">
                          Completed and verified.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700"
                initial={{ y: window.innerWidth < 768 ? 15 : 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: window.innerWidth < 768 ? 0.6 : 0.6,
                  duration: window.innerWidth < 768 ? 0.4 : 0.5,
                  ease: "easeOut",
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span>Professional Certification</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 opacity-75 hidden lg:block">
                      Press{" "}
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                        ESC
                      </kbd>{" "}
                      to close
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl modal-button flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>

                    <motion.button
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-all duration-200 modal-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCert(null)}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
