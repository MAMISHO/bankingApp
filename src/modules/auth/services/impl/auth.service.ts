import { Request } from 'express';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryService } from '../../../../loader';
import { Utils } from '../../../../shared/utils/Utils';
import { BasicUserDTO } from '../../../users/dtos/user.dto';
import { LoginResponseDTO } from '../../dtos/auth.dto';
import { IAuthService } from '../auth-service.interface';
import { IValidatorService } from '../validator-service.interface';

@injectable()
export class AuthServiceImpl implements IAuthService {
  constructor(@inject('IValidatorService') private validatorService: IValidatorService) {}

  public async login(request: Request): Promise<LoginResponseDTO> {
    this.validatorService.validateLoginRequest(request);
    const { username, password } = request.body;
    const user = await UserRepositoryService.findOnebyUsername(username);
    if (!user) {
      throw new Error('Bad credentials');
    }
    if (Utils.verifyPassword(password, user.password)) {
      throw new Error('Bad credentials');
    }
    // Metemos el usuario en sesión
    const userData = new BasicUserDTO(user);
    const loginResponse: LoginResponseDTO = { token: Utils.generateToken(userData) };
    return loginResponse;

    // user._id = null;
    // return res.status(200).send({ token: Utils.generateToken(user) });
  }

  public async signup(request: Request): Promise<LoginResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
