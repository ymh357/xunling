import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import { useBazi } from '@/store/foundation';
import clsx from 'clsx';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="flex-row justify-between mb-4">
      {[1, 2, 3, 4].map(item => (
        <View key={item} className="items-center">
          <View className="bg-[#8B4513]/10 rounded-lg p-3 w-[80px]">
            <View className="w-full h-6 rounded bg-[#8B4513]/20 mb-1" />
            <View className="w-full h-6 rounded bg-[#8B4513]/20" />
          </View>
          <View className="w-12 h-5 mt-2 rounded bg-[#8B4513]/20" />
          <View className="w-16 h-4 mt-1 rounded bg-[#8B4513]/20" />
        </View>
      ))}
    </View>

    <View className="bg-[#8B4513]/10 rounded-lg p-3">
      <View className="w-32 h-6 rounded bg-[#8B4513]/20 mb-2" />
      <View className="w-full h-16 rounded bg-[#8B4513]/20" />
    </View>
  </View>
);

const ActualComp = () => {
  const { data, isLoading } = useBazi();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-4">
        <Icon name="book-open-variant" size={24} color="#8B4513" />
        <Text className="text-xl font-bold text-[#8B4513] ml-2">八字基础</Text>
      </View>

      <View className="flex-row justify-between mb-4">
        {data.pillars.map((item, index) => (
          <View key={index} className="items-center">
            <View className="bg-[#8B4513]/10 rounded-lg p-3 w-[80px]">
              <Text className="text-center text-[#8B4513] font-medium mb-1">{item.parts[0]}</Text>
              <Text className="text-center text-[#8B4513] font-medium">{item.parts[1]}</Text>
            </View>
            <Text className="text-[#8B4513] mt-2">{item.name}</Text>
            <Text className="text-[#8B4513]/70 text-xs mt-1">{item.desc}</Text>
          </View>
        ))}
      </View>

      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <Text className="text-[#8B4513] font-medium mb-2">八字基本概念</Text>
        <Text className="text-[#8B4513]/70 text-sm leading-6">{data.introduction}</Text>
      </View>
    </View>
  );
};

export default function BaZi() {
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
