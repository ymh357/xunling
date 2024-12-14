import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { selectedDateAtom } from '@/store/atoms/calendar';
import { fetchDayParameters } from '@/services/dayFortune';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import { useTranslation } from 'react-i18next';

const Skeleton = () => (
  <View className="mx-4 bg-white/80 rounded-lg p-4 space-y-4">
    <View className="w-24 h-6 bg-[#8B4513]/20 rounded" />
    <View className="flex-row flex-wrap gap-4">
      {[1, 2, 3, 4].map(i => (
        <View key={i} className="w-[45%] h-20 bg-[#8B4513]/10 rounded" />
      ))}
    </View>
    <View className="space-y-3">
      {[1, 2, 3, 4, 5].map(i => (
        <View key={i} className="w-full h-6 bg-[#8B4513]/20 rounded" />
      ))}
    </View>
  </View>
);

const LuckMeter = ({ value }: { value: number }) => (
  <View className="w-full h-2 bg-[#8B4513]/20 rounded-full overflow-hidden">
    <View className="h-full bg-[#8B4513]" style={{ width: `${value}%` }} />
  </View>
);

const DayParameters = () => {
  const { t } = useTranslation();
  const [selectedDate] = useAtom(selectedDateAtom);
  const { data, isLoading } = useQuery({
    queryKey: ['dayParameters', selectedDate],
    queryFn: () => fetchDayParameters(selectedDate),
  });

  const renderParameterBox = (title: string, items: string[] | number[]) => (
    <View className="bg-[#8B4513]/10 rounded-lg p-3 flex-1 min-w-[45%]">
      <Text className="text-[#8B4513] font-medium mb-2">{title}</Text>
      <Text className="text-[#8B4513]/80">{Array.isArray(items) ? items.join('、') : items}</Text>
    </View>
  );

  return (
    <PlaceholderPreview showActualComp={!isLoading} renderPlaceholder={() => <Skeleton />}>
      <View className="mx-4 bg-white/80 rounded-lg p-4">
        <Text className="text-lg font-medium text-[#8B4513] mb-4">
          {t('fortune.todayParameters')}
        </Text>

        {/* 参数盒子 */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          {data && (
            <>
              {renderParameterBox(t('fortune.luckyNumbers'), data.luckyNumbers)}
              {renderParameterBox(t('fortune.luckyColors'), data.luckyColors)}
              {renderParameterBox(t('fortune.luckyDirections'), data.luckyDirections)}
              {renderParameterBox(t('fortune.luckyTime'), data.luckyTime)}
            </>
          )}
        </View>

        {/* 运势指数 */}
        {data && (
          <View className="space-y-6">
            <View className="space-y-2">
              <View className="mb-2">
                <Text className="text-[#8B4513] font-medium">{t('fortune.generalLuck')}</Text>
              </View>
              <LuckMeter value={data.generalLuck} />
              <Text className="text-[#8B4513]/60 text-right">{data.generalLuck}%</Text>
            </View>

            <View className="space-y-4">
              {[
                { label: t('fortune.careerLuck'), value: data.careerLuck },
                { label: t('fortune.wealthLuck'), value: data.wealthLuck },
                { label: t('fortune.loveLuck'), value: data.loveLuck },
                { label: t('fortune.healthLuck'), value: data.healthLuck },
              ].map((item, index) => (
                <View key={index} className="space-y-1">
                  <View className="mb-2">
                    <Text className="text-[#8B4513]/80">{item.label}</Text>
                  </View>
                  <LuckMeter value={item.value} />
                  <Text className="text-[#8B4513]/60 text-right">{item.value}%</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </PlaceholderPreview>
  );
};

export default DayParameters;
