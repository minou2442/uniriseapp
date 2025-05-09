import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  
  const socialIcons = [
    { icon: <Facebook size={18} />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram size={18} />, url: "https://instagram.com", label: "Instagram" },
    { icon: <Twitter size={18} />, url: "https://twitter.com", label: "Twitter" },
  ];
  
  const iconVariants = {
    hover: { 
      scale: 1.2, 
      y: -2,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <footer className={`mt-16 border-t border-secondary-200 dark:border-secondary-700 pt-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center">
          <div className="w-8 h-8 mr-2 bg-primary-500 text-white rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span className="text-secondary-600 dark:text-secondary-300 text-sm">
            {t('footer')}
          </span>
        </div>
        
        <div className="flex space-x-4">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
              className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;