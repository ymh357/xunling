import React from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import clsx from 'clsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { handleMessageSend, isLoadingAtom, messagesAtom, hintsAtom, useAIChat } from '@/store/chat';
import { useAtom } from 'jotai';

const Skeleton = () => {
  return (
    <View className="w-full h-[20vh] flex items-center justify-center">
      <Text className=" text-center">提示词序列</Text>
    </View>
  );
};

const ActualComp = () => {
  const [hints] = useAtom(hintsAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const mutation = useAIChat();

  const handleHintPress = (content: string) => {
    handleMessageSend(content, messages, setMessages, setIsLoading, mutation);
  };

  return (
    <View className="bg-white/80 rounded-lg p-3">
      <View className="flex-row items-center mb-2">
        <Icon name="lightbulb-outline" size={18} color="#8B4513" />
        <Text className="text-[#8B4513] font-medium ml-2">建议问题</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hints.map(hint => (
          <TouchableOpacity
            key={hint.id}
            onPress={() => handleHintPress(hint.content)}
            className="bg-[#8B4513]/10 rounded-full px-4 py-2 mr-2"
          >
            <Text className="text-[#8B4513]">{hint.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
