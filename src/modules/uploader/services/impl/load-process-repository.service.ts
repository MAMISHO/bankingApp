import { inject, injectable } from 'tsyringe';
import { LoadProcessCriteriaDTO, LoadProcessDTO } from '../../dtos/load-process.dto';
import { ILoadProcess } from '../../entities/load-process.interface';
import { LoadProcessMapperService } from '../../mappers/load-process-mapper-service.interface';
import { ILoadProcessRepository } from '../../repositories/load-process-repository.interface';
import { ILoadProcessRepositoryService } from '../load-process-repository-service.interface';

@injectable()
export class LoadProcessRepositoryServiceImpl implements ILoadProcessRepositoryService {
  constructor(
    // @inject('ILaboRepository') private laboratoryRepository: ILaboratoryRepository,
    @inject('ILoadProcessRepository') private loadProcessRepository: ILoadProcessRepository,
    @inject('LoadProcessMapperService') private loadProcessMapperService: LoadProcessMapperService
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
    throw new Error('Method not implemented.');
  }
}
