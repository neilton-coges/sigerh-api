import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

enum TipoCargo {
  EFETIVO = 'EFETIVO',
  COMISSAO = 'COMISSAO',
  FUNCAO_GRATIFICADA = 'FUNCAO_GRATIFICADA',
}

@Entity('cargos')
class Cargo extends BaseModel {
  @Column()
  tipo: TipoCargo;

  @Column()
  descricao: string;

  @Column({ name: 'nivel_cargo_id' })
  nivelCargoId: string;
}

export { TipoCargo, Cargo };
