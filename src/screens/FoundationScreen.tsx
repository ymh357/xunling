import Bazi from '@/components/Bazi';
import FiveElements from '@/components/FiveElements';
import Lunar from '@/components/Lunar';
import Search from '@/components/Search';
import SolarTerms from '@/components/SolarTerms';
import React from 'react';

import { View } from 'react-native';

const FoundationScreen = () => {
  return (
    <View className="flex h-full ">
      <View>
        <Search />
      </View>
      <View className="mt-2">
        <Lunar />
      </View>
      <View className="mt-2">
        <SolarTerms />
      </View>
      <View className="mt-2">
        <Bazi />
      </View>
      <View className="mt-2">
        <FiveElements />
      </View>
    </View>
  );
};

export default FoundationScreen;
