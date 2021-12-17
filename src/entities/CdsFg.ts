import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity({ name: 'cds_fgs' })
class CdsFg extends BaseModel {
  @Column()
  tipo: 'CDS' | 'FG';

  @Column()
  simbologia: string;

  @Column()
  remuneracao: number;

  @Column({ name: 'quantidade_vagas' })
  quantidadeVagas: number;

  @Column({ name: 'quantidade_nomeados' })
  quantidadeNomeados: number;
}

export { CdsFg };
