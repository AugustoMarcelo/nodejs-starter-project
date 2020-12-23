import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const { users, total } = await listUsers.execute();

    return response.json({ users: classToClass(users), total });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, login, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, login, password });

    return response.json(classToClass(user));
  }
}
