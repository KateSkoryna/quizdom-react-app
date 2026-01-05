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
  displayName: string;
  email: string;
  photoURL?: string;
  dateOfBirth: Date;
  sex: GENDER;
  averageScore: number;
  bio: string;
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

export enum ACTION {
  ADD = "add",
  REMOVE = "remove",
}
