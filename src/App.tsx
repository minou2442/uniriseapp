import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import QuestionnaireForm from './components/QuestionnaireForm';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setResult('');
    setError(null);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-secondary-900 dark:to-secondary-950 transition-colors duration-500">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
            <Header />
            
            <main className="mt-10 pb-24">
              <AnimatePresence mode="wait">
                {isLoading && <LoadingOverlay />}
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in">
                    <p className="font-medium">Error: {error}</p>
                    <button 
                      onClick={handleReset}
                      className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
                
                {!result && !error ? (
                  <QuestionnaireForm 
                    onResultReceived={setResult} 
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    setError={setError}
                  />
                ) : !error ? (
                  <ResultsDisplay 
                    result={result} 
                    onReset={handleReset}
                  />
                ) : null}
              </AnimatePresence>
            </main>
            
            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;