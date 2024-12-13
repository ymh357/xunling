import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCalendarData, submitMood, submitAccuracy } from '@/services/calendar';

export const useCalendarData = () => {
  return useQuery({
    queryKey: ['calendar'],
    queryFn: fetchCalendarData,
    staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
  });
};

export const useSubmitMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitMood,
    onSuccess: () => {
      // 提交成功后刷新日历数据
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
    },
  });
};

export const useSubmitAccuracy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAccuracy,
    onSuccess: () => {
      // 提交成功后刷新日历数据
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
    },
  });
};
