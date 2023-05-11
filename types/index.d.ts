import en from '@/utils/localisation/locales/en';
import fr from '@/utils/localisation/locales/fr';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'fr';
    // custom resources type
    resources: {
      fr: typeof fr;
      en: typeof en;
    };
    returnNull: false;
  }
}
