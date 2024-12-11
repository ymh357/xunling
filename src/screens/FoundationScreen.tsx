import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import WuXing from '@/components/Foundation/WuXing';
import Zodiac from '@/components/Foundation/Zodiac';
import BaZi from '@/components/Foundation/BaZi';
import Terms from '@/components/Foundation/Terms';

const FoundationScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <ScrollView className="flex-1">
        <View className="flex p-4 space-y-4">
          <WuXing />
          <Zodiac />
          <BaZi />
          <Terms />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoundationScreen;
