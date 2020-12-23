export default interface ICreateUserDTO {
  name: string;
  login: string;
  password: string;
  is_active?: boolean;
}
