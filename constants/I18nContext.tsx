import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from '../constants/i18n';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const I18nContext = createContext<I18nContextProps>({
  language: 'fa',
  setLanguage: () => {},
  t: (key) => translations['fa'][key] || key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');
  const t = (key: keyof typeof translations['fa']) => translations[language][key] || translations['fa'][key] || key;
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
