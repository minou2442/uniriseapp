import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ResultsDisplayProps {
  result: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const { t, language } = useLanguage();
  
  // Split the result into lines
  const resultLines = result.split('\n').filter(line => line.trim() !== '');
  
  // Find major lines (they start with a number)
  const majorResults = resultLines.filter(line => /^\d\./.test(line));
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl p-6 md:p-8"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold mb-6 text-center text-secondary-900 dark:text-white"
      >
        {t('results')}
      </motion.h2>
      
      {majorResults.length > 0 ? (
        <motion.div variants={containerVariants} className="space-y-4">
          {majorResults.map((line, index) => {
            const [numberPart, restPart] = line.split(/\.(.+)/);
            const [major, explanation] = restPart.split(/:(.+)/);
            
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`bg-gradient-to-r ${
                  index === 0 
                    ? 'from-primary-50 to-primary-100 dark:from-secondary-700 dark:to-secondary-700 border-primary-500' 
                    : 'from-secondary-50 to-white dark:from-secondary-700 dark:to-secondary-800 border-secondary-300 dark:border-secondary-600'
                } p-4 rounded-lg border-l-4 shadow-sm transition-all`}
                whileHover={{ scale: 1.01, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 ${
                    index === 0 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-800 dark:text-white'
                  } w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3`}>
                    {numberPart}
                  </div>
                  <div className={language === 'ar' ? 'text-right' : ''}>
                    <h3 className="font-bold text-lg text-secondary-900 dark:text-white">
                      {major?.trim()}
                    </h3>
                    <p className="mt-1 text-secondary-700 dark:text-secondary-300">
                      {explanation?.trim()}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.p
          variants={itemVariants}
          className="text-center text-secondary-600 dark:text-secondary-300"
        >
          {result}
        </motion.p>
      )}
      
      <motion.div 
        className="mt-8 text-center"
        variants={itemVariants}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          {t('reset')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;