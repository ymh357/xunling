import React, { useState } from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import clsx from 'clsx';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleMessageSend, isLoadingAtom, messagesAtom, useAIChat } from '@/store/chat';
import { useAtom } from 'jotai';

const Skeleton = () => {
  return (
    <View className="w-full h-[20vh] flex items-center justify-center">
      <Text className=" text-center">打字区域</Text>
    </View>
  );
};

const ActualComp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const mutation = useAIChat();

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      handleMessageSend(message.trim(), messages, setMessages, setIsLoading, mutation);
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-center bg-white/80 rounded-full px-4 py-2">
      <TextInput
        className="flex-1 text-[#8B4513] min-h-[40px]"
        placeholder="请输入您的问题..."
        placeholderTextColor="#8B4513/50"
        value={message}
        onChangeText={setMessage}
        multiline
        editable={!isLoading}
      />
      <TouchableOpacity
        onPress={handleSend}
        disabled={isLoading || !message.trim()}
        className={`ml-2 p-2 rounded-full ${
          message.trim() && !isLoading ? 'bg-[#8B4513]' : 'bg-[#8B4513]/50'
        }`}
      >
        <Icon name="send" size={20} color="#FDF5E6" />
      </TouchableOpacity>
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
