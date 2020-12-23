import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUser from '@modules/users/entities/IUser';
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { IListUsersResponse } from '@modules/users/interfaces';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<IUser>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<IListUsersResponse> {
    const [users, total] = await this.ormRepository.findAndCount();

    return { users, total };
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByLogin(login: string) {
    const user = await this.ormRepository.findOne({
      where: { login },
    });

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
