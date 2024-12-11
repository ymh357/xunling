import { api } from './axios';

export interface WuXingData {
  elements: Array<{
    name: string;
    icon: string;
    color: string;
    traits: string;
  }>;
}

export interface ZodiacData {
  currentYear: number;
  zodiacs: Array<{
    name: string;
    year: string;
    nature: string;
  }>;
}

export interface BaziData {
  pillars: Array<{
    name: string;
    desc: string;
    parts: [string, string];
  }>;
  introduction: string;
}

export interface TermData {
  category: string;
  items: Array<{
    name: string;
    desc: string;
  }>;
}

// Mock 数据
const mockData = {
  wuxing: {
    elements: [
      { name: '金', icon: 'circle-outline', color: 'bg-yellow-100', traits: '刚健、坚韧' },
      { name: '木', icon: 'tree', color: 'bg-green-100', traits: '生长、向上' },
      { name: '水', icon: 'water', color: 'bg-blue-100', traits: '智慧、灵动' },
      { name: '火', icon: 'fire', color: 'bg-red-100', traits: '温暖、活力' },
      { name: '土', icon: 'cube-outline', color: 'bg-amber-100', traits: '厚重、包容' },
    ],
  },
  zodiac: {
    currentYear: new Date().getFullYear(),
    zodiacs: [
      { name: '鼠', year: '子', nature: '智慧机敏' },
      { name: '牛', year: '丑', nature: '勤恳踏实' },
      { name: '虎', year: '寅', nature: '威严勇敢' },
      { name: '兔', year: '卯', nature: '温和谨慎' },
      { name: '龙', year: '辰', nature: '尊贵非凡' },
      { name: '蛇', year: '巳', nature: '敏锐优雅' },
      { name: '马', year: '午', nature: '活力奔放' },
      { name: '羊', year: '未', nature: '温顺和善' },
      { name: '猴', year: '申', nature: '聪明灵活' },
      { name: '鸡', year: '酉', nature: '勤劳守时' },
      { name: '狗', year: '戌', nature: '忠诚正直' },
      { name: '猪', year: '亥', nature: '善良厚道' },
    ],
  },
  bazi: {
    pillars: [
      { name: '年柱', desc: '主父母、祖先', parts: ['甲', '子'] },
      { name: '月柱', desc: '主兄弟、事业', parts: ['乙', '丑'] },
      { name: '日柱', desc: '主自身、配偶', parts: ['丙', '寅'] },
      { name: '时柱', desc: '主子女、晚年', parts: ['丁', '卯'] },
    ],
    introduction:
      '八字即四柱，由年、月、日、时四柱组成，每柱包含天干和地支，用于分析人的命理特质和运势走向。',
  },
  terms: [
    {
      category: '天干',
      items: [
        { name: '甲', desc: '东方木' },
        { name: '乙', desc: '东方木' },
      ],
    },
    {
      category: '地支',
      items: [
        { name: '子', desc: '北方水' },
        { name: '丑', desc: '土' },
      ],
    },
    {
      category: '五行',
      items: [
        { name: '生', desc: '相生之意' },
        { name: '克', desc: '相克之意' },
      ],
    },
  ],
};

// API 函数
export const fetchWuXing = async (): Promise<WuXingData> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.wuxing;
  }
  const { data } = await api.get<WuXingData>('/foundation/wuxing');
  return data;
};

export const fetchZodiac = async (): Promise<ZodiacData> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.zodiac;
  }
  const { data } = await api.get<ZodiacData>('/foundation/zodiac');
  return data;
};

export const fetchBazi = async (): Promise<BaziData> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.bazi;
  }
  const { data } = await api.get<BaziData>('/foundation/bazi');
  return data;
};

export const fetchTerms = async (): Promise<TermData[]> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.terms;
  }
  const { data } = await api.get<TermData[]>('/foundation/terms');
  return data;
};
