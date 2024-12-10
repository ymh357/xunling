import Calendar from '@/components/Calendar';
import DayFortuneAnalysis from '@/components/DayFortuneAnalysis';
import DayParameters from '@/components/DayParameters';
import React from 'react';

import { View } from 'react-native';

const CalendarScreen = () => {
  return (
    <View className="flex h-full ">
      <View>
        <Calendar />
      </View>
      <View className="mt-2">
        <DayFortuneAnalysis />
      </View>
      <View className="mt-2">
        <DayParameters />
      </View>
    </View>
  );
};

export default CalendarScreen;
