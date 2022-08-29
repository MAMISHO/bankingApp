import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { ProductFileDTO } from '../dtos/product.dto';
import { IProduct } from '../entities/product.interface';

export interface ProductFileMapperService extends EntityMapper<IProduct, ProductFileDTO> {}
