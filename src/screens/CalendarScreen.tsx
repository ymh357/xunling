import Calendar from '@/components/Calendar';
import DayFortuneAnalysis from '@/components/DayFortuneAnalysis';
import DayParameters from '@/components/DayParameters';
import React from 'react';

import { SafeAreaView, ScrollView, View } from 'react-native';

const CalendarScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <ScrollView className="flex-1">
        <View className="mt-2">
          <Calendar />
        </View>
        <View className="mt-2">
          <DayFortuneAnalysis />
        </View>
        <View className="mt-2">
          <DayParameters />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
