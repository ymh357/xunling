import { DayFortune, DayParameters } from '@/types/dayFortune';

// 生成指定范围内的随机整数
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 生成随机运势数据
const generateDayFortune = (): DayFortune => ({
  overview: [
    '运势昌盛，诸事顺遂，宜积极进取。',
    '运势平稳，宜静不宜动，内心平和则诸事顺遂。',
    '运势起伏，谨慎行事，凡事三思而后行。',
    '运势低迷，不宜冒进，守成为上。',
    '运势渐长，机遇将至，把握时机。',
  ][getRandomInt(0, 4)],
  career: [
    '事业运佳，有贵人相助，适合开展新项目。',
    '工作稳定，日常事务进展顺利，注意细节。',
    '职场有小波折，需谨慎处理人际关系。',
    '工作压力较大，建议调整节奏，稳扎稳打。',
    '事业有新机遇，把握机会，展现才能。',
  ][getRandomInt(0, 4)],
  wealth: [
    '财运亨通，可考虑投资理财。',
    '财运平稳，适合理财规划。',
    '财运波动，谨慎投资为宜。',
    '财运欠佳，应当量入为出。',
    '偏财运旺，意外收获可期。',
  ][getRandomInt(0, 4)],
  love: [
    '桃花运旺，易获得心仪对象青睐。',
    '感情稳定，与伴侣相处融洽。',
    '情感略有波动，需要更多包容与理解。',
    '感情运平平，注意沟通方式。',
    '良缘在即，单身者有望脱单。',
  ][getRandomInt(0, 4)],
  health: [
    '身体状况极佳，精力充沛。',
    '健康状况良好，注意作息规律。',
    '易感疲惫，应当适度运动。',
    '身体抵抗力下降，需要调养。',
    '精神状态不错，保持运动习惯。',
  ][getRandomInt(0, 4)],
});

// 生成随机参数数据
const generateDayParameters = (): DayParameters => ({
  luckyNumbers: Array(3)
    .fill(0)
    .map(() => getRandomInt(1, 9)),
  luckyColors: Array(3)
    .fill(0)
    .map(
      () => ['红色', '黄色', '蓝色', '绿色', '紫色', '白色', '金色', '褐色'][getRandomInt(0, 7)]
    ),
  luckyDirections: Array(2)
    .fill(0)
    .map(() => ['东', '南', '西', '北', '东南', '东北', '西南', '西北'][getRandomInt(0, 7)]),
  luckyTime: Array(3)
    .fill(0)
    .map(
      () =>
        [
          '子时',
          '丑时',
          '寅时',
          '卯时',
          '辰时',
          '巳时',
          '午时',
          '未时',
          '申时',
          '酉时',
          '戌时',
          '亥时',
        ][getRandomInt(0, 11)]
    ),
  unluckyTime: Array(2)
    .fill(0)
    .map(
      () =>
        [
          '子时',
          '丑时',
          '寅时',
          '卯时',
          '辰时',
          '巳时',
          '午时',
          '未时',
          '申时',
          '酉时',
          '戌时',
          '亥时',
        ][getRandomInt(0, 11)]
    ),
  generalLuck: getRandomInt(60, 95),
  careerLuck: getRandomInt(60, 95),
  wealthLuck: getRandomInt(60, 95),
  loveLuck: getRandomInt(60, 95),
  healthLuck: getRandomInt(60, 95),
});

// 生成12月份的数据
const generateDecemberData = () => {
  const decemberData: Record<string, { fortune: DayFortune; parameters: DayParameters }> = {};

  for (let day = 1; day <= 31; day++) {
    const date = `2023-12-${day.toString().padStart(2, '0')}`;
    decemberData[date] = {
      fortune: generateDayFortune(),
      parameters: generateDayParameters(),
    };
  }

  return decemberData;
};

const mockDecemberData = generateDecemberData();

export const fetchDayFortune = async (date: string): Promise<DayFortune> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockDecemberData[date]?.fortune || generateDayFortune();
};

export const fetchDayParameters = async (date: string): Promise<DayParameters> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockDecemberData[date]?.parameters || generateDayParameters();
};
