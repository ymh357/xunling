export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface BornInfo {
  birthDate: Date;
  birthTime: string;
  birthPlace: string;
  gender: 'male' | 'female';
  isComplete?: boolean;
}

export interface CharacterInfo {
  personality: string[];
  interests: string[];
  career: string;
  lifeGoals: string[];
}
