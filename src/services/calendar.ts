import { api } from './axios';
import { CalendarData, MoodData } from '@/types/calendar';

// Mock 数据
const mockCalendarData: CalendarData = {
  days: {
    '2024-12-01': {
      lunarDay: '二十',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['动土', '安葬'],
      luckyHours: ['子时', '午时', '酉时'],
      unluckyHours: ['寅时', '未时'],
      deities: ['喜神：东南', '财神：西北'],
      events: ['世界艾滋病日'],
    },
    '2024-12-02': {
      lunarDay: '廿一',
      suitable: ['修造', '纳采'],
      unsuitable: ['开市', '安床'],
      luckyHours: ['寅时', '巳时', '申时'],
      unluckyHours: ['子时', '午时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-03': {
      lunarDay: '廿二',
      suitable: ['祭祀', '求嗣', '出行'],
      unsuitable: ['造船', '动土'],
      luckyHours: ['卯时', '午时', '戌时'],
      unluckyHours: ['巳时', '申时'],
      deities: ['喜神：西南', '财神：东北'],
    },
    '2024-12-04': {
      lunarDay: '廿三',
      suitable: ['开张', '交易', '入学'],
      unsuitable: ['嫁娶', '远行'],
      luckyHours: ['辰时', '未时', '亥时'],
      unluckyHours: ['寅时', '酉时'],
      deities: ['喜神：西北', '财神：西南'],
      events: ['国家宪法日'],
    },
    '2024-12-05': {
      lunarDay: '廿四',
      suitable: ['盖屋', '装修', '开业'],
      unsuitable: ['出行', '安葬'],
      luckyHours: ['巳时', '申时', '子时'],
      unluckyHours: ['卯时', '戌时'],
      deities: ['喜神：东南', '财神：西北'],
      events: ['国际志愿者日'],
    },
    '2024-12-06': {
      lunarDay: '廿五',
      suitable: ['求医', '针灸', '开张'],
      unsuitable: ['嫁娶', '动土'],
      luckyHours: ['午时', '酉时', '丑时'],
      unluckyHours: ['辰时', '亥时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-07': {
      lunarDay: '廿六',
      suitable: ['祈福', '求嗣', '开市'],
      unsuitable: ['安床', '出行'],
      luckyHours: ['未时', '戌时', '寅时'],
      unluckyHours: ['巳时', '子时'],
      deities: ['喜神：西南', '财神：东北'],
      events: ['国家公祭日'],
    },
    '2024-12-08': {
      lunarDay: '廿七',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['嫁娶', '远行'],
      luckyHours: ['申时', '亥时', '卯时'],
      unluckyHours: ['午时', '丑时'],
      deities: ['喜神：西北', '财神：西南'],
    },
    '2024-12-09': {
      lunarDay: '廿八',
      suitable: ['祭祀', '入宅', '开张'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['酉时', '子时', '辰时'],
      unluckyHours: ['未时', '寅时'],
      deities: ['喜神：东南', '财神：西北'],
    },
    '2024-12-10': {
      lunarDay: '廿九',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['动土', '安床'],
      luckyHours: ['戌时', '丑时', '巳时'],
      unluckyHours: ['申时', '卯时'],
      deities: ['喜神：东北', '财神：东南'],
      events: ['世界人权日'],
    },
    '2024-12-11': {
      lunarDay: '初一',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['嫁娶', '远行'],
      luckyHours: ['亥时', '寅时', '午时'],
      unluckyHours: ['酉时', '辰时'],
      deities: ['喜神：西南', '财神：东北'],
    },
    '2024-12-12': {
      lunarDay: '初二',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['子时', '卯时', '未时'],
      unluckyHours: ['戌时', '巳时'],
      deities: ['喜神：西北', '财神：西南'],
      events: ['国家公祭日'],
    },
    '2024-12-13': {
      lunarDay: '初三',
      suitable: ['祭祀', '求嗣', '开张'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['丑时', '辰时', '申时'],
      unluckyHours: ['亥时', '午时'],
      deities: ['喜神：东南', '财神：西北'],
      events: ['南京大屠杀死难者国家公祭日'],
    },
    '2024-12-14': {
      lunarDay: '初四',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['寅时', '巳时', '酉时'],
      unluckyHours: ['子时', '未时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-15': {
      lunarDay: '初五',
      solarTerm: '小寒',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['卯时', '午时', '戌时'],
      unluckyHours: ['丑时', '申时'],
      deities: ['喜神：西南', '财神：东北'],
    },
    '2024-12-16': {
      lunarDay: '初六',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['辰时', '未时', '亥时'],
      unluckyHours: ['寅时', '酉时'],
      deities: ['喜神：西北', '财神：西南'],
    },
    '2024-12-17': {
      lunarDay: '初七',
      suitable: ['祭祀', '求嗣', '开张'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['巳时', '申时', '子时'],
      unluckyHours: ['卯时', '戌时'],
      deities: ['喜神：东南', '财神：西北'],
    },
    '2024-12-18': {
      lunarDay: '初八',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['午时', '酉时', '丑时'],
      unluckyHours: ['辰时', '亥时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-19': {
      lunarDay: '初九',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['未时', '戌时', '寅时'],
      unluckyHours: ['巳时', '子时'],
      deities: ['喜神：西南', '财神：东北'],
      events: ['澳门回归纪念日'],
    },
    '2024-12-20': {
      lunarDay: '初十',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['申时', '亥时', '卯时'],
      unluckyHours: ['午时', '丑时'],
      deities: ['喜神：西北', '财神：西南'],
    },
    '2024-12-21': {
      lunarDay: '十一',
      solarTerm: '冬至',
      suitable: ['祭祀', '求嗣', '开张'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['酉时', '子时', '辰时'],
      unluckyHours: ['未时', '寅时'],
      deities: ['喜神：东南', '财神：西北'],
    },
    '2024-12-22': {
      lunarDay: '十二',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['戌时', '丑时', '巳时'],
      unluckyHours: ['申时', '卯时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-23': {
      lunarDay: '十三',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['亥时', '寅时', '午时'],
      unluckyHours: ['酉时', '辰时'],
      deities: ['喜神：西南', '财神：东北'],
    },
    '2024-12-24': {
      lunarDay: '十四',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['子时', '卯时', '未时'],
      unluckyHours: ['戌时', '巳时'],
      deities: ['喜神：西北', '财神：西南'],
      events: ['平安夜'],
    },
    '2024-12-25': {
      lunarDay: '十五',
      suitable: ['祭祀', '求嗣', '开张'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['丑时', '辰时', '申时'],
      unluckyHours: ['亥时', '午时'],
      deities: ['喜神：东南', '财神：西北'],
      events: ['圣诞节'],
    },
    '2024-12-26': {
      lunarDay: '十六',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['寅时', '巳时', '酉时'],
      unluckyHours: ['子时', '未时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-27': {
      lunarDay: '十七',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['卯时', '午时', '戌时'],
      unluckyHours: ['丑时', '申时'],
      deities: ['喜神：西南', '财神：东北'],
    },
    '2024-12-28': {
      lunarDay: '十八',
      suitable: ['修造', '动土', '开业'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['辰时', '未时', '亥时'],
      unluckyHours: ['寅时', '酉时'],
      deities: ['喜神：西北', '财神：西南'],
    },
    '2024-12-29': {
      lunarDay: '十九',
      suitable: ['祭祀', '求嗣', '开张'],
      unsuitable: ['动土', '远行'],
      luckyHours: ['巳时', '申时', '子时'],
      unluckyHours: ['卯时', '戌时'],
      deities: ['喜神：东南', '财神：西北'],
    },
    '2024-12-30': {
      lunarDay: '二十',
      suitable: ['求医', '针灸', '纳采'],
      unsuitable: ['安葬', '出行'],
      luckyHours: ['午时', '酉时', '丑时'],
      unluckyHours: ['辰时', '亥时'],
      deities: ['喜神：东北', '财神：东南'],
    },
    '2024-12-31': {
      lunarDay: '廿一',
      suitable: ['祈福', '开市', '入宅'],
      unsuitable: ['嫁娶', '安床'],
      luckyHours: ['未时', '戌时', '寅时'],
      unluckyHours: ['巳时', '子时'],
      deities: ['喜神：西南', '财神：东北'],
      events: ['除夕'],
    },
  },
};

// API 函数
export const fetchCalendarData = async (): Promise<CalendarData> => {
  if (process.env.NODE_ENV === 'development' || true) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCalendarData;
  }
  const { data } = await api.get<CalendarData>('/calendar');
  return data;
};

export const submitMood = async ({ date, mood }: { date: string; mood: MoodData['type'] }) => {
  if (process.env.NODE_ENV === 'development' || true) {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCalendarData.days[date] = {
      ...(mockCalendarData.days[date] || {}),
      mood: {
        type: mood,
        emoji: {
          happy: '😊',
          normal: '😐',
          sad: '😢',
          angry: '😠',
          excited: '🥳',
        }[mood],
      },
    };
    return { success: true };
  }
  return api.post('/calendar/mood', { date, mood });
};

export const submitAccuracy = async ({ date, rating }: { date: string; rating: number }) => {
  if (process.env.NODE_ENV === 'development' || true) {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCalendarData.days[date] = {
      ...(mockCalendarData.days[date] || {}),
      accuracy: rating,
    };
    return { success: true };
  }
  return api.post('/calendar/accuracy', { date, rating });
};
