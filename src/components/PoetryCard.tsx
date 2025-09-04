import React from 'react';
import { motion } from 'framer-motion';
import { FileText, User, Calendar } from 'lucide-react';

interface Poetry {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  lines: string[];
}

interface PoetryCardProps {
  poetry: Poetry;
  onClick: () => void;
}

export const PoetryCard: React.FC<PoetryCardProps> = ({ poetry, onClick }) => {
  const previewLines = poetry.lines.slice(0, 4).filter(line => line.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] rounded-lg overflow-hidden 
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[var(--theme-accent)]/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-xs font-medium rounded-full">
            {poetry.genre}
          </span>
          <div className="flex items-center text-[var(--theme-text-secondary)] text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(poetry.publishDate).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
          {poetry.title}
        </h3>

        <div className="flex items-center text-[var(--theme-text-secondary)] text-sm mb-4">
          <User className="w-4 h-4 mr-1" />
          <span>by {poetry.author}</span>
        </div>

        <div className="space-y-1 mb-4">
          {previewLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-[var(--theme-text-secondary)] text-sm italic leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
          {poetry.lines.length > 4 && (
            <p className="text-[var(--theme-text-secondary)] text-xs">...</p>
          )}
        </div>

        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center text-[var(--theme-accent)] text-sm font-medium"
        >
          <FileText className="w-4 h-4 mr-2" />
          Read Poem →
        </motion.div>
      </div>
    </motion.div>
  );
};