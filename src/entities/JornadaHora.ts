import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Jornada } from './Jornada';

@Entity('jornadas_horas')
class JornadaHora extends BaseModel {
  @Column({ name: 'hora_inicio' })
  horaInicio: string;

  @Column({ name: 'hora_fim' })
  horaFim: string;

  @Column({ name: 'jornada_id' })
  jornadaId: string;

  @ManyToOne(() => Jornada, (jornada) => jornada.horas, { onDelete: 'CASCADE', onUpdate: 'RESTRICT', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'jornada_id', referencedColumnName: 'id' })
  jornada: Jornada;
}

export { JornadaHora };
