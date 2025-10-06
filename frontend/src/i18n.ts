import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // you can add translations here
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to React and react-i18next'
        }
      },
      hi: {
        translation: {
          welcome: 'React और react-i18next में आपका स्वागत है'
        }
      },
      ar: {
        translation: {
          welcome: 'مرحباً بك في React و react-i18next'
        }
      }
    }
  });

export default i18n;
