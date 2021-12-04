import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('cargos')
class Cargo extends BaseModel {
  @Column()
  nome: string;
}

export { Cargo };
