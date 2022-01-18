import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './BaseModel';
import { JornadaHora } from './JornadaHora';

@Entity('jornadas')
class Jornada extends BaseModel {
  @Column()
  descricao: string;

  @OneToMany(() => JornadaHora, (jornada) => jornada.jornada, { cascade: true, persistence: true })
  horas: JornadaHora[];
}

export { Jornada };
