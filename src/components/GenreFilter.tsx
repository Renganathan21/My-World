import React from 'react';
import { motion } from 'framer-motion';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-4">Filter by Genre</h3>
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenreSelect(null)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            selectedGenre === null
              ? 'bg-[var(--theme-accent)] text-white shadow-lg'
              : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)]'
          }`}
        >
          All
        </motion.button>
        {genres.map((genre, index) => (
          <motion.button
            key={genre}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGenreSelect(genre)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedGenre === genre
                ? 'bg-[var(--theme-accent)] text-white shadow-lg'
                : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-accent)]'
            }`}
          >
            {genre}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};