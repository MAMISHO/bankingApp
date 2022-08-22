export interface EntityMapper<Entity, DTO> {
  initMapper(): void;
  toDTO(entity: Entity): DTO;
  toEntity(dto: DTO): Entity;
  toDTOList(entity: Entity[]): DTO[];
  toEntityList(dto: DTO[]): Entity[];
}
