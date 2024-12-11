import { useQuery } from '@tanstack/react-query';
import { fetchWuXing, fetchZodiac, fetchBazi, fetchTerms } from '@/services/foundation';

// 封装 react-query hooks
export const useWuXing = () => {
  return useQuery({
    queryKey: ['foundation', 'wuxing'],
    queryFn: fetchWuXing,
    staleTime: Infinity, // 基础数据不会改变
  });
};

export const useZodiac = () => {
  return useQuery({
    queryKey: ['foundation', 'zodiac'],
    queryFn: fetchZodiac,
    staleTime: 24 * 60 * 60 * 1000, // 每天更新一次
  });
};

export const useBazi = () => {
  return useQuery({
    queryKey: ['foundation', 'bazi'],
    queryFn: fetchBazi,
    staleTime: Infinity,
  });
};

export const useTerms = () => {
  return useQuery({
    queryKey: ['foundation', 'terms'],
    queryFn: fetchTerms,
    staleTime: Infinity,
  });
};
