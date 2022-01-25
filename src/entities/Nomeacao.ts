import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Cargo } from './Cargo';
import { CdsFg } from './CdsFg';
import { Servidor } from './Servidor';
import { Unidade } from './Unidade';

enum TipoNomeacao {
  NOMEACAO,
  EXONERACAO,
}

@Entity('nomeacoes')
class Nomeacao extends BaseModel {
  @Column({ type: 'enum', enum: TipoNomeacao })
  tipo: TipoNomeacao;

  @Column({ name: 'cargo_id' })
  cargoId: string;

  @Column({ name: 'cds_fg_id' })
  cdsFgId: string;

  @Column({ name: 'unidade_id' })
  unidadeId: string;

  @Column({ name: 'servidor_id' })
  servidorId: string;

  @Column()
  data: Date;

  @Column({ name: 'diof_processo' })
  diofProcesso: string;

  @Column()
  observacao: string;

  @ManyToOne(() => Servidor)
  @JoinColumn({ name: 'servidor_id', referencedColumnName: 'id' })
  servidor: Servidor;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'cargo_id', referencedColumnName: 'id' })
  cargo: Cargo;

  @ManyToOne(() => CdsFg)
  @JoinColumn({ name: 'cds_fg_id', referencedColumnName: 'id' })
  cdsFg: CdsFg;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'unidade_id', referencedColumnName: 'id' })
  unidade: Unidade;
}

export { TipoNomeacao, Nomeacao };
