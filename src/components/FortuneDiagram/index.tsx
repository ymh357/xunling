import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDirectionGuidance } from '@/store/home';
import { useTranslation } from 'react-i18next';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="bg-[#8B4513]/10 rounded-lg p-3">
      <View className="flex-row items-center mb-2">
        <View className="w-16 h-5 rounded bg-[#8B4513]/20" />
        <View className="w-8 h-5 ml-2 rounded bg-[#8B4513]/20" />
      </View>
      <View className="w-full h-12 rounded bg-[#8B4513]/20" />
    </View>
  </View>
);

const FortuneDiagram = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useDirectionGuidance();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-3">
        <Icon name="compass" size={20} color="#8B4513" />
        <Text className="text-[#8B4513] font-medium ml-2">{t('fortune.directionGuidance')}</Text>
      </View>

      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <Text className="text-[#8B4513]/80 mb-2">
          {t('fortune.todayDirection')}: <Text className="font-medium">{data.direction}</Text>
        </Text>
        <Text className="text-[#8B4513]/70 text-sm leading-6">{data.description}</Text>
      </View>
    </View>
  );
};

export default FortuneDiagram;
