import { atom } from 'jotai';
import { UserInfo, BornInfo } from '@/types/user';

export const userInfoAtom = atom<
  | (UserInfo & {
      bornInfo?: BornInfo;
    })
  | null
>(null);
