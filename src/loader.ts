import { container } from 'tsyringe';
import { CategoryMongoDAO } from '../repository/product/category.dao.mongo';
import { LaboratoryMongoDAO } from '../repository/product/laboratory.dao.mongo';
import { ProductMongoDAO } from '../repository/product/product.dao.mongo';
import { UserMongoDAO } from '../repository/user/user.dao.mongo';
import { CategoryServiceRepository } from '../services/product/category.service.repository';
import { LaboratoryServiceRepository } from '../services/product/laboratory.service.repository';
import { ProductServiceRepository } from '../services/product/product.service.repository';
import { UserServiceRepository } from '../services/user/user.service.repository';

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

/*
container.register('IUserRepository', {
  useClass: UserServiceRepository,
});
*/
const userRepositoryService = container.resolve(UserServiceRepository);
const productRepositoryService = container.resolve(ProductServiceRepository);
const laboratoryRepositoryService = container.resolve(LaboratoryServiceRepository);
const categoryRepositoryService = container.resolve(CategoryServiceRepository);
export const UserRepositoryService = userRepositoryService;
export const ProductRepositoryService = productRepositoryService;
export const LaboratoryRepositoryService = laboratoryRepositoryService;
export const CategoryRepositoryService = categoryRepositoryService;
