import * as csv from 'fast-csv';
import * as fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { ProductFileDTO } from '../../dtos/product.dto';
import { IProduct } from '../../entities/product.interface';
import { ProductFileMapperService } from '../../mappers/product-file-mapper-service.interface';
import { ICategoryRepository } from '../../repositories/category-repository.interface';
import { ILaboratoryRepository } from '../../repositories/laboratory-repository.interface';
import { IProductRepository } from '../../repositories/product-repository.interface';
import { IImportService } from '../import-service.interface';
/**
 * ref: https://stackoverflow.com/questions/58431076/how-to-use-async-await-with-fs-createreadstream-in-node-js
 * 
 https://www.bezkoder.com/integrate-angular-10-node-js/
 */
@injectable()
export class ImportServiceImpl implements IImportService {
  constructor(
    @inject('ILaboratoryRepository') private laboratoryRepository: ILaboratoryRepository,
    @inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
    @inject('IProductRepository') private productRepository: IProductRepository,
    @inject('ProductFileMapperService') private productFileMapperService: ProductFileMapperService
  ) {}

  public async importProducts(file: Express.Multer.File): Promise<boolean | undefined> {
    const products = new Array<ProductFileDTO>();
    if (file) {
      // const data = fs.readFileSync(file.path);
      let rowsCount = 0;
      const parseOptions = {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true,
        delimiter: ';',
      };
      const transform = csv
        .format<ProductFileDTO, ProductFileDTO>(parseOptions)
        .transform((row: ProductFileDTO, next: any) => {
          // console.log(row);
          row.laboratory = row.laboratory ? +row.laboratory : row.category;
          row.category = row.category ? +row.category : row.category;
          const steril: any = row.steril;
          row.steril = steril && typeof steril === 'string' && steril.toLowerCase() === 'sí' ? true : false;
          products.push(row);
          rowsCount++;
          next();
        });
      const parse = csv.parse(parseOptions);

      try {
        await fs
          .createReadStream(file.path)
          .pipe(parse)
          .pipe(transform)
          .on('error', (error) => {
            console.error(error);
            // return res.status(400).json({ success: false, message: 'An error occurred' });
            return Promise.reject(false);
          })
          .on('data', (data) => console.log('data'))
          .on('end', async () => {
            fs.unlinkSync(file.path);
            await this.sendProductcsToRepository(products);
            console.log('end');
            return Promise.resolve(true);
          });
        return Promise.resolve(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      return Promise.reject(false);
    }
  }

  private async sendProductcsToRepository(productsFile: ProductFileDTO[]): Promise<IProduct[]> {
    console.log('inicia la persistencia');
    // console.log(rowsCount);
    console.log(productsFile.length);
    const products: IProduct[] = new Array<IProduct>();
    // const laboratory = await LaboratoryRepositoryService.add({ code: 10, name: 'holis', license: '1090' });
    const laboratories = await this.laboratoryRepository.getAll();
    const categories = await this.categoryRepository.getAll();

    for (const p of productsFile) {
      /*
      const laboratoy = laboratories.find((l) => {
        if (typeof p.laboratory === 'string') {
          const labCode: number = +p.laboratory;
          return labCode === l.code;
        } else {
          return l.code === p.laboratory;
        }
      });
      */
      const laboratoy = laboratories.find((l) => l.code === p.laboratory);
      const category = categories.find((c) => c.code === p.category);
      const product: IProduct = this.productFileMapperService.toEntity(p);
      product.category = category;
      product.laboratory = laboratoy;
      product.specialties = [];
      console.log(product.code);
      await this.productRepository.add(product);
    }
    return Promise.resolve(products);
  }
}
