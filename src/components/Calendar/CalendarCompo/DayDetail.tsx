import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { DayData, MoodData } from '@/types/calendar';
import MoodSelector from './MoodSelector';
import AccuracyRater from './AccuracyRater';
import { useTailwind } from 'nativewind';

interface Props {
  date: string;
  dayData?: DayData;
  onClose: () => void;
  onSubmitMood: (mood: MoodData['type']) => void;
  onSubmitAccuracy: (rating: number) => void;
}

const DayDetail = ({ date, dayData, onClose, onSubmitMood, onSubmitAccuracy }: Props) => {
  const scrollViewStyle = StyleSheet.flatten(
    useTailwind({
      className: 'flex-grow',
    })
  ) as ViewStyle;
  return (
    <Modal transparent animationType="fade" visible={true} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="w-full max-w-md bg-white/90 rounded-lg p-4 max-h-[90%]">
          {/* 标题栏 */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#8B4513]">{date}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#8B4513" />
            </TouchableOpacity>
          </View>

          {/* 使用 ScrollView 包裹内容 */}
          <ScrollView contentContainerStyle={scrollViewStyle}>
            {/* 农历和节气 */}
            <View className="bg-[#8B4513]/10 rounded-lg p-3 mb-4">
              <Text className="text-[#8B4513]">
                农历：{dayData?.lunarDay}
                {dayData?.solarTerm && ` · ${dayData.solarTerm}`}
                {!!dayData?.events?.length && dayData.events.map(event => ` · ${event}`)}
              </Text>
            </View>

            {/* 宜忌 */}
            <View className="flex-row mb-4">
              <View className="flex-1 bg-[#8B4513]/10 rounded-lg p-3 mr-2">
                <Text className="text-[#8B4513] font-medium mb-2">宜</Text>
                <Text className="text-[#8B4513]/70">{dayData?.suitable.join('、') || '无'}</Text>
              </View>
              <View className="flex-1 bg-[#8B4513]/10 rounded-lg p-3 ml-2">
                <Text className="text-[#8B4513] font-medium mb-2">忌</Text>
                <Text className="text-[#8B4513]/70">{dayData?.unsuitable.join('、') || '无'}</Text>
              </View>
            </View>

            {/* 吉凶时辰 */}
            <View className="bg-[#8B4513]/10 rounded-lg p-3 mb-4">
              <Text className="text-[#8B4513] font-medium mb-2">时辰</Text>
              <Text className="text-[#8B4513]/70">
                吉时：{dayData?.luckyHours.join('、') || '无'}
              </Text>
              <Text className="text-[#8B4513]/70">
                凶时：{dayData?.unluckyHours.join('、') || '无'}
              </Text>
            </View>

            {/* 值日神煞 */}
            <View className="bg-[#8B4513]/10 rounded-lg p-3 mb-4">
              <Text className="text-[#8B4513] font-medium mb-2">值日神煞</Text>
              <Text className="text-[#8B4513]/70">{dayData?.deities.join('、') || '无'}</Text>
            </View>

            {/* 心情选择器 */}
            <MoodSelector currentMood={dayData?.mood?.type} onSelect={onSubmitMood} />

            {/* 准确度评分 */}
            <AccuracyRater currentRating={dayData?.accuracy} onRate={onSubmitAccuracy} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DayDetail;
