import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAtom } from 'jotai';
import { characterAnalysisAtom, canShowCharacterAnalysisAtom } from '@/store/profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import clsx from 'clsx';
import PlaceholderPreview from '../PlaceholderPreview';

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-24 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="space-y-4">
      {/* 命格概述 */}
      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <View className="w-20 h-5 mb-2 rounded bg-[#8B4513]/20" />
        <View className="w-full h-20 rounded bg-[#8B4513]/20" />
      </View>

      {/* 五行属性 */}
      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <View className="w-20 h-5 mb-3 rounded bg-[#8B4513]/20" />
        <View className="flex-row flex-wrap">
          {[1, 2, 3, 4, 5].map(item => (
            <View key={item} className="w-1/5 items-center mb-2">
              <View className="w-8 h-8 rounded-full bg-[#8B4513]/20" />
              <View className="w-12 h-4 mt-1 rounded bg-[#8B4513]/20" />
            </View>
          ))}
        </View>
      </View>

      {/* 性格特点 */}
      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <View className="w-20 h-5 mb-3 rounded bg-[#8B4513]/20" />
        <View className="flex-row flex-wrap">
          {[1, 2, 3, 4].map(item => (
            <View key={item} className="bg-[#8B4513]/20 rounded-full px-4 py-1 mr-2 mb-2">
              <View className="w-16 h-4 rounded bg-[#8B4513]/20" />
            </View>
          ))}
        </View>
      </View>

      {/* 运势建议 */}
      <View className="bg-[#8B4513]/10 rounded-lg p-3">
        <View className="w-20 h-5 mb-2 rounded bg-[#8B4513]/20" />
        <View className="w-full h-24 rounded bg-[#8B4513]/20" />
      </View>
    </View>
  </View>
);

const ActualComp = () => {
  const [characterAnalysis] = useAtom(characterAnalysisAtom);
  const [canShow] = useAtom(canShowCharacterAnalysisAtom);

  if (!canShow) {
    return (
      <View className="p-6 bg-white/80 rounded-lg">
        <View className="items-center space-y-3">
          <Icon name="lock-outline" size={32} color="#8B4513" />
          <Text className="text-[#8B4513] text-lg font-medium text-center">请先填写生辰信息</Text>
          <Text className="text-[#8B4513]/70 text-sm text-center">
            完善生辰信息，即可查看您的命理性格分析
          </Text>
        </View>
      </View>
    );
  }

  if (!characterAnalysis) {
    return (
      <View className="p-6 bg-white/80 rounded-lg">
        <View className="items-center space-y-3">
          <ActivityIndicator color="#8B4513" />
          <Text className="text-[#8B4513] text-sm">正在分析命理...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="p-6 bg-white/80 rounded-lg">
      {/* 八字信息 */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Icon name="star-circle" size={28} color="#8B4513" />
          <Text className="text-[#8B4513] text-xl font-bold ml-2">八字命盘</Text>
        </View>
        <View className="flex-row justify-between bg-[#8B4513]/5 rounded-2xl p-4">
          {characterAnalysis.bazi.map((item, index) => (
            <View key={index} className="items-center">
              <Text className="text-[#8B4513]/60 text-sm mb-1">
                {['年柱', '月柱', '日柱', '时柱'][index]}
              </Text>
              <Text className="text-[#8B4513] text-xl font-medium">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 五行属性 */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Icon name="star-four-points" size={28} color="#8B4513" />
          <Text className="text-[#8B4513] text-xl font-bold ml-2">五行分析</Text>
        </View>
        <View className="flex-row flex-wrap">
          {characterAnalysis.wuxing.map((item, index) => (
            <View key={index} className="w-1/2 pr-2 mb-3">
              <View className="bg-[#8B4513]/5 rounded-xl p-3">
                <View className="flex-row items-center mb-2">
                  <Icon name={item.icon} size={20} color="#8B4513" />
                  <Text className="text-[#8B4513] font-semibold ml-2">{item.element}</Text>
                </View>
                <View>
                  {item.traits.map((trait, i) => (
                    <Text key={i} className="text-[#8B4513]/70 text-sm">
                      {trait}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 人生方向 */}
      <View>
        <View className="bg-[#DAA520]/10 rounded-2xl p-6">
          <View className="flex-row items-center mb-4 px-4">
            <Icon name="compass" size={28} color="#8B4513" />
            <Text className="text-[#8B4513] text-xl font-bold ml-2">人生指引</Text>
          </View>
          <View className="px-4">
            <View className="flex-row items-start space-x-4">
              <View className="w-12 h-12 rounded-full bg-[#DAA520]/20 items-center justify-center">
                <Icon name="map-marker-path" size={24} color="#8B4513" />
              </View>
              <View className="flex-1">
                <Text className="text-[#8B4513] leading-7 text-base">
                  {characterAnalysis.lifeDirection}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function () {
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
      <ActualComp />
    </PlaceholderPreview>
  );
}
