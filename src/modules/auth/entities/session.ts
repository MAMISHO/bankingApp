import { IUser } from '../../users/entities/user.interface';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}
