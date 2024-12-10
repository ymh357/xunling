import React from 'react';

import { View } from 'react-native';

import Poetry from '@/components/Poetry';
import Date from '@/components/Date';
import FortuneOutlook from '@/components/FortuneOutlook';
import FortuneDiagram from '@/components/FortuneDiagram';

const HomeScreen = () => {
  return (
    <View className="flex h-full ">
      <View>
        <Poetry />
      </View>
      <View className="mt-2">
        <Date />
      </View>
      <View className="mt-2">
        <FortuneOutlook />
      </View>
      <View className="mt-2">
        <FortuneDiagram />
      </View>
    </View>
  );
};

export default HomeScreen;
