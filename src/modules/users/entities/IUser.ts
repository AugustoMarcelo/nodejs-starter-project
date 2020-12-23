export default interface IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  is_active: boolean;

  created_at: Date;

  updated_at: Date;
}
