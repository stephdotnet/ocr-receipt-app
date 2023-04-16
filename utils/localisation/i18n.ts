import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './locales/en';
import fr from './locales/fr';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

const i18nInit = () => {
  return i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: 'fr',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};

export default i18nInit;
