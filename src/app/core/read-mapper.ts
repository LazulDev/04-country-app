export interface ReadMapper<Dto, Entity> {
  fromDto(dto: Dto): Entity;
}

