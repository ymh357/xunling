import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { preferencesAtom } from '@/store/preference';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LanguageSwitch = () => {
  const [preferences, setPreferences] = useAtom(preferencesAtom);

  const toggleLanguage = () => {
    setPreferences(prev => ({
      ...prev,
      language: prev.language === 'zh' ? 'en' : 'zh',
    }));
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
        <Text className="text-[#8B4513]/70 mr-2">
          {preferences.language === 'zh' ? '中文' : 'English'}
        </Text>
        <Icon name="chevron-right" size={20} color="#8B4513" />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageSwitch;
