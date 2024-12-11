import BornInfoCollection from '@/components/BornInfoCollection';
import CharacterSummary from '@/components/CharacterSummary';
import Preference from '@/components/Preference';
import UserInteraction from '@/components/UserInteraction';
import React from 'react';

import { View, ScrollView, SafeAreaView } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <ScrollView className="flex-1 ">
        {/* 使用古卷轴般的米黄色背景 */}
        <View className="px-4 py-6">
          {/* 用户信息区域 - 类似古代命格卷轴的头部 */}
          <View className="bg-[#8B4513]/10 rounded-lg p-4 border-l-4 border-[#8B4513]">
            <UserInteraction />
          </View>

          {/* 生辰信息区域 - 八字信息展示 */}
          <View className="mt-6 bg-white/80 rounded-lg p-4 shadow-md border border-[#DAA520]/30">
            <BornInfoCollection />
          </View>

          {/* 性格分析区域 - 五行属性展示 */}
          <View className="mt-6 bg-white/80 rounded-lg p-4 shadow-md border border-[#DAA520]/30">
            <CharacterSummary />
          </View>

          {/* 偏好设置区域 - 命理配置 */}
          <View className="mt-6 mb-6 bg-white/80 rounded-lg p-4 shadow-md border border-[#DAA520]/30">
            <Preference />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
