import { Request } from 'express';
import { LoginResponseDTO } from '../dtos/auth.dto';

export interface IAuthService {
  login(request: Request): Promise<LoginResponseDTO>;
  signup(request: Request): Promise<LoginResponseDTO>;
}
