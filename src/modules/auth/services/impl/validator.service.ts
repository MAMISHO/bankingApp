import { Request } from 'express';
import * as StringUtils from 'underscore.string';
import { IValidatorService } from '../validator-service.interface';

export class ValidatorServiceImpl implements IValidatorService {
  public validateLoginRequest(req: Request): void {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error('Bad credentials');
    }
    if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
      throw new Error('Bad credentials');
    }
  }
  validateSignupRequest(req: Request): void {
    throw new Error('Method not implemented.');
  }
}
