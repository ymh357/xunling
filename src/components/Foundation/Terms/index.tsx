import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import { useTerms } from '@/store/foundation';
import clsx from 'clsx';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-20 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    {[1, 2, 3].map(category => (
      <View key={category} className="mb-4 last:mb-0">
        <View className="w-24 h-6 rounded bg-[#8B4513]/20 mb-2" />
        <View className="flex-row flex-wrap">
          {[1, 2, 3, 4].map(item => (
            <View key={item} className="bg-[#8B4513]/10 rounded-lg p-3 mr-2 mb-2">
              <View className="w-8 h-6 rounded bg-[#8B4513]/20" />
              <View className="w-16 h-4 mt-1 rounded bg-[#8B4513]/20" />
            </View>
          ))}
        </View>
      </View>
    ))}
  </View>
);

const ActualComp = () => {
  const { data, isLoading } = useTerms();

  if (isLoading || !data) {
    return <Skeleton />;
  }

  return (
    <View className="bg-white/80 rounded-lg p-4">
      <View className="flex-row items-center mb-4">
        <Icon name="book-alphabet" size={24} color="#8B4513" />
        <Text className="text-xl font-bold text-[#8B4513] ml-2">命理术语</Text>
      </View>

      {data.map((category, index) => (
        <View key={index} className="mb-4 last:mb-0">
          <Text className="text-[#8B4513] font-medium mb-2">{category.category}</Text>
          <View className="flex-row flex-wrap">
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} className="bg-[#8B4513]/10 rounded-lg p-3 mr-2 mb-2">
                <Text className="text-[#8B4513] font-medium">{item.name}</Text>
                <Text className="text-[#8B4513]/70 text-xs mt-1">{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default function Terms() {
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
