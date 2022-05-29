import { Request } from 'express';
export interface IValidatorService {
  validateLoginRequest(req: Request): void;
  validateSignupRequest(req: Request): void;
}
