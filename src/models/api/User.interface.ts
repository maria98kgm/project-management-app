import { SignInData } from './Auth.interface';

export interface StateUserInfo {
  _id: string;
  login: string;
}

export interface UserData extends StateUserInfo {
  name: string;
}

export interface UpdateUser {
  userId: string;
  userInfo: SignInData;
}
