import { uuid } from 'uuidv4';
import faker from 'faker';
import IUser from '@modules/users/entities/IUser';

export const mockUser = (): IUser => ({
  id: uuid(),
  name: faker.name.findName(),
  login: faker.internet.userName(),
  password: faker.internet.password(),
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
});
