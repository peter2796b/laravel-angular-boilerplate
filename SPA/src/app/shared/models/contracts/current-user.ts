import { IUser } from '../entities/user';

export interface ICurrentUser {
  token: string;
  refreshToken: string;
  user: IUser;
}
