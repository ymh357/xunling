import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import { BirthInfo, birthInfoAtom, characterAnalysisAtom } from '@/store/profile';
import { useMutation } from '@tanstack/react-query';
import PlaceholderPreview from '../PlaceholderPreview';
import clsx from 'clsx';
import { fetchCharacterAnalysis } from '@/services/profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BirthInfoForm from './subs/BirthInfoForm';

const ActualComp = () => {
  const [showForm, setShowForm] = useState(false);
  const [birthInfo, setBirthInfo] = useAtom(birthInfoAtom);
  const [, setCharacterAnalysis] = useAtom(characterAnalysisAtom);

  const analysisMutation = useMutation({
    mutationFn: fetchCharacterAnalysis,
    onSuccess: data => {
      setCharacterAnalysis(data);
    },
  });

  const handleSubmit = async (newBirthInfo: BirthInfo) => {
    setBirthInfo({ ...newBirthInfo, isComplete: true });
    setShowForm(false);
    // 获取性格分析数据
    await analysisMutation.mutateAsync(newBirthInfo);
  };

  return (
    <View className="p-4 bg-white/80 rounded-lg">
      {birthInfo?.isComplete ? (
        // 已填写状态
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="border-2 border-[#8B4513]/30 rounded-lg p-6"
        >
          <View className="space-y-2">
            <Text className="text-[#8B4513] text-lg font-medium">已录入生辰信息</Text>
            <Text className="text-[#8B4513]/70">
              {birthInfo.birthDate.toLocaleDateString()} · {birthInfo.birthPlace}
            </Text>
            <Text className="text-[#8B4513]/50 text-sm">点击修改生辰信息</Text>
          </View>
        </TouchableOpacity>
      ) : (
        // 未填写状态
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="border-2 border-dashed border-[#8B4513]/30 rounded-lg p-6"
        >
          <View className="items-center space-y-3">
            <Icon name="calendar-plus" size={32} color="#8B4513" />
            <Text className="text-[#8B4513] text-lg font-medium">点击填写生辰信息</Text>
            <Text className="text-[#8B4513]/70 text-sm text-center">
              填写准确的生辰八字，获取更精准的命理分析
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <BirthInfoForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialValues={birthInfo}
      />
    </View>
  );
};

const Skeleton = () => (
  <View className="bg-white/80 rounded-lg p-4">
    <View className="flex-row items-center mb-4">
      <View className="w-6 h-6 rounded-full bg-[#8B4513]/20" />
      <View className="w-24 h-6 ml-2 rounded bg-[#8B4513]/20" />
    </View>

    <View className="space-y-4">
      {[1, 2, 3].map(item => (
        <View key={item} className="space-y-2">
          <View className="w-20 h-5 rounded bg-[#8B4513]/20" />
          <View className="w-full h-12 rounded-lg bg-[#8B4513]/10">
            <View className="w-32 h-6 m-3 rounded bg-[#8B4513]/20" />
          </View>
        </View>
      ))}

      <View className="flex-row justify-between mt-6">
        <View className="w-24 h-10 rounded-lg bg-[#8B4513]/20" />
        <View className="w-24 h-10 rounded-lg bg-[#8B4513]/20" />
      </View>
    </View>
  </View>
);

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
