import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUser from '@modules/users/entities/IUser';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';
import { IListUsersResponse } from '@modules/users/interfaces';

class FakeUserRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async findAll(): Promise<IListUsersResponse> {
    return { users: this.users, total: this.users.length };
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByLogin(login: string) {
    const foundUser = this.users.find(user => user.login === login);

    return foundUser;
  }

  public async save(user: IUser): Promise<IUser> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
