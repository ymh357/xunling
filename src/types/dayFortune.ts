export interface DayFortune {
  overview: string; // 运势概述
  career: string; // 事业运势
  wealth: string; // 财运
  love: string; // 感情运势
  health: string; // 健康运势
}

export interface DayParameters {
  luckyNumbers: number[]; // 吉数
  luckyColors: string[]; // 吉色
  luckyDirections: string[]; // 吉位
  luckyTime: string[]; // 吉时
  unluckyTime: string[]; // 凶时
  generalLuck: number; // 总运势指数 (0-100)
  careerLuck: number; // 事业指数
  wealthLuck: number; // 财运指数
  loveLuck: number; // 感情指数
  healthLuck: number; // 健康指数
}
