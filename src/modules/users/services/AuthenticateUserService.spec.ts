import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      password: '123456',
      is_active: true,
    });

    const response = await authenticateUser.execute({
      login: 'johndoe',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non-existing user', async () => {
    await expect(
      authenticateUser.execute({
        login: 'johndoe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      password: '123456',
      is_active: true,
    });

    await expect(
      authenticateUser.execute({
        login: 'johndoe',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with inactive user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      password: '123456',
      is_active: false,
    });

    await expect(
      authenticateUser.execute({
        login: 'johndoe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
