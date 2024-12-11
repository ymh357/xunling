import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceholderPreview from '../PlaceholderPreview';
import clsx from 'clsx';
import { useDailyPoetry } from '@/store/home';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="border-l-2 border-[#8B4513]/20 pl-3 mb-4">
      <View className="w-40 h-7 bg-[#8B4513]/20 rounded mb-2 mx-auto" />
      <View className="w-20 h-5 bg-[#8B4513]/20 rounded mx-auto" />
    </View>

    <View className="bg-[#8B4513]/10 rounded-lg p-3">
      <View className="w-full h-16 bg-[#8B4513]/20 rounded" />
    </View>
  </View>
);

const ActualComp = () => {
  const { data, isLoading } = useDailyPoetry();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-3">
        <Icon name="weather-sunny" size={20} color="#8B4513" />
        <Text className="text-[#8B4513]/70 text-sm ml-2">
          {data.solarTerm} · {data.solarTermDesc}
        </Text>
      </View>

      <View className="border-l-2 border-[#8B4513]/30 pl-3 mb-4">
        <Text className="text-lg text-[#8B4513] leading-7">{data.verse}</Text>
        <Text className="text-[#8B4513]/70 text-sm mt-1">—— {data.author}</Text>
      </View>

      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <Text className="text-[#8B4513]/80 text-sm leading-6">{data.appreciation}</Text>
      </View>
    </View>
  );
};

export default function Poetry() {
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
