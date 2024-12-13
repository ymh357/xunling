import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MoodData } from '@/types/calendar';

interface Props {
  currentMood?: MoodData['type'];
  onSelect: (mood: MoodData['type']) => void;
}

const moods: Array<{
  type: MoodData['type'];
  emoji: string;
  label: string;
}> = [
  { type: 'happy', emoji: '😊', label: '开心' },
  { type: 'normal', emoji: '😐', label: '一般' },
  { type: 'sad', emoji: '😢', label: '难过' },
  { type: 'angry', emoji: '😠', label: '生气' },
  { type: 'excited', emoji: '🥳', label: '兴奋' },
];

const MoodSelector = ({ currentMood, onSelect }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-[#8B4513] font-medium mb-2">今日心情</Text>
      <View className="flex-row justify-between bg-[#8B4513]/10 rounded-lg p-3">
        {moods.map(mood => (
          <TouchableOpacity
            key={mood.type}
            onPress={() => onSelect(mood.type)}
            className={`items-center p-2 rounded-lg ${
              currentMood === mood.type ? 'bg-[#8B4513]/20' : ''
            }`}
          >
            <Text className="text-2xl mb-1">{mood.emoji}</Text>
            <Text className="text-[#8B4513] text-xs">{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MoodSelector;
