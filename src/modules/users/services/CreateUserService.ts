import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUser from '../entities/IUser';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IUser> {
    const userWithSameLogin = await this.usersRepository.findByLogin(
      data.login,
    );

    if (userWithSameLogin) {
      throw new AppError('Login already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
