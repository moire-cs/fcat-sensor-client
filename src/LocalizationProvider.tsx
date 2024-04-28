import { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'es';
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}>({ language: 'en', setLanguage: () => {} });

export const LocalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(getLocalLanguage());
  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const getLocalLanguage = () => {
  const lang = localStorage.getItem('lang');
  if (lang !== 'es' && lang !== 'en') {
    return 'en';
  }
  return lang;
};

export const getLanguageName = (context: { language: Language }) => {
  const languageMap: Record<Language, string> = {
    en: 'English',
    es: 'Español',
  };
  return languageMap[context.language];
};
