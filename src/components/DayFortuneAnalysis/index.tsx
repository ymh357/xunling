import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { selectedDateAtom } from '@/store/atoms/calendar';
import { fetchDayFortune } from '@/services/dayFortune';
import PlaceholderPreview from '@/components/PlaceholderPreview';

const Skeleton = () => (
  <View className="mx-4 bg-white/80 rounded-lg p-4 space-y-4">
    <View className="w-24 h-6 bg-[#8B4513]/20 rounded" />
    {[1, 2, 3, 4, 5].map(i => (
      <View key={i} className="space-y-2">
        <View className="w-16 h-5 bg-[#8B4513]/20 rounded" />
        <View className="w-full h-16 bg-[#8B4513]/10 rounded" />
      </View>
    ))}
  </View>
);

const DayFortuneAnalysis = () => {
  const [selectedDate] = useAtom(selectedDateAtom);
  const { data, isLoading } = useQuery({
    queryKey: ['dayFortune', selectedDate],
    queryFn: () => fetchDayFortune(selectedDate),
  });

  const sections = [
    { title: '运势概述', content: data?.overview },
    { title: '事业运势', content: data?.career },
    { title: '财运', content: data?.wealth },
    { title: '感情运势', content: data?.love },
    { title: '健康运势', content: data?.health },
  ];

  return (
    <PlaceholderPreview showActualComp={!isLoading} renderPlaceholder={() => <Skeleton />}>
      <View className="mx-4 bg-white/80 rounded-lg p-4">
        <Text className="text-lg font-medium text-[#8B4513] mb-4">今日运势详解</Text>
        <View className="space-y-4">
          {sections.map((section, index) => (
            <View key={index}>
              <Text className="text-[#8B4513] font-medium mb-2">{section.title}</Text>
              <View className="bg-[#8B4513]/10 rounded-lg p-3">
                <Text className="text-[#8B4513]/80 leading-5">{section.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </PlaceholderPreview>
  );
};

export default DayFortuneAnalysis;
