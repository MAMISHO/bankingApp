/**
 * User.ts
 *
 * @description :: Modelo que representa un Usuario
 */

export enum UserRoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  uuid: string;
}

export class UserDTO {
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public passwordConfirm: string;
  public resetPasswordToken: string;
  public role: UserRoleType;
  public status: boolean;
  // public devices: Device[];
  public uuid: string;

  constructor(props?: IUser) {
    Object.assign(this, props);
  }

  public isAdmin(): boolean {
    return this.role === UserRoleType.ADMIN;
  }

  public fullName(): string {
    return `${this.name} ${this.surname}`;
  }
}

export interface UserRequestDTO {
  id?: number;
  uuid?: string;
  name?: string;
  email?: string;
  status?: boolean;
}
