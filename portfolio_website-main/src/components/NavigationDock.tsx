import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import {
  Home,
  Wrench,
  GraduationCap,
  FolderKanban,
  Award,
  Rocket,
  Star,
  Download,
  Maximize,
  Minimize,
  Loader2,
  Search,
} from "lucide-react";

import { useActiveSection } from "../hooks/useActiveSection";
import { useState, useEffect } from "react";

interface NavigationDockProps {
  className?: string;
  onOpenSearch?: () => void;
}

export function NavigationDock({ className, onOpenSearch }: NavigationDockProps) {
  const activeSection = useActiveSection();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", checkFullscreen);
    document.addEventListener("webkitfullscreenchange", checkFullscreen);
    document.addEventListener("mozfullscreenchange", checkFullscreen);
    document.addEventListener("MSFullscreenChange", checkFullscreen);

    // Keyboard shortcut for search (Ctrl+K or Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      document.removeEventListener("webkitfullscreenchange", checkFullscreen);
      document.removeEventListener("mozfullscreenchange", checkFullscreen);
      document.removeEventListener("MSFullscreenChange", checkFullscreen);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenSearch]);

  const toggleFullscreen = async () => {
    try {
      if (isFullscreen) {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      } else {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).mozRequestFullScreen) {
          await (document.documentElement as any).mozRequestFullScreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          await (document.documentElement as any).msRequestFullscreen();
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  const handleResumeDownload = async () => {
    console.log("Download started"); // Debug log
    setIsDownloading(true);

    // Simulate loading for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Download the resume
    const link = document.createElement("a");
    link.href = "/documents/resume.pdf";
    link.download = "resume.pdf";
    link.click();

    console.log("Download completed, setting showToast to true"); // Debug log
    setIsDownloading(false);
    setShowToast(true);

    // Hide success tooltip after 3 seconds
    setTimeout(() => {
      console.log("Hiding toast"); // Debug log
      setShowToast(false);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navigationItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      onClick: () => scrollToSection("home"),
    },
    {
      id: "skills",
      icon: Wrench,
      label: "Skills",
      onClick: () => scrollToSection("skills"),
    },
    {
      id: "education",
      icon: GraduationCap,
      label: "Education",
      onClick: () => scrollToSection("education"),
    },
    {
      id: "projects",
      icon: FolderKanban,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      id: "certifications",
      icon: Award,
      label: "Certifications",
      onClick: () => scrollToSection("certifications"),
    },
    {
      id: "internships",
      icon: Star,
      label: "Internships",
      onClick: () => scrollToSection("internships"),
    },
    {
      id: "contact",
      icon: Rocket,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
  ];

  return (
    <div className={`${className}`} style={{ overflow: "visible" }}>
      <Dock
        direction="middle"
        iconSize={42}
        iconMagnification={56}
        iconDistance={140}
      >
        {navigationItems.map(({ id, icon: Icon, label, onClick }) => (
          <DockIcon
            key={id}
            tooltip={label}
            className={
              activeSection === id
                ? "nav-item-compact bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/25 dark:border-blue-500/35"
                : "nav-item-compact"
            }
            onClick={onClick}
          >
            <Icon className="w-5 h-5" />
          </DockIcon>
        ))}

        {/* Download Resume Button - using DockIcon for consistent hover effects */}
        <DockIcon
          tooltip={
            isDownloading
              ? "Downloading..."
              : showToast
                ? "Downloaded!"
                : "Download Resume"
          }
          className="nav-item-compact"
          onClick={handleResumeDownload}
        >
          {isDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}

          {/* Success indicator */}
          {showToast && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </DockIcon>

        {/* Visual separator */}
        <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 self-center mx-1"></div>

        {/* Theme Toggle Button - using DockIcon for consistent hover effects */}
        <DockIcon
          tooltip="Toggle Theme"
          className="nav-item-compact p-0"
          onClick={() => {}} // Empty handler since AnimatedThemeToggler handles the click
        >
          <AnimatedThemeToggler className="w-full h-full p-0 rounded-full hover:bg-transparent dark:hover:bg-transparent" />
        </DockIcon>

        {/* Full Screen Button */}
        <DockIcon
          tooltip={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="nav-item-compact"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-gray-900 dark:text-white transition-all duration-300" />
          ) : (
            <Maximize className="w-5 h-5 text-gray-900 dark:text-white transition-all duration-300" />
          )}
        </DockIcon>

        {/* Visual separator */}
        <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 self-center mx-1"></div>

        {/* Search Button with full search bar style */}
        <DockIcon
          tooltip="Search Portfolio (⌘K)"
          className="nav-item-compact"
          onClick={() => onOpenSearch?.()}
          data-search-button="true"
        >
          <Search className="w-5 h-5" />
        </DockIcon>
      </Dock>

    </div>
  );
}
