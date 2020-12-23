import { inject, injectable } from 'tsyringe';
import { IListUsersResponse } from '../interfaces';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IListUsersResponse> {
    const { users, total } = await this.usersRepository.findAll();

    return { users, total };
  }
}

export default ListUsersService;
