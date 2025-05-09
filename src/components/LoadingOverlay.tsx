import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LoadingOverlay: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-secondary-900/70 backdrop-blur-sm"
    >
      <div className="p-8 rounded-xl bg-white dark:bg-secondary-800 shadow-xl flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          <motion.div
            animate={{
              rotate: 360,
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-primary-400 border-b-primary-300 border-l-primary-200"
          />
        </div>
        
        <motion.p 
          className="text-secondary-800 dark:text-white text-lg font-medium"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          {t('loading')}
        </motion.p>

        <div className="mt-6 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;