import * as csv from 'fast-csv';
import * as fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { ProductFileDTO } from '../../../catalog/dtos/product.dto';
import { IProduct } from '../../../catalog/entities/product.interface';
import { ProductFileMapperService } from '../../../catalog/mappers/product-file-mapper-service.interface';
import { ICategoryRepository } from '../../../catalog/repositories/category-repository.interface';
import { ILaboratoryRepository } from '../../../catalog/repositories/laboratory-repository.interface';
import { IProductRepository } from '../../../catalog/repositories/product-repository.interface';
import { LoadProcessItemDTO } from '../../dtos/load-process-item.dto';
import { LoadProcessRequestDTO } from '../../dtos/load-process-request.dto';
import { LoadProcessDTO } from '../../dtos/load-process.dto';
import { IImportService } from '../import-service.interface';
import { ILoadProcessRepositoryService } from '../load-process-repository-service.interface';
/**
 * ref: https://stackoverflow.com/questions/58431076/how-to-use-async-await-with-fs-createreadstream-in-node-js
 * 
 https://www.bezkoder.com/integrate-angular-10-node-js/
 */
@injectable()
export class ImportServiceImpl implements IImportService {
  private processList: LoadProcessDTO[];
  constructor(
    @inject('ILaboratoryRepository') private laboratoryRepository: ILaboratoryRepository,
    @inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
    @inject('IProductRepository') private productRepository: IProductRepository,
    @inject('ProductFileMapperService') private productFileMapperService: ProductFileMapperService,
    @inject('ILoadProcessRepositoryService') private loadProcessRepositoryService: ILoadProcessRepositoryService
  ) {
    this.processList = new Array<LoadProcessDTO>();
  }

  public async importProducts(loadRequest: LoadProcessRequestDTO): Promise<LoadProcessDTO> {
    const products = new Array<ProductFileDTO>();
    const loadProcessDto = await this.registerNewLoadProcess(loadRequest);

    if (loadRequest.file) {
      // const data = fs.readFileSync(file.path);
      let rowsCount = 0;
      const parseOptions = {
        ignoreEmpty: true,
        discardUnmappedColumns: true,
        headers: true,
        delimiter: ';',
      };
      const transform = csv.format<ProductFileDTO, ProductFileDTO>(parseOptions).transform((row: ProductFileDTO, next: any) => {
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
          .createReadStream(loadRequest.file.path)
          .pipe(parse)
          .pipe(transform)
          .on('error', (error) => {
            console.error(error);
            // return res.status(400).json({ success: false, message: 'An error occurred' });
            loadProcessDto.status = false;
            return Promise.reject(loadProcessDto);
          })
          .on('data', (data) => console.log('data'))
          .on('end', async () => {
            fs.unlinkSync(loadRequest.file.path);
            // await this.sendProductcsToRepository(products);
            this.sendProductcsToRepository(products, loadProcessDto);
            console.log('end');
            return Promise.resolve(loadProcessDto);
          });
        loadProcessDto.status = false;
        return Promise.resolve(loadProcessDto);
      } catch (err) {
        console.error(err);
        loadProcessDto.status = false;
        return Promise.resolve(loadProcessDto);
      }
    } else {
      loadProcessDto.status = false;
      return Promise.reject(loadProcessDto);
    }
  }

  public getProgressProcess(uuidProcess: string): LoadProcessDTO {
    let processDto = new LoadProcessDTO();
    processDto.status = false;
    for (const lp of this.processList) {
      if (lp.uuid === uuidProcess) {
        processDto = lp;
        break;
      }
    }
    return processDto;
  }

  private async sendProductcsToRepository(productsFile: ProductFileDTO[], loadProcessDto: LoadProcessDTO): Promise<IProduct[]> {
    console.log('inicia la persistencia');
    this.processList.push(loadProcessDto);
    // console.log(rowsCount);
    console.log(productsFile.length);
    const products: IProduct[] = new Array<IProduct>();
    // const laboratory = await LaboratoryRepositoryService.add({ code: 10, name: 'holis', license: '1090' });
    const laboratories = await this.laboratoryRepository.getAll();
    const categories = await this.categoryRepository.getAll();

    // TEST
    /*loadProcessDto.progress = 0;
    for (let cont = 0; cont < 100; cont++) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log('World! =>  ' + cont);
      loadProcessDto.progress++;
    }
    console.log('Persiste');
    */
    loadProcessDto.progress = 0;
    for (const p of productsFile) {
      loadProcessDto.progress++;
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
      const productSave = await this.productRepository.add(product);
      const itemProcess = await this.registerNewLoadProcessItem(loadProcessDto, JSON.stringify(productSave));
      if (!loadProcessDto.items) {
        loadProcessDto.items = new Array<LoadProcessItemDTO>();
      }
      loadProcessDto.items.push(itemProcess);
    }
    // this.loadProcessRepositoryService.save(loadProcessDto);
    return Promise.resolve(products);
  }

  private registerNewLoadProcess(loadRequest: LoadProcessRequestDTO): Promise<LoadProcessDTO> {
    const newProcessDTO = new LoadProcessDTO();
    newProcessDTO.fileName = loadRequest.fileName;
    newProcessDTO.userName = 'admin';

    const processDTO = this.loadProcessRepositoryService.save(newProcessDTO);
    return processDTO;
  }

  private async registerNewLoadProcessItem(loadProcessDTO: LoadProcessDTO, dataItem: string): Promise<LoadProcessItemDTO> {
    const newProcessItemDTO = new LoadProcessItemDTO();
    newProcessItemDTO.dataItem = dataItem;
    newProcessItemDTO.loadProcess = loadProcessDTO;
    newProcessItemDTO.uuidLoadProcess = loadProcessDTO.uuid;

    const processItemDTO = await this.loadProcessRepositoryService.saveItem(newProcessItemDTO);
    return processItemDTO;
  }
}
