import React, { useEffect, useRef } from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import clsx from 'clsx';
import { isLoadingAtom, messagesAtom } from '@/store/chat';
import { useAtom } from 'jotai';
import { useTailwind } from 'nativewind';
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

const Skeleton = () => {
  return (
    <View className="w-full h-[40vh] flex items-center justify-center">
      <Text className=" text-center">对话流</Text>
    </View>
  );
};

const ActualComp = () => {
  const scrollViewStyle = StyleSheet.flatten(
    useTailwind({
      className: 'mb-8',
    })
  ) as ViewStyle;
  const [messages] = useAtom(messagesAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // 新消息时自动滚动到底部
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = (message: Message) => {
    const isAssistant = message.type === 'assistant';
    const isError = 'isError' in message && message.isError;

    return (
      <View key={message.id} className={`flex-row ${isAssistant ? '' : 'justify-end'} mb-4`}>
        {isAssistant && (
          <View className="w-8 h-8 rounded-full bg-[#8B4513] mr-2">
            <Image
              source={{
                uri: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
              }}
              className="w-8 h-8 rounded-full"
            />
          </View>
        )}

        <View
          className={clsx(
            'max-w-[80%] rounded-2xl p-3',
            isAssistant ? 'bg-white/80 rounded-tl-none' : 'bg-[#8B4513] rounded-tr-none',
            isError && 'bg-red-100'
          )}
        >
          <Text
            className={clsx(
              isAssistant ? 'text-[#8B4513]' : 'text-[#FDF5E6]',
              isError && 'text-red-500'
            )}
          >
            {message.content}
          </Text>
          <Text
            className={`text-xs mt-1 ${isAssistant ? 'text-[#8B4513]/50' : 'text-[#FDF5E6]/50'}`}
          >
            {message.timestamp.toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1"
      contentContainerStyle={scrollViewStyle}
      showsVerticalScrollIndicator={false}
    >
      {messages.map(renderMessage)}
      {isLoading && (
        <View className="flex-row items-center p-3">
          <View className="w-8 h-8 rounded-full bg-[#8B4513]/30 mr-2" />
          <View className="bg-white/80 rounded-2xl p-3 rounded-tl-none">
            <Text className="text-[#8B4513]">正在思考...</Text>
          </View>
        </View>
      )}
    </ScrollView>
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
