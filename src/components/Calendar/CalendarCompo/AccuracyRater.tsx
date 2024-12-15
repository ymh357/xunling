import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface Props {
  currentRating?: number;
  onRate: (rating: number) => void;
}

const AccuracyRater = ({ currentRating = 0, onRate }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-[#8B4513] font-medium mb-2">准确度评价</Text>
      <View className="flex-row bg-[#8B4513]/10 rounded-lg p-3 items-center">
        {[1, 2, 3, 4, 5].map(rating => (
          <TouchableOpacity
            key={rating}
            onPress={() => onRate(rating)}
            className="flex-1 items-center"
          >
            <Icon
              name={rating <= currentRating ? 'star' : 'star-outline'}
              size={24}
              color="#8B4513"
            />
            <Text className="text-[#8B4513] text-xs mt-1">{rating}星</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-[#8B4513]/70 text-xs mt-2 text-center">请为今日运势准确度打分</Text>
    </View>
  );
};

export default AccuracyRater;
