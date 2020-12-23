import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IUser from '../entities/IUser';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!user.is_active) {
      throw new AppError(
        'Your account is inactive. Please, contact the administrator',
        401,
      );
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { privateKey, algorithm, expiresIn } = authConfig.jwt;

    if (!privateKey) {
      throw new AppError('Invalid Private Key', 401);
    }

    const token = sign({ id: user.id }, privateKey, {
      subject: user.id,
      algorithm,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
