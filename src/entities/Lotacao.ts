import { Expose } from 'class-transformer';
import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Cargo } from './Cargo';
import { CdsFg } from './CdsFg';
import { ClasseNivelCargo } from './ClasseNivelCargo';
import { Jornada } from './Jornada';
import { PadraoClasseNivelCargo } from './PadraoClasseNivelCargo';
import { Servidor } from './Servidor';
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

  @Column({ name: 'classe_nivel_cargo_id' })
  classeNivelCargoId: string;

  @Column({ name: 'padrao_classe_nivel_cargo_id' })
  padraoClasseNivelCargoId: string;

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

  @ManyToOne(() => Servidor)
  @JoinColumn({ name: 'servidor_id', referencedColumnName: 'id' })
  servidor: Servidor;

  @ManyToOne(() => ClasseNivelCargo)
  @JoinColumn({ name: 'classe_nivel_cargo_id', referencedColumnName: 'id' })
  classeNivelCargo: ClasseNivelCargo;

  @ManyToOne(() => PadraoClasseNivelCargo)
  @JoinColumn({ name: 'padrao_classe_nivel_cargo_id', referencedColumnName: 'id' })
  padraoClasseNivelCargo: PadraoClasseNivelCargo;

  @Expose({ name: 'dataAdmissaoFormatada' })
  getDataAdmissao(): string {
    return this.dataAdmissao?.toLocaleDateString('pt', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}

export { Lotacao };
