import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userInfoAtom } from './atoms/user';
import { login, fetchUserInfo, fetchBornInfo, fetchCharacterInfo, logout } from '@/services/user';
import { CharacterInfo, UserInfo, BornInfo } from '@/types/user';

export const useLogin = () => {
  const [, setUserInfo] = useAtom(userInfoAtom);

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      setUserInfo(data.userInfo);
    },
  });
};

export const useLogout = () => {
  const [, setUserInfo] = useAtom(userInfoAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUserInfo(null);
      queryClient.removeQueries({ queryKey: ['userInfo'] });
      queryClient.removeQueries({ queryKey: ['bornInfo'] });
      queryClient.removeQueries({ queryKey: ['characterInfo'] });
    },
  });
};

export const useUserInfo = () => {
  const [userInfo] = useAtom(userInfoAtom);

  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !userInfo,
  });
};

export const useBornInfo = () => {
  const [userInfo] = useAtom(userInfoAtom);

  return useQuery<BornInfo>({
    queryKey: ['bornInfo'],
    queryFn: fetchBornInfo,
    enabled: !!userInfo && !userInfo.bornInfo,
  });
};

export const useCharacterInfo = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return useQuery<CharacterInfo>({
    queryKey: ['characterInfo'],
    queryFn: fetchCharacterInfo,
    enabled: !!userInfo && !!userInfo.bornInfo,
  });
};
