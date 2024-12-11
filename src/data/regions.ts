export interface Region {
  value: string;
  label: string;
  children?: Region[];
}

export const regions: Region[] = [
  {
    value: 'china',
    label: '中国',
    children: [
      {
        value: 'guangdong',
        label: '广东省',
        children: [
          { value: 'guangzhou', label: '广州市' },
          { value: 'shenzhen', label: '深圳市' },
          // ... 其他城市
        ],
      },
      {
        value: 'zhejiang',
        label: '浙江省',
        children: [
          { value: 'hangzhou', label: '杭州市' },
          { value: 'ningbo', label: '宁波市' },
          // ... 其他城市
        ],
      },
      // ... 其他省份
    ],
  },
  // ... 其他国家
];
