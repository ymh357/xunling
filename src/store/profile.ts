import { atom } from 'jotai';

// 出生信息类型
export interface BirthInfo {
  birthDate: Date;
  birthPlace: string;
  isComplete: boolean;
}

// 性格分析类型
export interface CharacterAnalysis {
  bazi: string[];
  wuxing: {
    element: string;
    traits: string[];
    icon: string;
  }[];
  lifeDirection: string;
}

// 出生信息原子
export const birthInfoAtom = atom<BirthInfo | null>(null);

// 性格分析原子
export const characterAnalysisAtom = atom<CharacterAnalysis | null>(null);

// 派生原子：是否可以显示性格分析
export const canShowCharacterAnalysisAtom = atom(get => get(birthInfoAtom)?.isComplete ?? false);
