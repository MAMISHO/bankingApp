/**
 * Name: Objeto para asignación de nombres
 */

/**
 * Name
 */
export class Name {
  'short'?: string;
  'long'?: string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'short',
      baseName: 'short',
      type: 'string',
      format: '',
    },
    {
      name: 'long',
      baseName: 'long',
      type: 'Address',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return Name.attributeTypeMap;
  }

  public constructor() {}
}
