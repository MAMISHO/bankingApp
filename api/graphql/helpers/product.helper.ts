import { ProductRepositoryService } from '../../../src/loader';
import { ProductDTO } from '../../../src/modules/catalog/dtos/product.dto';
// import { UserServiceRepository } from '../../../src/modules/users/repositories/impl/user.repository';
// import { UserServiceRepository } from '../../../repository/user/_user.service-repository';
// const userRepositoryService = container.resolve(UserServiceRepository);

export const ProductHelper = {
  _getProductByCN: async function (nationalCode: string): Promise<ProductDTO> {
    if (!nationalCode || nationalCode.length < 1) {
      return Promise.reject(null);
    }
    // const iUser = await UserRepositoryService.get(id);
    // return Promise.resolve(new UserDTO(iUser));
    return ProductRepositoryService.findOnebyNationalCode(nationalCode);
  },

  _getProductByCode: async function (code: string): Promise<ProductDTO> {
    if (!code || code.length < 1) {
      return Promise.reject(null);
    }
    // const iUser = await UserRepositoryService.get(id);
    // return Promise.resolve(new UserDTO(iUser));
    return ProductRepositoryService.findOnebyCode(code);
  },

  _getProductByUUID: async function (uuid: string): Promise<ProductDTO> {
    if (!uuid || uuid.length < 32) {
      return Promise.reject(null);
    }
    // const user = await userRepositoryService.getByUUID(uuid);
    // return Promise.resolve(new UserDTO(user));
    return ProductRepositoryService.findOneByUUID(uuid);
  },

  _addProduct: async function (data: any): Promise<ProductDTO> {
    const product: ProductDTO = Object.assign({}, data);
    // const iUser: IUser = { ...user };
    await ProductRepositoryService.save(product);
    return product;
  },
};
