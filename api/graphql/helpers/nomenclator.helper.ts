import { ProductRepositoryService } from '../../../src/loader';
import { ProductCriteriaDTO, ProductDTO } from '../../../src/modules/catalog/dtos/product.dto';
import { Identifier } from '../schema/nomenclator/models/Identifier';
import { Name } from '../schema/nomenclator/models/Name';
import { Nomenclator } from '../schema/nomenclator/models/Nomenclator';
import { NomenclatorType } from '../schema/nomenclator/models/NomenclatorType';
// import { UserServiceRepository } from '../../../src/modules/users/repositories/impl/user.repository';
// import { UserServiceRepository } from '../../../repository/user/_user.service-repository';
// const userRepositoryService = container.resolve(UserServiceRepository);

export const NomenclatorHelper = {
  _findProduct: async function (searchTerm: string, nomenclatorType: NomenclatorType): Promise<Nomenclator[]> {
    if (!searchTerm || searchTerm.length < 1 || !nomenclatorType) {
      return Promise.reject(null);
    }
    // const iUser = await UserRepositoryService.get(id);
    // return Promise.resolve(new UserDTO(iUser));
    if (nomenclatorType === 'MEDICINE') {
      // buscasmos en aemps
    }
    if (nomenclatorType === 'MASTER_FORMULA') {
      // buscamos en catálogo muface
    }
    const filter: ProductCriteriaDTO = { denomination: searchTerm };
    const products: ProductDTO[] = await ProductRepositoryService.findAll(filter);
    const nomenclatorProducts = products.map((p) => {
      const name: Name = { long: p.denomination?.toString() };
      const identifiers: Identifier[] = new Array<Identifier>();
      const ide1: Identifier = { type: '', system: '', value: '' };
      const ide2: Identifier = { type: '', system: '', value: '' };
      identifiers.push(ide1);
      identifiers.push(ide2);
      // n.identifiers = identifiers;
      // n.type = 'PRODUCT';
      // n.status = true;
      // n.authorizationDate = new Date(Date.now());
      // n.lastUpdate = new Date(Date.now());

      const n: Nomenclator = {
        identifiers: identifiers,
        type: 'PRODUCT',
        status: true,
        authorizationDate: new Date(Date.now()),
        lastUpdate: new Date(Date.now()),
        name: name,
      };

      return n;
    });
    return nomenclatorProducts;
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
