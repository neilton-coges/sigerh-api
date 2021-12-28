import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity('niveis_cargos')
class NivelCargo extends BaseModel {
  @Column()
  codigo: string;

  @Column()
  descricao: string;
}

export { NivelCargo };
