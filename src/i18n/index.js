import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON dil dosyaları
import en from "./en.json";
import tr from "./tr.json";

i18n
  .use(initReactI18next) // React ile kullanmak için
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: "en", // default dil
    fallbackLng: "en", // eğer key bulunmazsa kullanılacak dil
    interpolation: {
      escapeValue: false, // React zaten XSS korumalı
    },
  });

export default i18n;
