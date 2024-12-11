import { api } from './axios';
import type { BirthInfo, CharacterAnalysis } from '@/store/profile';

export async function fetchCharacterAnalysis(birthInfo: BirthInfo): Promise<CharacterAnalysis> {
  if (process.env.NODE_ENV === 'development') {
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      bazi: ['甲子', '乙丑', '丙寅', '丁卯'],
      wuxing: [
        {
          element: '金',
          traits: ['坚毅', '果断'],
          icon: 'circle-outline',
        },
        // ... 其他五行属性
      ],
      lifeDirection: '宜往南方发展，事业有成...',
    };
  }

  const { data } = await api.post<CharacterAnalysis>('/profile/analysis', birthInfo);
  return data;
}
