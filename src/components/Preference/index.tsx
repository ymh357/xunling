import React from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text } from 'react-native';
import clsx from 'clsx';
import LanguageSwitch from './subs/LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Skeleton = () => {
  const { t } = useTranslation();

  return (
    <View className="w-full h-[10vh] flex items-center justify-center">
      <Text className="text-center">{t('settings.title')}</Text>
    </View>
  );
};

const ActualComp = () => {
  const { t } = useTranslation();

  return (
    <View className="space-y-4">
      <Text className="text-lg font-bold text-[#8B4513]">{t('settings.title')}</Text>
      <View className="space-y-2">
        <View className="flex-row justify-between items-center p-4 bg-[#8B4513]/5 rounded-lg">
          <Text className="text-[#8B4513]">{t('settings.language')}</Text>
          <LanguageSwitch />
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
