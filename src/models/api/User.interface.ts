import { SignUpData } from './Auth.interface';

export interface StateUserInfo {
  _id: string;
  login: string;
}

export interface UserData extends StateUserInfo {
  name: string;
}

export interface UpdateUser {
  userId: string;
  userInfo: SignUpData;
}

export interface UserName {
  id: string;
  name: string;
}
