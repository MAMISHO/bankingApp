import { UserRoleType } from '../entities/user.enum';
import { IUser } from '../entities/user.interface';

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

/**
 * Interfaz para los filtros de búsqueda en persitencia
 */
export interface UserCriteriaDTO {
  id?: number;
  uuid?: string;
  username?: string;
  email?: string;
  status?: boolean;
}
