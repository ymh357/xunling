import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import Poetry from '@/components/Poetry';
import Date from '@/components/Date';
import FortuneOutlook from '@/components/FortuneOutlook';
import FortuneDiagram from '@/components/FortuneDiagram';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <ScrollView className="flex-1">
        <View className="flex p-4 space-y-4">
          <Poetry />
          <Date />
          <FortuneOutlook />
          <FortuneDiagram />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
