import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PluginPanel } from './PluginPanel';
import { CalendarComp } from './Calendar';
import dayjs from 'dayjs';
import { getLunarInfo, getTodayInfo } from './util';

export const CalendarCompo = (): React.JSX.Element => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { lunarDate, lunarGanZhiDate, time } = getLunarInfo(currentDate);
  const { dayText, dateText, progressText } = getTodayInfo(currentDate);

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <CalendarComp initialDate={currentDate} onDateChange={onDateChanged} />
        </View>
        <View style={styles.pluginList}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.infoBlock, ...styles.flex, marginRight: 10 }}>
              <Text style={styles.blockTitle}>{lunarDate}</Text>
              <Text style={styles.blockText}>{lunarGanZhiDate}</Text>
              <Text style={styles.blockText}>{time}</Text>
            </View>
            <View style={{ ...styles.infoBlock, ...styles.flex }}>
              <Text style={styles.blockTitle}>{dayText}</Text>
              <Text style={styles.blockText}>{dateText}</Text>
              <Text style={styles.blockText}>{progressText}</Text>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <Text style={{ ...styles.blockTitle, ...styles.red }}>世界人权日</Text>
          </View>
          <PluginPanel title="我的运势" desc="没有最好的运势, 只有更好的选择" />
          <PluginPanel title="黄历择吉" desc="为美好的事情选个好日子" />
          <PluginPanel title="心情-状态" desc="记录每日状态" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blockText: {
    fontSize: 14,
    lineHeight: 20,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  flex: {
    flex: 1,
  },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
    marginBottom: 10,
    padding: 10,
  },
  pluginList: {
    padding: 10,
  },
  red: {
    color: 'red',
  },
});
