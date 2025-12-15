export interface LoginUser {
  email: string;
  password: string;
}

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  NEUTRAL = "neutral",
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
  gender: GENDER;
  averageScore: number;
  userInfo: string;
  favorites: string[];
  location?: string;
}

export interface UserData {
  name: string;
  email: string;
  dateOfBirth?: Date;
  gender?: GENDER;
  password: string;
  confirmPassword: string;
}
