import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import ChatFlow from '@/components/ChatFlow';
import Hints from '@/components/Hints';
import TypingArea from '@/components/TypingArea';

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDF5E6]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-4">
          {/* 顶部提示区 */}
          <View className="py-2">
            <Hints />
          </View>

          {/* 聊天内容区 */}
          <View className="flex-1">
            <ChatFlow />
          </View>

          {/* 底部输入区 */}
          <View className="py-2 mb-2">
            <TypingArea />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
