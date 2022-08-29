import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { ProductDTO } from '../dtos/product.dto';
import { IProduct } from '../entities/product.interface';

export interface ProductMapperService extends EntityMapper<IProduct, ProductDTO> {}
