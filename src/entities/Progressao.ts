import { Expose } from 'class-transformer';
import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Cargo } from './Cargo';
import { ClasseNivelCargo } from './ClasseNivelCargo';
import { PadraoClasseNivelCargo } from './PadraoClasseNivelCargo';
import { Servidor } from './Servidor';

@Entity({ name: 'progressoes' })
class Progressao extends BaseModel {
  @Column({ name: 'servidor_id' })
  servidorId: string;

  @Column({ name: 'lotacao_id' })
  lotacaoId: string;

  @Column({ name: 'cargo_id' })
  cargoId: string;

  @Column({ name: 'classe_nivel_cargo_id' })
  classeNivelCargoId: string;

  @Column({ name: 'padrao_classe_nivel_cargo_id' })
  padraoClasseNivelCargoId: string;

  @Column({ name: 'data_progressao' })
  dataProgressao: Date;

  @Column()
  processo: string;

  @Column()
  observacao: string;

  @ManyToOne(() => Servidor)
  @JoinColumn({ name: 'servidor_id', referencedColumnName: 'id' })
  servidor: Servidor;

  @ManyToOne(() => Cargo)
  @JoinColumn({ name: 'cargo_id', referencedColumnName: 'id' })
  cargo: Cargo;

  @ManyToOne(() => ClasseNivelCargo)
  @JoinColumn({ name: 'classe_nivel_cargo_id', referencedColumnName: 'id' })
  classeNivelCargo: ClasseNivelCargo;

  @ManyToOne(() => PadraoClasseNivelCargo)
  @JoinColumn({ name: 'padrao_classe_nivel_cargo_id', referencedColumnName: 'id' })
  padraoClasseNivelCargo: PadraoClasseNivelCargo;

  @Expose({ name: 'dataProgressaoFormatada' })
  getDataProgressaoFormatada(): string {
    return this.dataProgressao?.toLocaleDateString('pt', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}

export { Progressao };
