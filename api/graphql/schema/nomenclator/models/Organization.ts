/**
 * Organization: Objeto para identificar estructuras
 */

import { Address } from './Address';
import { Identifier } from './Identifier';

/**
 * Organization
 */
export class Organization {
  'identifiers': Array<Identifier>;
  'name'?: string;
  'address'?: Address;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'identifiers',
      baseName: 'identifiers',
      type: 'Array<Identifier>',
      format: '',
    },
    {
      name: 'name',
      baseName: 'name',
      type: 'string',
      format: '',
    },
    {
      name: 'address',
      baseName: 'address',
      type: 'Address',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return Organization.attributeTypeMap;
  }

  public constructor() {}
}
