import { inject, injectable } from 'tsyringe';
import { LoadProcessItemDTO } from '../../dtos/load-process-item.dto';
import { LoadProcessCriteriaDTO, LoadProcessDTO } from '../../dtos/load-process.dto';
import { ILoadProcess } from '../../entities/load-process.interface';
import { LoadProcessItemMapperService } from '../../mappers/load-process-item-mapper-service.interface';
import { LoadProcessMapperService } from '../../mappers/load-process-mapper-service.interface';
import { ILoadProcessItemRepository } from '../../repositories/load-process-item-repository.interface';
import { ILoadProcessRepository } from '../../repositories/load-process-repository.interface';
import { ILoadProcessRepositoryService } from '../load-process-repository-service.interface';

@injectable()
export class LoadProcessRepositoryServiceImpl implements ILoadProcessRepositoryService {
  constructor(
    // @inject('ILaboRepository') private laboratoryRepository: ILaboratoryRepository,
    @inject('ILoadProcessRepository') private loadProcessRepository: ILoadProcessRepository,
    @inject('LoadProcessMapperService') private loadProcessMapperService: LoadProcessMapperService,
    @inject('ILoadProcessItemRepository') private loadProcessItemRepository: ILoadProcessItemRepository,
    @inject('LoadProcessItemMapperService') private loadProcessItemMapperService: LoadProcessItemMapperService
  ) {}
  async findOne(processId: number): Promise<LoadProcessDTO> {
    const filter: LoadProcessCriteriaDTO = { id: processId };
    const result = await this.findAll(filter);

    if (result.length > 1) {
      throw new Error('id should be unique');
    }

    if (result.length === 1) {
      return Promise.resolve(result.pop()!);
    }

    return Promise.reject();
  }

  async findOnebyCode(code: string): Promise<LoadProcessDTO> {
    throw new Error('Method not implemented.');
  }
  async findOnebyNationalCode(nationalCode: string): Promise<LoadProcessDTO> {
    throw new Error('Method not implemented.');
  }

  findOneByUUID(uuid: string): Promise<LoadProcessDTO> {
    throw new Error('Method not implemented.');
  }
  findOneComplete(processId: number): Promise<LoadProcessDTO> {
    throw new Error('Method not implemented.');
  }

  findOneByUUIDComplete(uuid: string): Promise<LoadProcessDTO> {
    throw new Error('Method not implemented.');
  }

  async findAll(filter: LoadProcessCriteriaDTO): Promise<LoadProcessDTO[]> {
    let processDTOs: LoadProcessDTO[] = new Array<LoadProcessDTO>();
    const process: ILoadProcess[] = await this.loadProcessRepository.findAll(filter);
    if (process && process.length > 0) {
      processDTOs = this.loadProcessMapperService.toDTOList(process);
    }
    return Promise.resolve(processDTOs);
  }

  findAllComplete(filter: LoadProcessCriteriaDTO): Promise<LoadProcessDTO[]> {
    throw new Error('Method not implemented.');
  }

  save(processDTO: LoadProcessDTO): Promise<LoadProcessDTO> {
    const iProcessDTO = this.loadProcessMapperService.toEntity(processDTO);
    return this.loadProcessRepository.add(iProcessDTO);
  }

  async saveItem(loadProcessItemDTO: LoadProcessItemDTO): Promise<LoadProcessItemDTO> {
    const iProcessItem = this.loadProcessItemMapperService.toEntity(loadProcessItemDTO);
    if (!iProcessItem._id && iProcessItem.uuidLoadProcess) {
      const iProcess = await this.loadProcessRepository.getByUUID(iProcessItem.uuidLoadProcess);
      iProcessItem.loadProcess = iProcess;
    }
    return this.loadProcessItemRepository.add(iProcessItem);
  }
}
