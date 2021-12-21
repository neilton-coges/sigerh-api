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
  nome: string;

  @Column()
  tipo: TipoCargo;
}

export { TipoCargo, Cargo };
