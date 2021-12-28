import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity('classes_niveis_cargos')
class ClasseNivelCargo extends BaseModel {
  @Column()
  codigo: string;

  @Column()
  descricao: string;

  @Column({ name: 'nivel_cargo_id' })
  nivelCargoId: string;
}

export { ClasseNivelCargo };
