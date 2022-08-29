/**
 * Organization: Objeto para identificar estructuras
 */

import { Identifier } from './Identifier';
import { Name } from './Name';
import { NomenclatorType } from './NomenclatorType';
import { Organization } from './Organization';

/**
 * Nomenclator
 * TODO: definir propiedades y tipos
 */
export class Nomenclator {
  'uuid'?: string;
  'identifiers': Array<Identifier>;
  'type': NomenclatorType;
  'status': boolean;
  'authorizationDate': Date;
  'lastUpdate': Date;
  'manufacturer'?: Organization;
  'comercializer'?: Organization;
  'name': Name;
  'images'?: Array<string>;
  'references'?: Array<string>;
  'price'?: string;
  'visa'?: boolean;
  'ingredients'?: Array<string>;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'uuid',
      baseName: 'uuid',
      type: 'string',
      format: '',
    },
    {
      name: 'identifiers',
      baseName: 'identifiers',
      type: 'Array<Identifier>',
      format: '',
    },
    {
      name: 'type',
      baseName: 'type',
      type: 'NomenclatorType',
      format: '',
    },
    {
      name: 'status',
      baseName: 'status',
      type: 'boolean',
      format: '',
    },
    {
      name: 'authorizationDate',
      baseName: 'authorizationDate',
      type: 'Date',
      format: '',
    },
    {
      name: 'lastUpdate',
      baseName: 'lastUpdate',
      type: 'Date',
      format: '',
    },
    {
      name: 'manufacturer',
      baseName: 'manufacturer',
      type: 'Organization',
      format: '',
    },
    {
      name: 'comercializer',
      baseName: 'comercializer',
      type: 'Organization',
      format: '',
    },
    {
      name: 'name',
      baseName: 'name',
      type: 'Name',
      format: '',
    },
    {
      name: 'images',
      baseName: 'images',
      type: 'Array<string>',
      format: '',
    },
    {
      name: 'references',
      baseName: 'references',
      type: 'Array<string>',
      format: '',
    },
    {
      name: 'price',
      baseName: 'price',
      type: 'string',
      format: '',
    },
    {
      name: 'visa',
      baseName: 'visa',
      type: 'boolean',
      format: '',
    },
    {
      name: 'ingredients',
      baseName: 'ingredients',
      type: 'Array<string>',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return Nomenclator.attributeTypeMap;
  }

  public constructor() {}
}
