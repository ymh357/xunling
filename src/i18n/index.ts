import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh';
import en from './locales/en';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadLanguage = async () => {
  const language = await AsyncStorage.getItem('app_language');
  return language || 'zh';
};

const initI18n = async () => {
  const defaultLanguage = await loadLanguage();

  i18n.use(initReactI18next).init({
    lng: defaultLanguage,
    resources: {
      zh: {
        translation: zh,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
