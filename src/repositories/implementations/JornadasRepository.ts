import { getRepository, Repository } from 'typeorm';

import { Jornada } from '../../entities/Jornada';
import { CreateJornadaData, IJornadasRepository } from '../models/IJornadasRepository';

class JornadasRepository implements IJornadasRepository {
  private repository: Repository<Jornada>;

  constructor() {
    this.repository = getRepository(Jornada);
  }

  async create({ nome, horas }: CreateJornadaData): Promise<Jornada> {
    const jornada = this.repository.create({
      nome,
      horas,
    });

    await this.repository.save(jornada);

    return jornada;
  }

  async update(jornada: Jornada): Promise<Jornada> {
    return this.repository.save(jornada);
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Jornada> {
    return this.repository.findOne(id);
  }

  async findByIdWithHoras(id: string): Promise<Jornada> {
    return this.repository.findOne(id, { relations: ['horas'] });
  }

  async listWithHoras(): Promise<Jornada[]> {
    return this.repository.find({
      relations: ['horas'],
    });
  }
}

export { JornadasRepository };
