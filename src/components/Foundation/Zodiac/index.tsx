import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import { useZodiac } from '@/store/foundation';
import clsx from 'clsx';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="bg-[#8B4513]/10 rounded-lg p-4 mb-4">
      <View className="w-32 h-6 rounded bg-[#8B4513]/20 mb-2" />
      <View className="w-40 h-5 rounded bg-[#8B4513]/20" />
    </View>

    <View className="flex-row flex-wrap">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
        <View key={item} className="w-1/4 p-2">
          <View className="items-center p-2 rounded-lg bg-[#8B4513]/10">
            <View className="w-8 h-8 rounded bg-[#8B4513]/20" />
            <View className="w-6 h-4 mt-1 rounded bg-[#8B4513]/20" />
          </View>
        </View>
      ))}
    </View>
  </View>
);

const ActualComp = () => {
  const { data, isLoading } = useZodiac();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  const zodiacIndex = (data.currentYear - 4) % 12;

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-4">
        <Icon name="paw" size={24} color="#8B4513" />
        <Text className="text-xl font-bold text-[#8B4513] ml-2">生肖解析</Text>
      </View>

      <View className="bg-[#8B4513]/10 rounded-lg p-4 mb-4">
        <Text className="text-[#8B4513] font-medium mb-2">
          本年生肖：{data.zodiacs[zodiacIndex].name}年
        </Text>
        <Text className="text-[#8B4513]/70">{data.zodiacs[zodiacIndex].nature}</Text>
      </View>

      <View className="flex-row flex-wrap">
        {data.zodiacs.map((zodiac, index) => (
          <TouchableOpacity key={index} className="w-1/4 p-2">
            <View
              className={`items-center p-2 rounded-lg ${
                index === zodiacIndex ? 'bg-[#8B4513]/10' : ''
              }`}
            >
              <Text className="text-lg text-[#8B4513]">{zodiac.name}</Text>
              <Text className="text-sm text-[#8B4513]/70">{zodiac.year}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function Zodiac() {
  return (
    <PlaceholderPreview
      showActualComp
      renderPlaceholder={(onClick, compReady) => (
        <TouchableOpacity onPress={() => onClick()}>
          <View
            className={clsx({
              ['bg-red-200']: !compReady,
              ['bg-green-200']: compReady,
            })}
          >
            <Skeleton />
          </View>
        </TouchableOpacity>
      )}
    >
      <ActualComp />
    </PlaceholderPreview>
  );
}
