import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, FileText } from 'lucide-react';

interface Poetry {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishDate: string;
  lines: string[];
}

interface PoetryViewerProps {
  poetry: Poetry;
  onBack: () => void;
}

export const PoetryViewer: React.FC<PoetryViewerProps> = ({ poetry, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[var(--theme-bg-primary)]"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[var(--theme-bg-primary)]/80 border-b border-[var(--theme-border)] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Library</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-xl font-bold text-[var(--theme-text-primary)]">{poetry.title}</h1>
            <p className="text-sm text-[var(--theme-text-secondary)]">by {poetry.author}</p>
          </div>

          <div className="flex items-center space-x-2 text-[var(--theme-text-secondary)]">
            <FileText className="w-5 h-5" />
            <span className="hidden sm:inline">{poetry.genre}</span>
          </div>
        </div>
      </div>

      {/* Poetry Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] rounded-lg p-8 md:p-12 shadow-xl">
            {/* Poem Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[var(--theme-border)]">
              <span className="px-3 py-1 bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-sm font-medium rounded-full">
                {poetry.genre}
              </span>
              <div className="flex items-center text-[var(--theme-text-secondary)] text-sm">
                <User className="w-4 h-4 mr-1" />
                <span>{poetry.author}</span>
              </div>
              <div className="flex items-center text-[var(--theme-text-secondary)] text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(poetry.publishDate).toLocaleDateString()}
              </div>
            </div>

            {/* Poem Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] text-center mb-12"
            >
              {poetry.title}
            </motion.h1>

            {/* Poem Lines */}
            <div className="space-y-2">
              {poetry.lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${line.trim() === '' ? 'h-4' : ''}`}
                >
                  {line.trim() !== '' ? (
                    <p className="text-[var(--theme-text-primary)] text-lg leading-relaxed text-center md:text-left">
                      {line}
                    </p>
                  ) : (
                    <div />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: poetry.lines.length * 0.1 + 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center space-x-2 text-[var(--theme-accent)]">
                <div className="w-8 h-px bg-[var(--theme-accent)]" />
                <FileText className="w-5 h-5" />
                <div className="w-8 h-px bg-[var(--theme-accent)]" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};