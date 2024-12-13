import { atom } from 'jotai';

export interface Preferences {
  language: 'zh' | 'en';
  // ... other preferences
}

export const preferencesAtom = atom<Preferences>({
  language: 'zh',
  // ... default values
});
