import IUser from '../entities/IUser';

export interface IListUsersResponse {
  users: IUser[];
  total: number;
}
