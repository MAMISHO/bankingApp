import { classes } from '@automapper/classes';
import { createMapper, Mapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import { singleton } from 'tsyringe';

// Create and export the mapper
// export const ClassMapper = createMapper({ strategyInitializer: classes() });

// export const PojosMapper = createMapper({ strategyInitializer: pojos() });
// @injectable()
@singleton()
export class MapperService {
  private classMapper: Mapper;
  private pojosMapper: Mapper;

  constructor() {
    // entityMapper.initMapper();
    this.classMapper = createMapper({ strategyInitializer: classes() });
    this.pojosMapper = createMapper({ strategyInitializer: pojos() });
  }

  public getClassMapper(): Mapper {
    return this.classMapper;
  }

  public getPojosMapper(): Mapper {
    return this.pojosMapper;
  }
}
