import { Column, Entity } from 'typeorm';

import { numberTransformer } from '../utils/numberTransformer';
import { BaseModel } from './BaseModel';

@Entity('reajustes_classes_niveis_cargos')
class ReajusteClasseNivelCargo extends BaseModel {
  @Column({ transformer: numberTransformer })
  percentual: number;

  @Column()
  observacao: string;

  @Column({ name: 'classe_nivel_cargo_id' })
  classeNivelCargoId: string;
}

export { ReajusteClasseNivelCargo };
