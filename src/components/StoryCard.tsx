import React from 'react';
import { motion } from 'framer-motion';
import { Book, User, Calendar } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  excerpt: string;
  coverImage: string;
}

interface StoryCardProps {
  story: Story;
  onClick: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] rounded-lg overflow-hidden shadow-lg 
                    hover:shadow-xl transition-all duration-300 hover:border-[var(--theme-accent)]/50">
        <div className="relative overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute bottom-4 left-4 text-white"
          >
            <Book className="w-6 h-6" />
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-xs font-medium rounded-full">
              {story.genre}
            </span>
            <div className="flex items-center text-[var(--theme-text-secondary)] text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(story.publishDate).toLocaleDateString()}
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
            {story.title}
          </h3>

          <div className="flex items-center text-[var(--theme-text-secondary)] text-sm mb-3">
            <User className="w-4 h-4 mr-1" />
            <span>by {story.author}</span>
          </div>

          <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>

          <motion.div
            whileHover={{ x: 5 }}
            className="mt-4 text-[var(--theme-accent)] text-sm font-medium"
          >
            Read Story →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};