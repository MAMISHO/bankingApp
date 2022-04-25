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
  uuid?: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
}

export class UserDTO {
  public uuid: string;
  public username: string;
  public name: string;
  public lastname: string;
  public email: string;
  public password: string;
  public passwordConfirm: string;
  public resetPasswordToken: string;
  public role: UserRoleType;
  public status: boolean;
  // public devices: Device[];

  constructor(props?: IUser) {
    Object.assign(this, props);
  }

  public isAdmin(): boolean {
    return this.role === UserRoleType.ADMIN;
  }

  public fullName(): string {
    return `${this.name} ${this.lastname}`;
  }

  public toJSON(): Object {
    return { ...this };
  }
}

export interface UserRequestDTO {
  id?: number;
  uuid?: string;
  username?: string;
  email?: string;
  status?: boolean;
}
