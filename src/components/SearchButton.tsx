import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchDialog from './SearchDialog';

const SearchButton: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut to open search (Ctrl+K or Cmd+K)
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

  return (
    <>
      {/* Search Bar */}
      <div className="relative group w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="relative flex items-center justify-between w-full px-4 py-3 bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm group-hover:scale-[1.02]"
          aria-label="Search Portfolio"
        >
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Search Portfolio
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Projects, Skills, Experience...
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-xs text-gray-600 dark:text-gray-300">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default SearchButton;