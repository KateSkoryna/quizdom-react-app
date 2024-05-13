export type Article = {
  author: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
};

export interface currentUser {
  email: string;
  password: string;
}
export interface UserData extends currentUser {
  name: string;
  dateOfBirth: string;
  gender: string;
  confirmPassword: string;
}
