import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  X,
  Hash,
  FileText,
  User,
  Award,
  Briefcase,
  Code,
  Mail,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  certifications,
  education,
  experience,
} from "../data/PortfolioData";

interface SearchResult {
  type:
    | "project"
    | "certification"
    | "education"
    | "skill"
    | "section"
    | "assistant"
    | "internship"
    | "action"
    | "mail";
  title: string;
  description?: string;
  category?: string;
  url?: string;
  action?: () => void;
  icon: React.ReactNode;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // All searchable content
  const allContent = useMemo(() => {
    const results: SearchResult[] = [];

    // Add Quick Actions
    results.push({
      type: "action",
      title: "Download Resume",
      description: "Download Mahieshwar's latest resume (PDF)",
      icon: <Download className="w-4 h-4" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/documents/resume.pdf";
        link.download = "Mahieshwar_Budati_Resume.pdf";
        link.click();
        onClose();
      },
    });

    results.push({
      type: "mail",
      title: "Send Email",
      description: "Get in touch via email",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        window.open("mailto:mahieshwar.budati@gmail.com", "_blank");
        onClose();
      },
    });

    // Add sections
    const sections = [
      { name: "Home", id: "home", icon: <User className="w-4 h-4" /> },
      { name: "Skills", id: "skills", icon: <Code className="w-4 h-4" /> },
      {
        name: "Education",
        id: "education",
        icon: <FileText className="w-4 h-4" />,
      },
      { name: "Projects", id: "projects", icon: <Hash className="w-4 h-4" /> },
      {
        name: "Certifications",
        id: "certifications",
        icon: <Award className="w-4 h-4" />,
      },
      {
        name: "Experience",
        id: "experience",
        icon: <Briefcase className="w-4 h-4" />,
      },
      { name: "Contact", id: "contact", icon: <User className="w-4 h-4" /> },
    ];

    sections.forEach((section) => {
      results.push({
        type: "section",
        title: section.name,
        description: `Navigate to ${section.name} section`,
        icon: section.icon,
        action: () => {
          document
            .getElementById(section.id)
            ?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      });
    });

    // Add projects
    projects.forEach((project) => {
      results.push({
        type: "project",
        title: project.title,
        description: project.description,
        category: project.category,
        url: project.live,
        icon: <Hash className="w-4 h-4" />,
        action: () => {
          if (project.live) {
            window.open(project.live, "_blank");
          }
          onClose();
        },
      });
    });

    // Add certifications
    certifications.forEach((cert) => {
      results.push({
        type: "certification",
        title: cert.name,
        description: `${cert.issuer} • ${cert.date}`,
        icon: <Award className="w-4 h-4" />,
        action: () => {
          document
            .getElementById("certifications")
            ?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      });
    });

    // Add education
    education.forEach((edu) => {
      results.push({
        type: "education",
        title: edu.degree,
        description: `${edu.institution} • ${edu.duration}`,
        icon: <FileText className="w-4 h-4" />,
        action: () => {
          document
            .getElementById("education")
            ?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      });
    });

    // Add experience
    experience.forEach((job) => {
      results.push({
        type: "internship",
        title: `${job.title}, ${job.company}`,
        description: job.duration,
        icon: <Briefcase className="w-4 h-4" />,
        action: () => {
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      });
    });

    // Add skills/technologies
    const allTechnologies = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => allTechnologies.add(tech));
    });

    Array.from(allTechnologies).forEach((tech) => {
      results.push({
        type: "skill",
        title: tech,
        description: "Technology/Skill",
        icon: <Code className="w-4 h-4" />,
        action: () => {
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      });
    });

    return results;
  }, [onClose]);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return allContent.slice(0, 8);

    const searchTerms = query.toLowerCase().split(" ");

    return allContent
      .filter((item) => {
        const searchableText =
          `${item.title} ${item.description} ${item.category}`.toLowerCase();
        return searchTerms.every((term) => searchableText.includes(term));
      })
      .slice(0, 8);
  }, [query, allContent]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
    // Reset refs array to match new results length
    itemRefs.current = new Array(filteredResults.length).fill(null);
  }, [filteredResults]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredResults.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredResults[selectedIndex]?.action) {
            filteredResults[selectedIndex].action();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!isOpen || filteredResults.length === 0) return;

    const selectedElement = itemRefs.current[selectedIndex];
    if (selectedElement && resultsContainerRef.current) {
      const container = resultsContainerRef.current;
      const elementRect = selectedElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (elementRect.bottom > containerRect.bottom) {
        // Element is below visible area
        selectedElement.scrollIntoView({ behavior: "smooth", block: "end" });
      } else if (elementRect.top < containerRect.top) {
        // Element is above visible area
        selectedElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedIndex, isOpen, filteredResults.length]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "certification":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "education":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "skill":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "assistant":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "internship":
        return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300";
      case "action":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "mail":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      case "section":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              scale: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
            }}
            className="w-full max-w-2xl mx-auto pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Search Input */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, skills, certifications..."
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </motion.div>

              {/* Results */}
              <div
                ref={resultsContainerRef}
                className="max-h-96 overflow-y-auto"
              >
                {filteredResults.length > 0 ? (
                  <motion.div
                    className="p-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.03,
                        },
                      },
                    }}
                  >
                    {filteredResults.map((result, index) => (
                      <motion.div
                        key={`${result.type}-${result.title}-${index}`}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -20,
                            scale: 0.95,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 24,
                            },
                          },
                        }}
                      >
                        <button
                          ref={(el) => (itemRefs.current[index] = el)}
                          onClick={result.action}
                          className={`w-full text-left p-3 rounded-md flex items-center space-x-3 transition-colors ${
                            index === selectedIndex
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <div className="flex-shrink-0">{result.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {result.title}
                              </p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}
                              >
                                {result.type}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    </motion.div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {query ? "No results found" : "Start typing to search..."}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {filteredResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      Use ↑↓ to navigate • Enter to select • Esc to close
                    </span>
                    <span>{filteredResults.length} results</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDialog;
