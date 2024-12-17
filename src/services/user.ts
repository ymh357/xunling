import { UserInfo, BornInfo, CharacterInfo } from '@/types/user';

// Mock 数据
const mockUserInfo: UserInfo = {
  id: '1',
  username: '张三',
  avatar: 'https://example.com/avatar.jpg',
  email: 'zhangsan@example.com',
  phone: '13800138000',
};

const mockBornInfo: BornInfo = {
  birthDate: new Date('1990-01-01'),
  birthTime: '12:00',
  birthPlace: '北京市',
  gender: 'male',
};

const mockCharacterInfo: CharacterInfo = {
  personality: ['开朗', '善良', '积极'],
  interests: ['阅读', '旅行', '音乐'],
  career: '软件工程师',
  lifeGoals: ['事业有成', '家庭幸福', '健康长寿'],
};

export const login = async (credentials: { username: string; password: string }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (process.env.NODE_ENV === 'development' || true) {
    return { token: 'mock-token', userInfo: mockUserInfo };
  }
  // 实际的登录请求
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }).then(res => res.json());
};

export const logout = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (process.env.NODE_ENV === 'development' || true) {
    return { success: true };
  }
  // 实际的退出登录请求
  return fetch('/api/logout', {
    method: 'POST',
  }).then(res => res.json());
};

export const fetchUserInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (process.env.NODE_ENV === 'development' || true) {
    return mockUserInfo;
  }
  // 实际的用户信息请求
  return fetch('/api/user').then(res => res.json());
};

export const fetchBornInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (process.env.NODE_ENV === 'development' || true) {
    return mockBornInfo;
  }
  // 实际的出生信息请求
  return fetch('/api/user/born-info').then(res => res.json());
};

export const fetchCharacterInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (process.env.NODE_ENV === 'development' || true) {
    return mockCharacterInfo;
  }
  // 实际的性格信息请求
  return fetch('/api/user/character-info').then(res => res.json());
};
