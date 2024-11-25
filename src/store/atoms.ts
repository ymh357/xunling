import { atom } from 'jotai';

export const userAtom = atom({
  id: '',
  name: '',
  email: '',
});

export const themeAtom = atom('light');
