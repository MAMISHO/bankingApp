import { container } from 'tsyringe';
import { AuthServiceImpl } from './modules/auth/services/impl/auth.service';
import { ValidatorServiceImpl } from './modules/auth/services/impl/validator.service';
import { CategoryMongoDAO } from './modules/catalog/infra/typeorm/repositories/category.dao.mongo';
import { LaboratoryMongoDAO } from './modules/catalog/infra/typeorm/repositories/laboratory.dao.mongo';
import { ProductMongoDAO } from './modules/catalog/infra/typeorm/repositories/product.dao.mongo';
import { CategoryRepositoryImpl } from './modules/catalog/repositories/impl/category.repository';
import { LaboratoryRepositoryImpl } from './modules/catalog/repositories/impl/laboratory.repository';
import { ProductRepositoryImpl } from './modules/catalog/repositories/impl/product.service.repository';
import { ImportServiceImpl } from './modules/catalog/services/impl/import.service';
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

container.register('IValidatorService', {
  useClass: ValidatorServiceImpl,
});

container.register('IAuthService', {
  useClass: AuthServiceImpl,
});

container.register('ILaboratoryRepository', {
  useClass: LaboratoryRepositoryImpl,
});

container.register('ICategoryRepository', {
  useClass: CategoryRepositoryImpl,
});

container.register('IProductRepository', {
  useClass: ProductRepositoryImpl,
});

const userRepository = container.resolve(UserRepositoryImpl);
const userRepositoryService = container.resolve(UserRepositoryServiceImpl);
const productRepository = container.resolve(ProductRepositoryImpl);
const laboratoryRepository = container.resolve(LaboratoryRepositoryImpl);
const categoryRepository = container.resolve(CategoryRepositoryImpl);
const validatorService = container.resolve(ValidatorServiceImpl);
const authService = container.resolve(AuthServiceImpl);

const importService = container.resolve(ImportServiceImpl);

export const UserRepository = userRepository;
export const UserRepositoryService = userRepositoryService;
export const ProductRepository = productRepository;
export const LaboratoryRepository = laboratoryRepository;
export const CategoryRepository = categoryRepository;
export const ValidatorService = validatorService;
export const AuthService = authService;
export const ImportService = importService;
