import React from 'react';
import { View, Text } from 'react-native';
import { useAtom } from 'jotai';
import { themeAtom } from '../store/atoms';
import { Button } from '@rneui/themed';

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