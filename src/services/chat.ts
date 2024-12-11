import { api } from './axios';

interface AIResponse {
  response: string;
  timestamp: string;
}

// Mock 响应数据
const mockResponses: { [key: string]: string } = {
  '今日运势如何？': '今天运势不错，适合谈事业，但要注意休息。',
  我的五行属性分析: '从你的生辰八字来看，你属火，性格热情开朗，富有领导力。',
  '近期桃花运如何？': '近期桃花运平稳，建议多参加社交活动。',
  事业发展建议: '目前适合稳扎稳打，切勿急于求成。',
};

// Mock 请求处理函数
const mockFetchAIResponse = async (content: string): Promise<string> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    mockResponses[content] || `这是对"${content}"的回复：根据命理分析，${content.slice(0, 10)}...`
  );
};

// 实际的 API 请求函数
const realFetchAIResponse = async (content: string): Promise<string> => {
  const { data } = await api.post<AIResponse>('/chat', {
    message: content,
  });
  return data.response;
};

// 导出统一的请求函数
export const fetchAIResponse =
  process.env.NODE_ENV === 'development' ? mockFetchAIResponse : realFetchAIResponse;
