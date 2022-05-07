import { container } from 'tsyringe';
import { UserMongoDAO } from '../repository/user/user.dao.mongo';
import { UserServiceRepository } from '../services/user/user.service.repository';

container.register('IUserDAO', {
  useClass: UserMongoDAO,
});

/*
container.register('IUserRepository', {
  useClass: UserServiceRepository,
});
*/
const userRepositoryService = container.resolve(UserServiceRepository);
export const UserRepositoryService = userRepositoryService;
