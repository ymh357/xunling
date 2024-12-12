import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';
import BasicDay from 'react-native-calendars/src/calendar/day/basic';
import PeriodDay from 'react-native-calendars/src/calendar/day/period';
import { getDayMood } from './util';
import dayjs from 'dayjs';

LocaleConfig.locales['zh-CN'] = {
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
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
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  amDesignator: '上午',
  pmDesignator: '下午',
  today: '今天',
};

LocaleConfig.defaultLocale = 'zh-CN';

export const CalendarComp: React.FC<{
  initialDate?: string;
  onDateChange?: (date: string) => void;
}> = ({ onDateChange, initialDate = dayjs().format('YYYY-MM-DD') }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const handleDayPress = (date: DateData) => {
    setCurrentDate(date.dateString);
    onDateChange?.(date.dateString);
  };

  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);

  return (
    <CalendarList
      // onStartReached={info => {
      //   console.log('[dodo] ', 'indo', info);
      // }}
      // Enable horizontal scrolling, default = false
      horizontal
      // Enable paging on horizontal, default = false
      pagingEnabled
      // Set custom calendarWidth.
      // calendarWidth={393}
      // Customize the appearance of the calendar
      style={{
        height: 360,
      }}
      hideExtraDays={false}
      disableMonthChange={false}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#dd99ee',
      }}
      dayComponent={({ date, ...props }) => {
        if (!date) {
          return null;
        }

        const mood = getDayMood(date);
        const OriginCompo = props.markingType === 'period' ? PeriodDay : BasicDay;

        return (
          <View style={styles.dayItem}>
            <OriginCompo date={date?.dateString} {...props} />
            {!!mood && <Text style={styles.dayTag}>{mood}</Text>}
          </View>
        );
      }}
      //   customHeader={(props) => {}}
      current={currentDate}
      onDayPress={handleDayPress}
      markedDates={{
        [currentDate]: {
          selected: true,
          marked: true,
          selectedColor: 'blue',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  dayItem: {
    // backgroundColor: '#f7f7f7',
    borderRadius: 50,
    boxShadow: '0 0 2px rgba(0,0,0,0.2)',
    position: 'relative',
  },
  dayTag: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 14,
    height: 20,
    justifyContent: 'center',
    lineHeight: 20,
    position: 'absolute',
    right: 0,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    top: -10,
    width: 20,
  },
});
