import React from 'react';

import { Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/types';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const { userId } = route.params;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl">Profile Screen</Text>
      <Text>User ID: {userId}</Text>
    </View>
  );
};

export default ProfileScreen;
