/**
 * User.ts
 *
 * @description :: Modelo que representa un Usuario
 */
import { UserRoleType } from './user.enum';

export interface IUser {
  uuid?: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
}
