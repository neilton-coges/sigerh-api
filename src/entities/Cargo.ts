import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

enum TipoCargo {
  EFETIVO,
  COMISSAO,
  FUNCAO_GRATIFICADA,
}

@Entity('cargos')
class Cargo extends BaseModel {
  @Column()
  nome: string;

  @Column()
  tipo: TipoCargo;
}

export { TipoCargo, Cargo };
