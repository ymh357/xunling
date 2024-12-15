import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAtom } from 'jotai';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import PlaceholderPreview from '../PlaceholderPreview';
import { useCharacterInfo } from '@/store/user';
import { userInfoAtom } from '@/store/atoms/user';

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
  const { t } = useTranslation();
  const [userInfo] = useAtom(userInfoAtom);
  const { data: characterInfo } = useCharacterInfo();

  if (!userInfo?.bornInfo?.isComplete) {
    return (
      <View className="p-6 bg-white/80 rounded-lg">
        <View className="items-center space-y-3">
          <Icon name="lock-outline" size={32} color="#8B4513" />
          <Text className="text-[#8B4513] text-lg font-medium text-center">
            {t('profile.bornInfo.complete')}
          </Text>
          <Text className="text-[#8B4513]/70 text-sm text-center">
            {t('profile.bornInfo.completeHint')}
          </Text>
        </View>
      </View>
    );
  }

  if (!characterInfo) {
    return (
      <View className="p-6 bg-white/80 rounded-lg">
        <View className="items-center space-y-3">
          <ActivityIndicator color="#8B4513" />
          <Text className="text-[#8B4513] text-sm">{t('common.loading')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="p-6 bg-white/80 rounded-lg">
      {/* 性格特征 */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Icon name="star-circle" size={28} color="#8B4513" />
          <Text className="text-[#8B4513] text-xl font-bold ml-2">
            {t('character.personality')}
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {characterInfo.personality.map((trait, index) => (
            <View key={index} className="bg-[#8B4513]/5 rounded-2xl px-4 py-2">
              <Text className="text-[#8B4513]">{trait}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 兴趣爱好 */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Icon name="star-four-points" size={28} color="#8B4513" />
          <Text className="text-[#8B4513] text-xl font-bold ml-2">{t('character.interests')}</Text>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {characterInfo.interests.map((interest, index) => (
            <View key={index} className="bg-[#8B4513]/5 rounded-2xl px-4 py-2">
              <Text className="text-[#8B4513]">{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 适合职业 */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Icon name="briefcase" size={28} color="#8B4513" />
          <Text className="text-[#8B4513] text-xl font-bold ml-2">{t('character.career')}</Text>
        </View>
        <View className="bg-[#8B4513]/5 rounded-2xl p-4">
          <Text className="text-[#8B4513]">{characterInfo.career}</Text>
        </View>
      </View>

      {/* 人生目标 */}
      <View>
        <View className="bg-[#DAA520]/10 rounded-2xl p-6">
          <View className="flex-row items-center mb-4">
            <Icon name="compass" size={28} color="#8B4513" />
            <Text className="text-[#8B4513] text-xl font-bold ml-2">
              {t('character.lifeGoals')}
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {characterInfo.lifeGoals.map((goal, index) => (
              <View key={index} className="bg-white/50 rounded-2xl px-4 py-2">
                <Text className="text-[#8B4513]">{goal}</Text>
              </View>
            ))}
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
