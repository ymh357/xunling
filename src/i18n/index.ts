import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh';
import en from './locales/en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const loadLanguage = async () => {
  const language = await AsyncStorage.getItem('app_language');
  return language || 'zh';
};

export const useSetI18nFromStorage = () => {
  useState(() => {
    initI18n();
  });
  useEffect(() => {
    async function tmp() {
      try {
        const storedLng = await loadLanguage();
        if (storedLng) {
          i18n.changeLanguage(storedLng);
        }
      } catch (error) {
        console.error('Failed to load language:', error);
      }
    }
    tmp();
  }, []);
};

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    lng: 'zh',
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

export default i18n;
