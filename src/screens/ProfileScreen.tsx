import BornInfoCollection from '@/components/BornInfoCollection';
import CharacterSummary from '@/components/CharacterSummary';
import Preference from '@/components/Preference';
import UserInteraction from '@/components/UserInteraction';
import React from 'react';

import { View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex h-full ">
      <View>
        <UserInteraction />
      </View>
      <View className="mt-2">
        <BornInfoCollection />
      </View>
      <View className="mt-2">
        <CharacterSummary />
      </View>
      <View className="mt-2">
        <Preference />
      </View>
    </View>
  );
};

export default ProfileScreen;
