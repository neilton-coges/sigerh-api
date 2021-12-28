import { Column, Entity } from 'typeorm';

import { numberTransformer } from '../utils/numberTransformer';
import { BaseModel } from './BaseModel';

@Entity('padroes_classes_niveis_cargos')
class PadraoClasseNivelCargo extends BaseModel {
  @Column()
  codigo: string;

  @Column()
  descricao: string;

  @Column({ transformer: numberTransformer })
  valor: number;

  @Column({ name: 'valor_reajustado', transformer: numberTransformer })
  valorReajustado: number;

  @Column({ name: 'classe_nivel_cargo_id' })
  classeNivelCargoId: string;
}

export { PadraoClasseNivelCargo };
