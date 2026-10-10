import { ReactNode } from "react";

interface LinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  download?: boolean;
  target?: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function Link({
  href,
  icon,
  label,
  download = false,
  target,
  onClick,
  isActive = false,
  className = "",
}: LinkProps) {
  const isInternalLink = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInternalLink) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Call the optional onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...(download ? { download: true } : {})}
      {...(target ? { target } : {})}
      className={`p-2 rounded-xl transition-all duration-200 group relative flex items-center hover:scale-105 ${
        className?.includes('justify-start') ? 'justify-start' : 'justify-center'
      } ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
          : 'hover:bg-white/10 dark:hover:bg-gray-700/50'
      } ${className}`}
      aria-label={label}
    >
      <div className={`flex items-center justify-center transition-all duration-200 ${isActive ? 'drop-shadow-md' : ''} ${className?.includes('justify-start') ? 'mr-3' : ''}`}>
        {icon}
      </div>
      
      {/* Mobile label - always visible on mobile, hidden on desktop unless justify-start is used */}
      <span className={`${className?.includes('justify-start') ? 'block' : 'md:hidden'} text-sm font-medium transition-all duration-300 ${
        className?.includes('justify-start') ? '' : 'ml-3'
      } ${
        isActive 
          ? 'text-white font-semibold' 
          : 'text-gray-700 dark:text-gray-200'
      }`}>
        {label}
      </span>
    </a>
  );
}
