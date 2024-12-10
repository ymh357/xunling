import React, { FunctionComponent } from 'react';

import { styled, useTailwind } from 'nativewind';
import { StyleSheet, Text, View, ViewStyle, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import PlaceholderPreview from '@/components/PlaceholderPreview';

const StyledButton = styled(Button as FunctionComponent) as typeof Button;

const HomeScreen = () => {
  const navigation = useNavigation();
  const btnStyle = StyleSheet.flatten(
    useTailwind({
      className: 'mb-8',
    })
  ) as ViewStyle;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-20">Welcome Home</Text>
      <Icon name="heart" size={24} color="red" />
      <PlaceholderPreview
        renderPlaceholder={(onClick, compReady) => (
          <TouchableOpacity onPress={() => onClick()}>
            <View
              className={clsx('h-40 w-40', {
                ['bg-red-200']: !compReady,
                ['bg-green-200']: compReady,
              })}
            >
              <Text>placeholder</Text>
            </View>
          </TouchableOpacity>
        )}
      >
        {onClick => (
          <TouchableOpacity onPress={onClick}>
            <View className="h-40 w-40 bg-blue-50">
              <Text>real comp</Text>
            </View>
          </TouchableOpacity>
        )}
      </PlaceholderPreview>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', { userId: '1' })}
        containerStyle={btnStyle}
      />
      <StyledButton title="Go to Settings" onPress={() => {}} className="mt-10" />
    </View>
  );
};

export default HomeScreen;
