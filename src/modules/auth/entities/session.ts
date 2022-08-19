import { BasicUserDTO } from '../../users/dtos/user.dto';

declare module 'express-session' {
  interface SessionData {
    user: BasicUserDTO;
  }
}
