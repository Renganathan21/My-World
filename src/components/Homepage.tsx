import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Sparkles, Search } from 'lucide-react';
import { StoryCard } from './StoryCard';
import { PoetryCard } from './PoetryCard';
import { GenreFilter } from './GenreFilter';

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  excerpt: string;
  coverImage: string;
}

interface Poetry {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  lines: string[];
}

interface HomepageProps {
  stories: Story[];
  poetries: Poetry[];
  genres: string[];
  onStoryClick: (story: Story) => void;
  onPoetryClick: (poetry: Poetry) => void;
  searchQuery: string;
}

export const Homepage: React.FC<HomepageProps> = ({
  stories,
  poetries,
  genres,
  onStoryClick,
  onPoetryClick,
  searchQuery,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stories' | 'poetries'>('stories');

  const filteredStories = useMemo(() => {
    let filtered = stories;

    if (selectedGenre) {
      filtered = filtered.filter(story => story.genre === selectedGenre);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        story =>
          story.title.toLowerCase().includes(query) ||
          story.author.toLowerCase().includes(query) ||
          story.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [stories, selectedGenre, searchQuery]);

  const filteredPoetries = useMemo(() => {
    let filtered = poetries;

    if (selectedGenre) {
      filtered = filtered.filter(poetry => poetry.genre === selectedGenre);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        poetry =>
          poetry.title.toLowerCase().includes(query) ||
          poetry.author.toLowerCase().includes(query) ||
          poetry.lines.some(line => line.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [poetries, selectedGenre, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--theme-bg-primary)]">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-12 h-12 text-[var(--theme-accent)] opacity-80" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--theme-text-primary)] mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[var(--theme-accent)] to-purple-400 bg-clip-text text-transparent">
              Mythic Chronicles
            </span>
          </h1>
          <p className="text-xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto">
            Immerse yourself in a world of enchanting tales and mystical verses, 
            where every story opens a door to extraordinary realms.
          </p>
        </motion.div>

        {/* Search Results Indicator */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-[var(--theme-bg-accent)]/50 rounded-lg border border-[var(--theme-accent)]/30"
          >
            <div className="flex items-center space-x-2 text-[var(--theme-text-primary)]">
              <Search className="w-4 h-4" />
              <span>Search results for: <strong>"{searchQuery}"</strong></span>
            </div>
          </motion.div>
        )}

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                activeTab === 'stories'
                  ? 'bg-[var(--theme-accent)] text-white shadow-lg'
                  : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)]'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Stories ({filteredStories.length})</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('poetries')}
              className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                activeTab === 'poetries'
                  ? 'bg-[var(--theme-accent)] text-white shadow-lg'
                  : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)]'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Poetry ({filteredPoetries.length})</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Genre Filter */}
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'stories' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StoryCard story={story} onClick={() => onStoryClick(story)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoetries.map((poetry, index) => (
                <motion.div
                  key={poetry.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PoetryCard poetry={poetry} onClick={() => onPoetryClick(poetry)} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {((activeTab === 'stories' && filteredStories.length === 0) || 
          (activeTab === 'poetries' && filteredPoetries.length === 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-[var(--theme-text-secondary)] text-6xl mb-4">
              {activeTab === 'stories' ? '📚' : '📜'}
            </div>
            <p className="text-xl text-[var(--theme-text-secondary)]">
              No {activeTab} found for the selected filters.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGenre(null)}
              className="mt-4 px-6 py-3 bg-[var(--theme-accent)] text-white rounded-full hover:bg-[var(--theme-accent)]/80 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};