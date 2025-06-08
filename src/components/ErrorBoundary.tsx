import React from 'react';
import i18n from '../i18n';
import languages from '../config/languages/Languages'; // Use 'languages' instead of 'languagesConfig'

type ErrorBoundaryProps = {
  children: React.ReactNode;
  language?: string;
  setLanguage?: (lang: string) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    this.forceUpdate();
  };

  render() {
    if (this.state.hasError) {
      const currentLanguage = i18n.language || this.props.language || 'en';
      let t = { ...languages.en.texts };
      if (currentLanguage && Object.prototype.hasOwnProperty.call(languages, currentLanguage)) {
        t = {
          ...t,
          ...languages[currentLanguage as keyof typeof languages].texts,
        };
      }

      const languageOptions = Object.entries(languages).map(([code, lang]) => (
        <option key={code} value={code}>
          {lang.texts.languageNames?.[code] || code.toUpperCase()}
        </option>
      ));

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
          <div className="bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-lg w-full animate-fade-in border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center w-full">
              <span className="text-5xl mb-5 animate-pulse-slow select-none">⚠️</span>
              <h1 className="text-3xl font-extrabold text-red-600 mb-3 text-center drop-shadow">
                {t.errorBoundaryTitle}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-center text-lg">
                {t.errorBoundaryMessage}
              </p>
              <button
                className="px-7 py-3 mb-6 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-all duration-200 text-lg"
                onClick={() => window.location.reload()}
              >
                {t.errorBoundaryButton}
              </button>
              <div className="flex flex-col items-center gap-2 mt-4 w-full">
                <label
                  htmlFor="error-lang"
                  className="text-base text-gray-500 dark:text-gray-400 mb-1 text-center w-full"
                >
                  {t.constructionLanguage}
                </label>
                <select
                  id="error-lang"
                  value={currentLanguage}
                  onChange={this.handleLanguageChange}
                  className="mx-auto bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-full max-w-[220px] text-base"
                  style={{ display: 'block' }}
                >
                  {languageOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
