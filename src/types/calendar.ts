export interface CalendarData {
  days: {
    [date: string]: DayData;
  };
}

export interface DayData {
  lunarDay: string; // 农历日期
  solarTerm?: string; // 节气
  mood?: MoodData; // 心情数据
  accuracy?: number; // 准确度评分 (1-5)
  suitable: string[]; // 宜
  unsuitable: string[]; // 忌
  luckyHours: string[]; // 吉时
  unluckyHours: string[]; // 凶时
  deities: string[]; // 值日神煞
  events?: string[]; // 节日或事件
}

export interface MoodData {
  type: 'happy' | 'normal' | 'sad' | 'angry' | 'excited';
  emoji: string;
}
