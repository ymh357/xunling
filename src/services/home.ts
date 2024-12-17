import { api } from './axios';

export interface DailyPoetry {
  verse: string; // 诗句
  author: string; // 作者
  appreciation: string; // 赏析
  solarTerm: string; // 节气
  solarTermDesc: string; // 节气描述
}

export interface DailyFortune {
  wealth: number; // 财运
  career: number; // 事业
  health: number; // 健康
  relationship: number; // 感情
}

export interface DirectionGuidance {
  direction: string; // 方位
  description: string; // 描述
}

// Mock 数据
const mockData = {
  poetry: {
    verse: '春雷响，万物长。',
    author: '农谚',
    appreciation:
      '惊蛰时节，春雷始动，万物复苏。此句描绘了大地回春、生机勃发的景象，暗合今日宜开展新事之象。',
    solarTerm: '惊蛰',
    solarTermDesc: '春雷始鸣',
  },
  fortune: {
    wealth: 80,
    career: 75,
    health: 85,
    relationship: 70,
  },
  direction: {
    direction: '东南',
    description: '东南方位为生气方向，有助于提升运势，适合商谈、会友。',
  },
};

// 服务函数
export const fetchDailyPoetry = async (): Promise<DailyPoetry> => {
  if (process.env.NODE_ENV === 'development' || true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.poetry;
  }
  const { data } = await api.get<DailyPoetry>('/daily/poetry');
  return data;
};

export const fetchDailyFortune = async (): Promise<DailyFortune> => {
  if (process.env.NODE_ENV === 'development' || true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.fortune;
  }
  const { data } = await api.get<DailyFortune>('/daily/fortune');
  return data;
};

export const fetchDirectionGuidance = async (): Promise<DirectionGuidance> => {
  if (process.env.NODE_ENV === 'development' || true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockData.direction;
  }
  const { data } = await api.get<DirectionGuidance>('/daily/direction');
  return data;
};
