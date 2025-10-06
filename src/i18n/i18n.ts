import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Static translations for UI elements
const resources = {
  en: {
    translation: {
      "read_more": "Read more",
      "read_less": "Read less",
      "share": "Share",
      "copy_url": "Copy URL",
      "url_copied": "URL Copied!",
      "order_on_whatsapp": "Order on WhatsApp",
      "reviews": "Reviews",
      "no_reviews": "No reviews yet.",
      "posted_on": "Posted on",
      "error_fetching_data": "Error fetching data",
      "sheet_not_public": "Could not load data. Please ensure the Google Sheet is published to the web.",
      "loading": "Loading...",
      "welcome_to": "Welcome to",
    }
  },
  hi: {
    translation: {
      "read_more": "और पढ़ें",
      "read_less": "कम पढ़ें",
      "share": "शेयर करें",
      "copy_url": "यूआरएल कॉपी करें",
      "url_copied": "यूआरएल कॉपी हो गया!",
      "order_on_whatsapp": "व्हाट्सएप पर ऑर्डर करें",
      "reviews": "समीक्षाएं",
      "no_reviews": "अभी तक کوئی جائزہ نہیں.",
      "posted_on": "Posted on", // Keep in English or provide translation
      "error_fetching_data": "डेटा लाने में त्रुटि",
      "sheet_not_public": "डेटा लोड नहीं हो सका। कृपया सुनिश्चित करें कि गूगल शीट वेब पर प्रकाशित है।",
      "loading": "लोड हो रहा है...",
      "welcome_to": "आपका स्वागत है",
    }
  },
  es: {
    translation: {
      "read_more": "Leer más",
      "read_less": "Leer menos",
      "share": "Compartir",
      "copy_url": "Copiar URL",
      "url_copied": "¡URL copiada!",
      "order_on_whatsapp": "Pedir por WhatsApp",
      "reviews": "Reseñas",
      "no_reviews": "Aún no hay reseñas.",
      "posted_on": "Publicado el",
      "error_fetching_data": "Error al cargar los datos",
      "sheet_not_public": "No se pudieron cargar los datos. Asegúrese de que la hoja de Google esté publicada en la web.",
      "loading": "Cargando...",
      "welcome_to": "Bienvenido a",
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'es'],
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    resources,
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;