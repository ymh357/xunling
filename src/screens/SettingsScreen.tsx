import React from 'react';

import { useAtom } from 'jotai';
import { Text, View } from 'react-native';

import { Button } from '@rneui/themed';

import { themeAtom } from '../store/atoms';

const SettingsScreen = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl mb-4">Settings Screen</Text>
      <Button
        title={`Toggle Theme (Current: ${theme})`}
        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    </View>
  );
};

export default SettingsScreen;
