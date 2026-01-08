
import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogoClick: () => void;
  onHowItWorksClick: () => void;
  onExamplesClick: () => void;
  onSignInClick: () => void;
  isLoggedIn: boolean;
}

const AppShell: React.FC<AppShellProps> = ({ 
  children, 
  isDarkMode, 
  onToggleDarkMode, 
  onLogoClick,
  onHowItWorksClick,
  onExamplesClick,
  onSignInClick,
  isLoggedIn
}) => {
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">G</div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Group Photo AI</h1>
          </button>
          
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-400 mr-4">
              <button 
                onClick={onHowItWorksClick}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                How it works
              </button>
              <button 
                onClick={onExamplesClick}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Examples
              </button>
            </nav>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2 hidden md:block"></div>

            {!isLoggedIn ? (
              <button
                onClick={onSignInClick}
                className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800">
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">U</div>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Active Quota</span>
              </div>
            )}
            
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 hover:ring-indigo-500 transition-all focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow dark:bg-gray-950 transition-colors duration-300">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Group Photo AI. Professional compositing powered by Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
