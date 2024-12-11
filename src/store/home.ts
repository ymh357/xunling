import { atom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { fetchDailyFortune, fetchDirectionGuidance } from '@/services/home';
import { fetchDailyPoetry } from '@/services/home';

// 使用 jotai 管理本地状态
export const notificationEnabledAtom = atom<boolean>(true);
export const dailyFortuneEnabledAtom = atom<boolean>(true);

// 封装 react-query hooks
export const useDailyPoetry = () => {
  return useQuery({
    queryKey: ['dailyPoetry'],
    queryFn: fetchDailyPoetry,
    staleTime: 24 * 60 * 60 * 1000, // 24小时缓存
  });
};

export const useDailyFortune = () => {
  return useQuery({
    queryKey: ['dailyFortune'],
    queryFn: fetchDailyFortune,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useDirectionGuidance = () => {
  return useQuery({
    queryKey: ['directionGuidance'],
    queryFn: fetchDirectionGuidance,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
