import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { languageAtom } from '@/store/preference';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LanguageSwitch = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const { t, i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    await i18n.changeLanguage(newLang); // 直接调用 i18n 切换语言
    setLanguage(newLang); // 更新状态
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className="flex-row justify-between items-center p-4 bg-white/80 rounded-lg"
    >
      <View className="flex-row items-center">
        <Icon name="translate" size={24} color="#8B4513" />
      </View>
      <View className="flex-row items-center">
        <Text className="text-[#8B4513]/70 mr-2">{language === 'zh' ? '中文' : 'English'}</Text>
        <Icon name="chevron-right" size={20} color="#8B4513" />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageSwitch;
