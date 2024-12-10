import ChatFlow from '@/components/ChatFlow';
import Hints from '@/components/Hints';
import TypingArea from '@/components/TypingArea';
import React from 'react';

import { View } from 'react-native';

const ChatScreen = () => {
  return (
    <View className="flex h-full ">
      <View>
        <Hints />
      </View>
      <View className="mt-2">
        <ChatFlow />
      </View>
      <View className="mt-2">
        <TypingArea />
      </View>
    </View>
  );
};

export default ChatScreen;
