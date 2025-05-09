import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="w-10 h-10 mr-2 bg-primary-500 text-white rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-secondary-800 dark:text-white">UniRise</h1>
          </motion.div>
        </div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-700 dark:text-white shadow-md hover:shadow-lg transition-all"
            aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-secondary-800 text-secondary-700 dark:text-white shadow-md hover:shadow-lg transition-all"
            aria-label={isDarkMode ? t('lightMode') : t('darkMode')}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white">
          {t('header')}
        </h2>
        <p className="mt-3 text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        
        <div className="mt-6 relative h-16 overflow-hidden">
          <motion.div 
            className="absolute inset-x-0 h-16 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-400 opacity-70 dark:opacity-50"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              borderRadius: "50% 50% 50% 50% / 20% 20% 20% 20%",
            }}
          />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;