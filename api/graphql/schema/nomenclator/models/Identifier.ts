/**
 * Objeto de identificación genérico
 */
export class Identifier {
  'type': string;
  /**
   * Ámbito del identificador para personas físicas.
   */
  'system': string;
  /**
   * Código numérico o alfanumérico único
   */
  'value': string;

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: Array<{ name: string; baseName: string; type: string; format: string }> = [
    {
      name: 'type',
      baseName: 'type',
      type: 'string',
      format: '',
    },
    {
      name: 'system',
      baseName: 'system',
      type: 'string',
      format: '',
    },
    {
      name: 'value',
      baseName: 'value',
      type: 'string',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return Identifier.attributeTypeMap;
  }

  public constructor() {}
}
