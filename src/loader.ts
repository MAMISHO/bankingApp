import { container } from 'tsyringe';
import { CategoryMongoDAO } from '../repository/product/category.dao.mongo';
import { LaboratoryMongoDAO } from '../repository/product/laboratory.dao.mongo';
import { ProductMongoDAO } from '../repository/product/product.dao.mongo';
import { CategoryServiceRepository } from '../services/product/category.service.repository';
import { LaboratoryServiceRepository } from '../services/product/laboratory.service.repository';
import { ProductServiceRepository } from '../services/product/product.service.repository';
import { UserMongoDAO } from './modules/users/infra/typeorm/repositories/user.dao.mongo';
import { UserRepositoryImpl } from './modules/users/repositories/impl/user.repository';
import { UserRepositoryServiceImpl } from './modules/users/services/impl/user-repository.service';

container.register('IUserDAO', {
  useClass: UserMongoDAO,
});

container.register('IProductDAO', {
  useClass: ProductMongoDAO,
});

container.register('ILaboratoryDAO', {
  useClass: LaboratoryMongoDAO,
});

container.register('ICategoryDAO', {
  useClass: CategoryMongoDAO,
});

container.register('IUserRepository', {
  useClass: UserRepositoryImpl,
});
container.register('IUserRepositoryService', {
  useClass: UserRepositoryServiceImpl,
});

const userRepository = container.resolve(UserRepositoryImpl);
const userRepositoryService = container.resolve(UserRepositoryServiceImpl);
const productRepositoryService = container.resolve(ProductServiceRepository);
const laboratoryRepositoryService = container.resolve(LaboratoryServiceRepository);
const categoryRepositoryService = container.resolve(CategoryServiceRepository);
export const UserRepository = userRepository;
export const UserRepositoryService = userRepositoryService;
export const ProductRepositoryService = productRepositoryService;
export const LaboratoryRepositoryService = laboratoryRepositoryService;
export const CategoryRepositoryService = categoryRepositoryService;
