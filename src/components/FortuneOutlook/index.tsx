import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDailyFortune } from '@/store/home';
import { useTranslation } from 'react-i18next';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-24 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="flex-row flex-wrap">
      {[1, 2, 3, 4].map(item => (
        <View key={item} className="w-1/2 p-2">
          <View className="bg-[#8B4513]/10 rounded-lg p-3">
            <View className="flex-row items-center mb-2">
              <View className="w-4 h-4 rounded-full bg-[#8B4513]/20" />
              <View className="w-16 h-5 ml-2 rounded bg-[#8B4513]/20" />
            </View>
            <View className="w-12 h-7 rounded bg-[#8B4513]/20" />
          </View>
        </View>
      ))}
    </View>
  </View>
);

const FortuneOutlook = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useDailyFortune();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-3">
        <Icon name="star-four-points" size={20} color="#8B4513" />
        <Text className="text-[#8B4513] font-medium ml-2">{t('fortune.todayFortune')}</Text>
      </View>

      <View className="flex-row flex-wrap">
        {[
          { label: t('fortune.wealth'), value: `${data.wealth}%`, icon: 'cash' },
          { label: t('fortune.career'), value: `${data.career}%`, icon: 'briefcase' },
          { label: t('fortune.health'), value: `${data.health}%`, icon: 'heart' },
          {
            label: t('fortune.relationship'),
            value: `${data.relationship}%`,
            icon: 'heart-multiple',
          },
        ].map((item, index) => (
          <View key={index} className="w-1/2 p-2">
            <View className="bg-[#8B4513]/10 rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <Icon name={item.icon} size={16} color="#8B4513" />
                <Text className="text-[#8B4513] ml-2">{item.label}</Text>
              </View>
              <Text className="text-[#8B4513] text-lg font-medium">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FortuneOutlook;
