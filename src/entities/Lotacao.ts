import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Cargo } from './Cargo';
import { CdsFg } from './CdsFg';
import { Jornada } from './Jornada';
import { Unidade } from './Unidade';

@Entity('lotacoes')
class Lotacao extends BaseModel {
  @Column()
  matricula: string;

  @Column({ name: 'data_admissao' })
  dataAdmissao: Date;

  @Column()
  observacao: string;

  @Column({ name: 'servidor_id' })
  servidorId: string;

  @Column({ name: 'cargo_id' })
  cargoId: string;

  @Column({ name: 'cds_fg_id' })
  cdsFgId: string;

  @Column({ name: 'unidade_id' })
  unidadeId: string;

  @Column({ name: 'subunidade_id' })
  subUnidadeId: string;

  @Column({ name: 'jornada_id' })
  jornadaId: string;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'cargo_id', referencedColumnName: 'id' })
  cargo: Cargo;

  @ManyToOne(() => CdsFg)
  @JoinColumn({ name: 'cds_fg_id', referencedColumnName: 'id' })
  cdsFg: CdsFg;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'unidade_id', referencedColumnName: 'id' })
  unidade: Unidade;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'subunidade_id', referencedColumnName: 'id' })
  subUnidade: Unidade;

  @ManyToOne(() => Jornada)
  @JoinColumn({ name: 'jornada_id', referencedColumnName: 'id' })
  jornada: Jornada;
}

export { Lotacao };
