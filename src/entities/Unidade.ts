import {
  Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany,
} from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('unidades')
class Unidade extends BaseModel {
  @Column()
  sigla: string;

  @Column()
  nome: string;

  @Column({ name: 'unidade_pai_id' })
  unidadePaiId: string;

  @ManyToOne(() => Unidade, (unidade) => unidade.subUnidades)
  @JoinColumn({ name: 'unidade_pai_id' })
  unidadePai: this;

  @OneToMany(() => Unidade, (unidade) => unidade.unidadePai)
  subUnidades: this[];
}

export { Unidade };
