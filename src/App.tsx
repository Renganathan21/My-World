import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { StoryViewer } from './components/StoryViewer';
import { PoetryViewer } from './components/PoetryViewer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useConfig } from './hooks/useConfig';
import { Theme } from './hooks/useTheme';

type View = 'home' | 'story' | 'poetry';

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  excerpt: string;
  coverImage: string;
  pages: Array<{
    id: number;
    content: Array<{
      type: 'heading' | 'subheading' | 'text' | 'image';
      value?: string;
      src?: string;
      alt?: string;
      caption?: string;
      placement: 'left' | 'center' | 'right' | 'justify';
    }>;
  }>;
}

interface Poetry {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  lines: string[];
}

function App() {
  const { configData, loading, error } = useConfig();
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedPoetry, setSelectedPoetry] = useState<Poetry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <ThemeProvider availableThemes={['dark'] as Theme[]}>
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  if (error || !configData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Error Loading Content</h1>
          <p className="text-slate-400">
            {error || 'Failed to load website configuration'}
          </p>
        </div>
      </div>
    );
  }

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setCurrentView('story');
  };

  const handlePoetryClick = (poetry: Poetry) => {
    setSelectedPoetry(poetry);
    setCurrentView('poetry');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedStory(null);
    setSelectedPoetry(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('home');
  };

  return (
    <ThemeProvider availableThemes={configData.config.themes as Theme[]}>
      <div className="min-h-screen bg-[var(--theme-bg-primary)]">
        {currentView === 'home' && (
          <Header config={configData.config.header} portFolio={configData.config.portfolioUrl} onSearch={handleSearch} />
        )}

        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Homepage
                stories={configData.stories}
                poetries={configData.poetries}
                genres={configData.config.genres}
                onStoryClick={handleStoryClick}
                onPoetryClick={handlePoetryClick}
                searchQuery={searchQuery}
              />
            </motion.div>
          )}

          {currentView === 'story' && selectedStory && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StoryViewer story={selectedStory} onBack={handleBackToHome} />
            </motion.div>
          )}

          {currentView === 'poetry' && selectedPoetry && (
            <motion.div
              key="poetry"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PoetryViewer poetry={selectedPoetry} onBack={handleBackToHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;