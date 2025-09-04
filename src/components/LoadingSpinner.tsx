import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--theme-bg-primary)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Sparkles className="w-12 h-12 text-[var(--theme-accent)]" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[var(--theme-text-secondary)] text-lg"
        >
          Loading magical content...
        </motion.p>
      </motion.div>
    </div>
  );
};