import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    header: 'UniRise Major Predictor',
    subtitle: 'Find your perfect university major based on your preferences',
    interest: 'What subjects interest you the most?',
    strength: 'What are your academic strengths?',
    study: 'How do you prefer to study?',
    motivation: 'What motivates you the most?',
    vision: 'Where do you see yourself working in the future?',
    skills: 'What skills would you like to develop?',
    values: 'What do you value in a career?',
    challenges: 'What type of challenges do you enjoy?',
    submit: 'Predict My Major',
    reset: 'Start Over',
    loading: 'Analyzing your preferences...',
    results: 'Your Top Major Matches',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    english: 'English',
    arabic: 'العربية',
    footer: '© 2025 UniRise. All rights reserved.',
    options: {
      interest: {
        'Technology': 'Technology',
        'Biology': 'Biology',
        'Economics': 'Economics',
        'Literature': 'Literature',
        'Arts': 'Arts',
      },
      strength: {
        'Problem-solving': 'Problem-solving',
        'Memorization': 'Memorization',
        'Creativity': 'Creativity',
        'Logic': 'Logic',
      },
      study: {
        'Alone': 'Alone',
        'In a group': 'In a group',
        'With hands-on projects': 'With hands-on projects',
        'Remote learning': 'Remote learning',
      },
      motivation: {
        'Helping others': 'Helping others',
        'Innovation': 'Innovation',
        'Money': 'Money',
        'Prestige': 'Prestige',
        'Social impact': 'Social impact',
      },
      vision: {
        'In a hospital': 'In a hospital',
        'In an office': 'In an office',
        'In a lab': 'In a lab',
        'In court': 'In court',
        'In an art studio': 'In an art studio',
        'In an educational institution': 'In an educational institution',
      },
      skills: {
        'Mathematics': 'Mathematics',
        'Chemistry': 'Chemistry',
        'Psychology': 'Psychology',
        'Communication': 'Communication',
        'Research': 'Research',
        'Leadership skills': 'Leadership skills',
        'Technical skills': 'Technical skills',
        'Communication skills': 'Communication skills',
        'Analytical skills': 'Analytical skills',
      },
      values: {
        'Job stability': 'Job stability',
        'Flexibility': 'Flexibility',
        'Professional growth': 'Professional growth',
        'Work-life balance': 'Work-life balance',
      },
      challenges: {
        'Solving complex problems': 'Solving complex problems',
        'Working with people': 'Working with people',
        'Creative innovation': 'Creative innovation',
        'Scientific analysis': 'Scientific analysis',
      },
    },
  },
  ar: {
    header: 'متنبّئ التخصصات الجامعية',
    subtitle: 'اعثر على تخصصك الجامعي المثالي بناءً على تفضيلاتك',
    interest: 'ما هي المواضيع التي تهمك أكثر؟',
    strength: 'ما هي نقاط قوتك الأكاديمية؟',
    study: 'كيف تفضل الدراسة؟',
    motivation: 'ما الذي يحفزك أكثر؟',
    vision: 'أين ترى نفسك تعمل في المستقبل؟',
    skills: 'ما هي المهارات التي ترغب في تطويرها؟',
    values: 'ما الذي تقدره في المهنة؟',
    challenges: 'ما نوع التحديات التي تستمتع بها؟',
    submit: 'توقع تخصصي',
    reset: 'البدء من جديد',
    loading: 'جاري تحليل تفضيلاتك...',
    results: 'أفضل التخصصات المناسبة لك',
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع المضيء',
    english: 'English',
    arabic: 'العربية',
    footer: '© 2025 يونيرايز. جميع الحقوق محفوظة.',
    options: {
      interest: {
        'Technology': 'التكنولوجيا',
        'Biology': 'البيولوجيا',
        'Economics': 'الاقتصاد',
        'Literature': 'الآداب',
        'Arts': 'الفنون',
      },
      strength: {
        'Problem-solving': 'حل المشكلات',
        'Memorization': 'الحفظ والتذكر',
        'Creativity': 'الإبداع والابتكار',
        'Logic': 'المنطق والتحليل',
      },
      study: {
        'Alone': 'بمفردي',
        'In a group': 'ضمن مجموعة',
        'With hands-on projects': 'بمشاريع تطبيقية',
        'Remote learning': 'بالتعلم عن بعد',
      },
      motivation: {
        'Helping others': 'مساعدة الآخرين',
        'Innovation': 'الابتكار والتجديد',
        'Money': 'المال والربح',
        'Prestige': 'الهيبة والمكانة',
        'Social impact': 'التأثير المجتمعي',
      },
      vision: {
        'In a hospital': 'في مستشفى',
        'In an office': 'في مكتب',
        'In a lab': 'في مختبر',
        'In court': 'في المحكمة',
        'In an art studio': 'في استوديو فني',
        'In an educational institution': 'في مؤسسة تعليمية',
      },
      skills: {
        'Mathematics': 'الرياضيات',
        'Chemistry': 'الكيمياء',
        'Psychology': 'علم النفس',
        'Communication': 'التواصل',
        'Research': 'البحث العلمي',
        'Leadership skills': 'مهارات القيادة',
        'Technical skills': 'مهارات التقنية',
        'Communication skills': 'مهارات التواصل',
        'Analytical skills': 'مهارات التحليل',
      },
      values: {
        'Job stability': 'الاستقرار الوظيفي',
        'Flexibility': 'المرونة',
        'Professional growth': 'التطور المهني',
        'Work-life balance': 'التوازن بين العمل والحياة',
      },
      challenges: {
        'Solving complex problems': 'حل المشكلات المعقدة',
        'Working with people': 'العمل مع الناس',
        'Creative innovation': 'الابتكار الإبداعي',
        'Scientific analysis': 'التحليل العلمي',
      },
    },
  },
};

type LanguageContextType = {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string, section?: string) => string;
  direction: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string, section?: string): string => {
    if (section) {
      return translations[language]?.options?.[section]?.[key] || key;
    }
    return translations[language]?.[key] || key;
  };

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};