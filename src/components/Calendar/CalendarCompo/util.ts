import { Lunar } from 'lunar-typescript';
import { DateData } from 'react-native-calendars';

const moodMap: Record<string, string> = {};
export const getDayMood = (date: DateData) => {
  if (moodMap[date!.dateString] !== undefined) {
    return moodMap[date!.dateString];
  }

  const isWeekend = new Date(date!.dateString).getDay() % 6 === 0;
  const moodStr = isWeekend ? '🤡 😭 🥰 🥳' : '😃 😄 😐 😢';
  const moodList = moodStr.split(' ');

  if (Math.random() > 0.3) {
    moodMap[date!.dateString] = '';
    return '';
  }

  const mood = moodList[Math.floor(Math.random() * moodList.length)];
  moodMap[date!.dateString] = mood;

  return mood;
};

// 根据小时数计算时辰区间
function getTimeInterval(hour: number): string {
  // 时辰对应的时间区间
  const timeIntervals = [
    '23:00-00:59',
    '01:00-02:59',
    '03:00-04:59',
    '05:00-06:59',
    '07:00-08:59',
    '09:00-10:59',
    '11:00-12:59',
    '13:00-14:59',
    '15:00-16:59',
    '17:00-18:59',
    '19:00-20:59',
    '21:00-22:59',
  ];

  // 计算时辰索引（0-11）
  const index = (hour + 1) % 12;

  return timeIntervals[index];
}

// 根据日期获取星座
function getZodiac(date: Date): string {
  const month = date.getMonth() + 1; // 月份从 1 开始
  const day = date.getDate();

  // 星座的日期范围
  const zodiacRanges = [
    { name: '摩羯座', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: '水瓶座', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: '双鱼座', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: '白羊座', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: '金牛座', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: '双子座', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { name: '巨蟹座', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { name: '狮子座', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: '处女座', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: '天秤座', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { name: '天蝎座', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { name: '射手座', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  ];

  // 遍历星座范围，找到匹配的星座
  for (const zodiac of zodiacRanges) {
    if (
      (month === zodiac.startMonth && day >= zodiac.startDay) ||
      (month === zodiac.endMonth && day <= zodiac.endDay)
    ) {
      return zodiac.name;
    }
  }

  // 默认返回摩羯座（理论上不会走到这里）
  return '摩羯座';
}

interface LunarInfo {
  lunarDate: string;
  lunarGanZhiDate: string;
  lunarYear: string;
  lunarMonth: string;
  lunarDay: string;
  lunarHour: string;
  zodiac: string;
  time: string;
}

export const getLunarInfo = (date: string): LunarInfo => {
  const lunar = Lunar.fromDate(new Date(date));

  const lunarYear = lunar.getYearInGanZhi();
  const lunarMonth = lunar.getMonthInGanZhi();
  const lunarDay = lunar.getDayInGanZhi();
  const lunarHour = lunar.getTimeInGanZhi();
  const zodiac = lunar.getYearZhi();

  const lunarDate = `农历[${zodiac}] ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  const lunarGanZhiDate = `${lunarYear}年 ${lunarMonth}月 ${lunarDay}日`;

  // 获取当前时间的干支时辰
  const lunarHourGanZhi = lunar.getTimeInGanZhi(); // 时干支

  // 获取当前时间的小时数
  const hour = lunar.getHour();

  // 计算时辰区间
  const timeInterval = getTimeInterval(hour);
  const time = `${lunarHourGanZhi}(${timeInterval})`;

  return {
    lunarGanZhiDate,
    lunarDate,
    lunarYear,
    lunarMonth,
    lunarDay,
    lunarHour,
    time,
    zodiac,
  };
};

export const getTodayInfo = (date: string) => {
  const target = new Date(date);
  const today = new Date(); // 获取当前日期
  const startOfYear = new Date(target.getFullYear(), 0, 1); // 获取今年1月1日的日期

  // 计算日期是几天前/几天后
  const diffInDays = Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  let dayText: string;
  if (diffInDays === 0) {
    dayText = '今天';
  } else if (diffInDays > 0) {
    dayText = `${diffInDays}天后`;
  } else {
    dayText = `${Math.abs(diffInDays)}天前`;
  }

  // 计算今天是今年的第几天
  const dayOfYear = Math.floor((target.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

  // 计算今天是今年的第几周
  const weekOfYear = Math.ceil((dayOfYear + 1) / 7);

  // 计算今年已走过的百分比
  const yearProgress = ((dayOfYear + 1) / 365) * 100;

  // 获取星座
  const zodiac = getZodiac(target);

  const dateText = `第${dayOfYear + 1}天 第${weekOfYear}周 ${zodiac}`;
  const progressText = `今年已匆匆走过 ${yearProgress.toFixed(1)}%`;

  return {
    dateText,
    progressText,
    dayText,
    dayOfYear,
    weekOfYear,
    yearProgress,
    zodiac,
  };
};
