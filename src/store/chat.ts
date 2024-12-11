import { atom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAIResponse } from '@/services/chat';

// 定义消息类型
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// 定义提示类型
export interface Hint {
  id: string;
  content: string;
  category?: string;
}

// 消息列表原子
export const messagesAtom = atom<Message[]>([]);

// 提示列表原子
export const hintsAtom = atom<Hint[]>([
  { id: '1', content: '今日运势如何？', category: 'daily' },
  { id: '2', content: '我的五行属性分析', category: 'wuxing' },
  { id: '3', content: '近期桃花运如何？', category: 'love' },
  { id: '4', content: '事业发展建议', category: 'career' },
]);

// 加载状态原子
export const isLoadingAtom = atom<boolean>(false);

// 派生原子：最后一条消息
export const lastMessageAtom = atom(get => {
  const messages = get(messagesAtom);
  return messages[messages.length - 1];
});

// 使用 react-query 的 mutation hook
export const useAIChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchAIResponse,
    onSuccess: (response, variables) => {
      // 可以在这里处理缓存更新等操作
      queryClient.setQueryData(['chat', variables], response);
    },
  });
};

// 消息处理函数
export const handleMessageSend = async (
  content: string,
  messages: Message[],
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void,
  setIsLoading: (loading: boolean) => void,
  mutation: ReturnType<typeof useAIChat>
) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content,
    timestamp: new Date(),
  };

  setMessages([...messages, userMessage]);
  setIsLoading(true);

  try {
    const response = await mutation.mutateAsync(content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, assistantMessage]);
  } catch (error) {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '抱歉，我现在无法回答您的问题。请稍后再试。',
      timestamp: new Date(),
      isError: true,
    };

    setMessages((prev: Message[]) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
