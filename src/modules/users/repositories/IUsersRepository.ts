import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../entities/IUser';
import { IListUsersResponse } from '../interfaces';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findAll(): Promise<IListUsersResponse>;
  findById(id: string): Promise<IUser | undefined>;
  findByLogin(login: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
}
