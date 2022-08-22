import { AutoMap } from '@automapper/classes';
import { UserRoleType } from '../entities/user.enum';
import { IUser } from '../entities/user.interface';

export class UserDTO {
  @AutoMap()
  public uuid: string;
  @AutoMap()
  public username: string;
  @AutoMap()
  public name: string;
  @AutoMap()
  public lastname: string;
  @AutoMap()
  public email: string;
  @AutoMap()
  public password: string;
  @AutoMap()
  public passwordConfirm: string;
  @AutoMap()
  public resetPasswordToken: string;
  @AutoMap()
  public role: UserRoleType;
  @AutoMap()
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

export class BasicUserDTO {
  public uuid: string;
  public username: string;
  public name: string;
  public lastname: string;
  public email: string;
  public role: UserRoleType;

  constructor(props: UserDTO) {
    this.uuid = props.uuid;
    this.username = props.username;
    this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.role = props.role;
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
