import React from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text } from 'react-native';
import clsx from 'clsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <View className="w-24 h-8 rounded bg-[#8B4513]/20" />
        <View className="w-16 h-5 ml-2 rounded bg-[#8B4513]/20" />
      </View>
      <View className="flex-row items-center">
        <View className="w-4 h-4 rounded-full bg-[#8B4513]/20" />
        <View className="w-20 h-5 ml-1 rounded bg-[#8B4513]/20" />
      </View>
    </View>
  </View>
);

const ActualComp = () => {
  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-[#8B4513]">2024.03.14</Text>
          <Text className="text-[#8B4513]/70 text-sm ml-2">星期四</Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="moon-waning-crescent" size={16} color="#8B4513" />
          <Text className="text-[#8B4513]/70 text-sm ml-1">农历二月初四</Text>
        </View>
      </View>
    </View>
  );
};

export default function () {
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
