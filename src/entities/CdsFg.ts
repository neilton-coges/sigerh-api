import { Column, Entity } from 'typeorm';

import { BaseModel } from './BaseModel';

@Entity({ name: 'cds_fgs' })
class CdsFg extends BaseModel {
  @Column()
  tipo: 'CDS' | 'FG';

  @Column()
  sigla: string;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @Column({ name: 'qtd_vagas' })
  qtdVagas: number;

  @Column({ name: 'qtd_nomeados' })
  qtdNomeados: number;
}

export { CdsFg };
