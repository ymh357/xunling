import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import { useWuXing } from '@/store/foundation';
import clsx from 'clsx';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="flex-row flex-wrap">
      {[1, 2, 3, 4, 5].map(item => (
        <View key={item} className="w-1/2 p-2">
          <View className="rounded-lg p-3 bg-[#8B4513]/10">
            <View className="flex-row items-center mb-2">
              <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
              <View className="w-12 h-6 ml-2 rounded bg-[#8B4513]/20" />
            </View>
            <View className="w-24 h-5 rounded bg-[#8B4513]/20" />
          </View>
        </View>
      ))}
    </View>
  </View>
);

const ActualComp = () => {
  const { data, isLoading } = useWuXing();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-4">
        <Icon name="star-four-points" size={24} color="#8B4513" />
        <Text className="text-xl font-bold text-[#8B4513] ml-2">五行基础</Text>
      </View>

      <View className="flex-row flex-wrap">
        {data.elements.map((element, index) => (
          <View key={index} className="w-1/2 p-2">
            <View className={`rounded-lg p-3 ${element.color}`}>
              <View className="flex-row items-center mb-2">
                <Icon name={element.icon} size={24} color="#8B4513" />
                <Text className="text-lg font-medium text-[#8B4513] ml-2">{element.name}</Text>
              </View>
              <Text className="text-[#8B4513]/70">{element.traits}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function WuXing() {
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
