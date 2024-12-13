import { View, TouchableOpacity, Text } from 'react-native';
import PlaceholderPreview from '@/components/PlaceholderPreview';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Calendar as RNCalendar, LocaleConfig, DateData } from 'react-native-calendars';
import { useCalendarData, useSubmitMood, useSubmitAccuracy } from '@/store/calendar';
import DayDetail from './CalendarCompo/DayDetail';
import { DayData } from '@/types/calendar';
import { useAtom } from 'jotai';
import { selectedDateAtom } from '@/store/atoms/calendar';

const Skeleton = () => (
  <View className="w-full h-[42vh] bg-white/80 rounded-lg p-4">
    {/* 月份导航 */}
    <View className="flex-row justify-between items-center mb-4">
      <View className="w-24 h-6 rounded bg-[#8B4513]/20" />
      <View className="w-20 h-6 rounded bg-[#8B4513]/20" />
    </View>

    {/* 星期表头 */}
    <View className="flex-row justify-between mb-4">
      {[1, 2, 3, 4, 5, 6, 7].map(i => (
        <View key={i} className="w-8 h-4 rounded bg-[#8B4513]/20" />
      ))}
    </View>

    {/* 日期网格 */}
    <View className="flex-row flex-wrap">
      {[...Array(35)].map((_, i) => (
        <View key={i} className="w-[14.28%] aspect-square p-1">
          <View className="w-full h-full rounded bg-[#8B4513]/10" />
        </View>
      ))}
    </View>
  </View>
);

// 中文本地化配置
LocaleConfig.locales.zh = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};
LocaleConfig.defaultLocale = 'zh';

// 获取评分对应的样式类名
const getAccuracyClass = (accuracy?: number) => {
  if (accuracy === undefined) return '';

  if (accuracy >= 2.5) {
    // 准确度高 - 绿色系
    if (accuracy >= 4.5) return 'bg-green-500/40';
    if (accuracy >= 4.0) return 'bg-green-500/35';
    if (accuracy >= 3.5) return 'bg-green-500/30';
    if (accuracy >= 3.0) return 'bg-green-500/20';
    return 'bg-green-500/10';
  } else {
    // 准确度低 - 红色系
    if (accuracy >= 2.0) return 'bg-red-500/40';
    if (accuracy >= 1.5) return 'bg-red-500/30';
    if (accuracy >= 1.0) return 'bg-red-500/20';
    return 'bg-red-500/10';
  }
};

// 获取合适长度的显示文本和类型
const getSubtitleInfo = (
  dayData?: DayData
): { text: string; type: 'event' | 'solarTerm' | 'lunar' } => {
  if (!dayData) return { text: '', type: 'lunar' };

  // 优先查找长度合适的节日/事件
  if (dayData.events && dayData.events.length > 0) {
    const suitableEvent = dayData.events.find(event => event.length <= 4);
    if (suitableEvent) return { text: suitableEvent, type: 'event' };
  }

  // 其次显示节气
  if (dayData.solarTerm) {
    return { text: dayData.solarTerm, type: 'solarTerm' };
  }

  // 最后显示农历
  return { text: dayData.lunarDay, type: 'lunar' };
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [detailDate, setDetailDate] = useState('');

  // 使用新的 hooks
  const { data: calendarData, isLoading } = useCalendarData();
  const { mutate: submitMoodMutation } = useSubmitMood();
  const { mutate: submitAccuracyMutation } = useSubmitAccuracy();

  const theme = {
    calendarBackground: 'transparent',
    textSectionTitleColor: '#8B4513',
    selectedDayBackgroundColor: '#8B4513',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#8B4513',
    dayTextColor: '#8B4513',
    textDisabledColor: '#8B4513/40',
    dotColor: '#8B4513',
    monthTextColor: '#8B4513',
    textMonthFontFamily: 'serif',
    textDayFontFamily: 'serif',
    textDayHeaderFontFamily: 'serif',
  };

  const renderCustomDay = (date: DateData) => {
    const dayData = calendarData?.days[date.dateString];
    const isToday = date.dateString === new Date().toISOString().split('T')[0];
    const subtitleInfo = getSubtitleInfo(dayData);

    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(date.dateString)}
        onLongPress={() => setDetailDate(date.dateString)}
      >
        <View
          className={clsx(
            'items-center justify-center p-2 rounded-lg',
            getAccuracyClass(dayData?.accuracy),
            isToday && 'border-2 border-[#8B4513]'
          )}
        >
          <Text
            className={clsx('text-base', isToday ? 'text-[#8B4513] font-bold' : 'text-[#8B4513]')}
          >
            {date.day}
          </Text>
          {dayData && (
            <Text
              className={clsx(
                'text-xs',
                {
                  'text-red-600 font-medium': subtitleInfo.type === 'event',
                  'text-[#8B4513] font-medium': subtitleInfo.type === 'solarTerm',
                  'text-[#8B4513]/60': subtitleInfo.type === 'lunar',
                },
                isToday && 'font-medium'
              )}
              numberOfLines={1}
            >
              {subtitleInfo.text}
            </Text>
          )}
          {dayData?.mood && (
            <View className="absolute top-1 right-1">
              <Text className="text-xs">{dayData.mood.emoji}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <View className="flex-1 bg-[#FDF5E6]">
      <RNCalendar
        theme={theme}
        dayComponent={({ date }: { date: DateData }) => renderCustomDay(date)}
        enableSwipeMonths
        className="rounded-lg bg-white/80 p-4"
        markedDates={calendarData?.days || {}}
      />

      {!!detailDate && (
        <DayDetail
          date={selectedDate}
          dayData={calendarData?.days[selectedDate]}
          onClose={() => setDetailDate('')}
          onSubmitMood={mood => submitMoodMutation({ date: selectedDate, mood })}
          onSubmitAccuracy={rating => submitAccuracyMutation({ date: selectedDate, rating })}
        />
      )}
    </View>
  );
};

const CalendarWrapper = () => {
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
      <View className="flex-1 bg-[#FDF5E6] p-4">
        <Calendar />
      </View>
    </PlaceholderPreview>
  );
};

export default CalendarWrapper;
