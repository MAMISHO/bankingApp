import { inject, injectable } from 'tsyringe';
import { ProductCriteriaDTO, ProductDTO } from '../../dtos/product.dto';
import { IProduct } from '../../entities/product.interface';
import { ProductMapperService } from '../../mappers/product-mapper-service.interface';
import { ICategoryRepository } from '../../repositories/category-repository.interface';
import { ILaboratoryRepository } from '../../repositories/laboratory-repository.interface';
import { IProductRepository } from '../../repositories/product-repository.interface';
import { IProductRepositoryService } from '../product-repository-service.interface';

@injectable()
export class ProductRepositoryServiceImpl implements IProductRepositoryService {
  constructor(
    @inject('ILaboratoryRepository') private laboratoryRepository: ILaboratoryRepository,
    @inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
    @inject('IProductRepository') private productRepository: IProductRepository,
    @inject('ProductMapperService') private productMapperService: ProductMapperService
  ) {}
  async findOne(productId: number): Promise<ProductDTO> {
    const filter: ProductCriteriaDTO = { id: productId };
    const result = await this.findAll(filter);

    if (result.length > 1) {
      throw new Error('id should be unique');
    }

    if (result.length === 1) {
      return Promise.resolve(result.pop()!);
    }

    return Promise.reject();
  }

  async findOnebyCode(code: string): Promise<ProductDTO> {
    const filter: ProductCriteriaDTO = { code };
    const result = await this.findAll(filter);

    if (result.length > 1) {
      throw new Error('id should be unique');
    }

    if (result.length === 1) {
      return Promise.resolve(result.pop()!);
    }

    return Promise.reject();
  }
  async findOnebyNationalCode(nationalCode: string): Promise<ProductDTO> {
    const filter: ProductCriteriaDTO = { nationalCode };
    const result = await this.findAll(filter);

    if (result.length > 1) {
      throw new Error('id should be unique');
    }

    if (result.length === 1) {
      return Promise.resolve(result.pop()!);
    }

    return Promise.reject();
  }

  findOneByUUID(uuid: string): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
  findOneComplete(productId: number): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }

  findOneByUUIDComplete(uuid: string): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }

  async findAll(filter: ProductCriteriaDTO): Promise<ProductDTO[]> {
    let productDTOs: ProductDTO[] = new Array<ProductDTO>();
    // let productsAux: IProduct[] = new Array<IProduct>();
    const products: IProduct[] = await this.productRepository.findAll(filter);
    if (products && products.length > 0) {
      productDTOs = this.productMapperService.toDTOList(products);
      // productsAux = this.productMapperService.toEntityList(new Array<ProductDTO>(productDTOs[0]));
    }
    return Promise.resolve(productDTOs);
  }

  findAllComplete(filter: ProductCriteriaDTO): Promise<ProductDTO[]> {
    throw new Error('Method not implemented.');
  }

  save(productDTO: ProductDTO): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }
}
