import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

type QuestionId = 'interest' | 'strength' | 'study' | 'motivation' | 'vision' | 'skills' | 'values' | 'challenges';

interface FormProps {
  onResultReceived: (result: string) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  setError: (error: string | null) => void;
}

const QuestionnaireForm: React.FC<FormProps> = ({ onResultReceived, setIsLoading, isLoading, setError }) => {
  const { t, language, direction } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<QuestionId, string>>({
    interest: '',
    strength: '',
    study: '',
    motivation: '',
    vision: '',
    skills: '',
    values: '',
    challenges: '',
  });

  const questions: { id: QuestionId; options: string[] }[] = [
    { id: 'interest', options: ['Technology', 'Biology', 'Economics', 'Literature', 'Arts'] },
    { id: 'strength', options: ['Problem-solving', 'Memorization', 'Creativity', 'Logic'] },
    { id: 'study', options: ['Alone', 'In a group', 'With hands-on projects', 'Remote learning'] },
    { id: 'motivation', options: ['Helping others', 'Innovation', 'Money', 'Prestige', 'Social impact'] },
    { id: 'vision', options: ['In a hospital', 'In an office', 'In a lab', 'In court', 'In an art studio', 'In an educational institution'] },
    { id: 'skills', options: ['Mathematics', 'Chemistry', 'Psychology', 'Communication', 'Research'] },
    { id: 'values', options: ['Job stability', 'Flexibility', 'Professional growth', 'Work-life balance'] },
    { id: 'challenges', options: ['Solving complex problems', 'Working with people', 'Creative innovation', 'Scientific analysis'] },
  ];

  const handleOptionSelect = (questionId: QuestionId, option: string) => {
    setAnswers(prev => ({ 
      ...prev, 
      [questionId]: language === 'en' ? option : t(option, questionId) 
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post('https://uniriseapp.onrender.com/api/predict-major', {
        answers
      });

      if (response.data && response.data.result) {
        onResultReceived(response.data.result);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error predicting major:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: 20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, backgroundColor: '#FFFAEB' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl p-6 md:p-8"
    >
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-secondary-500 dark:text-secondary-400 text-sm">
            {t('question')} {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-primary-500 font-medium text-sm">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
          <motion.div 
            className="bg-primary-500 h-2 rounded-full" 
            initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.h3 
        className={`text-xl md:text-2xl font-bold mb-6 text-secondary-900 dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}
        key={`question-${currentQuestion}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {t(currentQuestionData.id)}
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
        key={`options-${currentQuestion}`}
      >
        {currentQuestionData.options.map((option, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 transition-all hover:border-primary-500 dark:hover:border-primary-400 shadow-sm hover:shadow-md"
            onClick={() => handleOptionSelect(currentQuestionData.id, option)}
          >
            <span className="font-medium text-secondary-800 dark:text-white">
              {language === 'en' ? option : t(option, currentQuestionData.id)}
            </span>
            <ChevronRight className="w-5 h-5 text-primary-500" />
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="mt-8 flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentQuestion > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-lg bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-white hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={isLoading}
          >
            {language === 'ar' ? 'التالي' : 'Back'}
          </motion.button>
        )}
        
        {currentQuestion === 0 && <div />}

        {currentQuestion < questions.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`ml-auto px-5 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors ${
              !answers[currentQuestionData.id] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={!answers[currentQuestionData.id] || isLoading}
          >
            {language === 'ar' ? 'السابق' : 'Next'}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionnaireForm;
