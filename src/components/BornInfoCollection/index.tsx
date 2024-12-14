import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAtom } from 'jotai';
import PlaceholderPreview from '../PlaceholderPreview';
import clsx from 'clsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BirthInfoForm from './subs/BirthInfoForm';
import { useBornInfo } from '@/store/user';
import { BornInfo } from '@/types/user';
import { userInfoAtom } from '@/store/atoms/user';
import { useTranslation } from 'react-i18next';

const ActualComp = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const { data: bornInfo } = useBornInfo();

  React.useEffect(() => {
    if (bornInfo?.isComplete) {
      setUserInfo(prev => (prev ? { ...prev, bornInfo: bornInfo } : null));
    }
  }, [bornInfo]);

  const handleSubmit = async (newBirthInfo: BornInfo) => {
    setUserInfo(prev =>
      prev ? { ...prev, bornInfo: { ...newBirthInfo, isComplete: true } } : null
    );
    setShowForm(false);
  };

  return (
    <View className="p-4 bg-white/80 rounded-lg">
      {userInfo?.bornInfo?.isComplete ? (
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="border-2 border-[#8B4513]/30 rounded-lg p-6"
        >
          <View className="space-y-2">
            <Text className="text-[#8B4513] text-lg font-medium">
              {t('profile.bornInfo.complete')}
            </Text>
            <Text className="text-[#8B4513]/70">
              {userInfo?.bornInfo.birthDate.toLocaleDateString()} {userInfo?.bornInfo.birthTime}
              &nbsp;
              {userInfo?.bornInfo.birthPlace}
            </Text>
            <Text className="text-[#8B4513]/50 text-sm">{t('profile.bornInfo.completeHint')}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          className="border-2 border-dashed border-[#8B4513]/30 rounded-lg p-6"
        >
          <View className="items-center space-y-3">
            <Icon name="calendar-plus" size={32} color="#8B4513" />
            <Text className="text-[#8B4513] text-lg font-medium">
              {t('profile.bornInfo.prompt')}
            </Text>
            <Text className="text-[#8B4513]/70 text-sm text-center">
              {t('profile.bornInfo.hint')}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <BirthInfoForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        initialValues={userInfo?.bornInfo || null}
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
