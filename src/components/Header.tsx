import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Moon, Sun, Trees, Stars, Scroll, Menu, X, Mail } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

interface HeaderConfig {
  logo: string;
  title: string;
  showSearch: boolean;
}

interface HeaderProps {
  config: HeaderConfig;
  portFolio: string;
  onSearch: (query: string) => void;
}

const themeIcons: Record<Theme, React.ComponentType<any>> = {
  light: Sun,
  dark: Moon,
  forest: Trees,
  galaxy: Stars,
  vintage: Scroll,
};

export const Header: React.FC<HeaderProps> = ({ config, portFolio, onSearch }) => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[var(--theme-bg-primary)]/80 border-b border-[var(--theme-border)]"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <img
              src={config.logo}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--theme-accent)]/30"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--theme-accent)] to-purple-400 bg-clip-text text-transparent">
              {config.title}
            </h1>
          </motion.div>



          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {config.showSearch && (
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--theme-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search stories & poems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] 
                           text-[var(--theme-text-primary)] placeholder-[var(--theme-text-secondary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/50 transition-all"
                />
              </form>
            )}
             <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    href={portFolio} // replace with your portfolio URL
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[var(--theme-bg-secondary)] 
               text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)] transition-colors"
  >
    <Mail className="w-5 h-5" />
    <span>Contact Me</span>
  </motion.a>

            {/* Theme Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="p-2 rounded-full bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] 
                         hover:bg-[var(--theme-bg-accent)] transition-colors"
              >
                <ThemeIcon className="w-5 h-5" />
              </motion.button>

              {showThemeSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 py-2 bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] 
                           rounded-lg shadow-lg min-w-[120px]"
                >
                  {availableThemes.map((themeOption) => {
                    const Icon = themeIcons[themeOption];
                    return (
                      <button
                        key={themeOption}
                        onClick={() => {
                          setTheme(themeOption);
                          setShowThemeSelector(false);
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-[var(--theme-bg-accent)] 
                                  flex items-center space-x-2 transition-colors
                                  ${theme === themeOption ? 'bg-[var(--theme-bg-accent)] text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="capitalize">{themeOption}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--theme-text-primary)]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 pb-4 border-t border-[var(--theme-border)]"
          >
            {config.showSearch && (
              <form onSubmit={handleSearch} className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--theme-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search stories & poems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] 
                           text-[var(--theme-text-primary)] placeholder-[var(--theme-text-secondary)]
                           focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/50"
                />
              </form>
            )}

            <div className="mt-4">
              <p className="text-sm text-[var(--theme-text-secondary)] mb-2">Themes</p>
              <div className="grid grid-cols-3 gap-2">
                {availableThemes.map((themeOption) => {
                  const Icon = themeIcons[themeOption];
                  return (
                    <button
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      className={`p-2 rounded-lg flex flex-col items-center space-y-1 transition-colors
                                ${theme === themeOption ? 'bg-[var(--theme-accent)] text-white' : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)]'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs capitalize">{themeOption}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};