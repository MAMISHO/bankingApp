import { container } from 'tsyringe';
import { AuthServiceImpl } from './modules/auth/services/impl/auth.service';
import { ValidatorServiceImpl } from './modules/auth/services/impl/validator.service';
import { CategoryMongoDAO } from './modules/catalog/infra/typeorm/repositories/category.dao.mongo';
import { LaboratoryMongoDAO } from './modules/catalog/infra/typeorm/repositories/laboratory.dao.mongo';
import { ProductMongoDAO } from './modules/catalog/infra/typeorm/repositories/product.dao.mongo';
import { CategoryMapperServiceImpl } from './modules/catalog/mappers/impl/category-mapper.service';
import { LaboratoryMapperServiceImpl } from './modules/catalog/mappers/impl/laboratory-mapper.service';
import { ProductFileMapperServiceImpl } from './modules/catalog/mappers/impl/product-file-mapper.service';
import { ProductMapperServiceImpl } from './modules/catalog/mappers/impl/product-mapper.service';
import { CategoryRepositoryImpl } from './modules/catalog/repositories/impl/category.repository';
import { LaboratoryRepositoryImpl } from './modules/catalog/repositories/impl/laboratory.repository';
import { ProductRepositoryImpl } from './modules/catalog/repositories/impl/product.repository';
import { ProductRepositoryServiceImpl } from './modules/catalog/services/impl/product-repository.service';
import { LoadProcessItemMongoDAO } from './modules/uploader/infra/typeorm/repositories/load-process-item.dao.mongo';
import { LoadProcessMongoDAO } from './modules/uploader/infra/typeorm/repositories/load-process.dao.mongo';
import { LoadProcessItemMapperServiceImpl } from './modules/uploader/mappers/impl/load-process-item-mapper.service';
import { LoadProcessMapperServiceImpl } from './modules/uploader/mappers/impl/load-process-mapper.service';
import { LoadProcessItemRepositoryImpl } from './modules/uploader/repositories/impl/load-process-item.repository';
import { LoadProcessRepositoryImpl } from './modules/uploader/repositories/impl/load-process.repository';
import { ImportServiceImpl } from './modules/uploader/services/impl/import.service';
import { LoadProcessRepositoryServiceImpl } from './modules/uploader/services/impl/load-process-repository.service';
import { UserMongoDAO } from './modules/users/infra/typeorm/repositories/user.dao.mongo';
import { UserRepositoryImpl } from './modules/users/repositories/impl/user.repository';
import { UserRepositoryServiceImpl } from './modules/users/services/impl/user-repository.service';

/**
 * IMPORTANTE, aquí se configura el contenedor de dependencias. Es importante
 * declararlos según el orden de dependencia, por ejemplo, un repositorio no
 * necesita más que su implementación de ORM, pero un servicio necesita sus mappers,
 * por lo que hay que declararlos antes que los servicios en el contenedor
 */

/**
 * REPOSITORIES
 */
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

container.register('ILoadProcessItemDAO', {
  useClass: LoadProcessItemMongoDAO,
});

container.register('ILoadProcessDAO', {
  useClass: LoadProcessMongoDAO,
});

container.register('IUserRepository', {
  useClass: UserRepositoryImpl,
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

container.register('ILoadProcessItemRepository', {
  useClass: LoadProcessItemRepositoryImpl,
});

container.register('ILoadProcessRepository', {
  useClass: LoadProcessRepositoryImpl,
});

const userRepository = container.resolve(UserRepositoryImpl);
const productRepository = container.resolve(ProductRepositoryImpl);
const laboratoryRepository = container.resolve(LaboratoryRepositoryImpl);
const categoryRepository = container.resolve(CategoryRepositoryImpl);
const loadProcessItemRepository = container.resolve(LoadProcessItemRepositoryImpl);
const loadProcessRepository = container.resolve(LoadProcessRepositoryImpl);

export const UserRepository = userRepository;
export const ProductRepository = productRepository;
export const LaboratoryRepository = laboratoryRepository;
export const CategoryRepository = categoryRepository;
export const LoadProcessItemRepository = loadProcessItemRepository;
export const LoadProcessRepository = loadProcessRepository;

/**
 * MAPPERS
 */

container.register('CategoryMapperService', {
  useClass: ProductMapperServiceImpl,
});

container.register('LaboratoryMapperService', {
  useClass: LaboratoryMapperServiceImpl,
});

container.register('ProductMapperService', {
  useClass: ProductMapperServiceImpl,
});

container.register('ProductFileMapperService', {
  useClass: ProductFileMapperServiceImpl,
});

container.register('LoadProcessMapperService', {
  useClass: LoadProcessMapperServiceImpl,
});

container.register('LoadProcessItemMapperService', {
  useClass: LoadProcessItemMapperServiceImpl,
});

export const CategoryMapperService = container.resolve(CategoryMapperServiceImpl);
export const LaboratoryMapperService = container.resolve(LaboratoryMapperServiceImpl);
export const ProductMapperService = container.resolve(ProductMapperServiceImpl);
export const ProductFileMapperService = container.resolve(ProductFileMapperServiceImpl);
export const LoadProcessMapperService = container.resolve(LoadProcessMapperServiceImpl);
export const LoadProcessItemMapperService = container.resolve(LoadProcessItemMapperServiceImpl);

/**
 * SERVICES
 */
container.register('IUserRepositoryService', {
  useClass: UserRepositoryServiceImpl,
});

container.register('IProductRepositoryService', {
  useClass: ProductRepositoryServiceImpl,
});

container.register('IValidatorService', {
  useClass: ValidatorServiceImpl,
});

container.register('IAuthService', {
  useClass: AuthServiceImpl,
});

container.register('ILoadProcessRepositoryService', {
  useClass: LoadProcessRepositoryServiceImpl,
});

container.register('IImportService', {
  useClass: ImportServiceImpl,
});

const userRepositoryService = container.resolve(UserRepositoryServiceImpl);
const productRepositoryService = container.resolve(ProductRepositoryServiceImpl);
const validatorService = container.resolve(ValidatorServiceImpl);
const authService = container.resolve(AuthServiceImpl);
const loadProcessRepositoryService = container.resolve(LoadProcessRepositoryServiceImpl);
const importService = container.resolve(ImportServiceImpl);

export const UserRepositoryService = userRepositoryService;
export const ProductRepositoryService = productRepositoryService;
export const ValidatorService = validatorService;
export const AuthService = authService;
export const LoadProcessRepositoryService = loadProcessRepositoryService;
export const ImportService = importService;
