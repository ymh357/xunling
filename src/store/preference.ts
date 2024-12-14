import { atomWithStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n';

export const languageAtom = atomWithStorage<'zh' | 'en'>('app_language', 'zh', {
  getItem: async key => {
    const value = await AsyncStorage.getItem(key);
    return (value ?? 'zh') as 'zh' | 'en';
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, value);
    await i18n.changeLanguage(value);
  },
  removeItem: async key => {
    await AsyncStorage.removeItem(key);
  },
});
