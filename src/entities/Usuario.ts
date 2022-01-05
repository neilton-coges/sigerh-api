import {
  Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { BaseModel } from './BaseModel';
import { Servidor } from './Servidor';

enum TipoUsuario {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  SERVIDOR = 'SERVIDOR',
}

@Entity('usuarios')
class Usuario extends BaseModel {
  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  tipo: TipoUsuario;

  @Column({ name: 'servidor_id' })
  servidorId: string;

  @OneToOne(() => Servidor)
  @JoinColumn({ name: 'servidor_id' })
  servidor: Servidor;
}

export { TipoUsuario, Usuario };
