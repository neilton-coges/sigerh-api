import { Jornada } from '../../entities/Jornada';
import { CreateJornadaData, IJornadasRepository } from '../models/IJornadasRepository';

class FakeJornadasRepository implements IJornadasRepository {
  private jornadas: Jornada[] = [];

  async create({ descricao, horas }: CreateJornadaData): Promise<Jornada> {
    const jornada = new Jornada();

    Object.assign(jornada, {
      descricao,
      horas,
    });

    this.jornadas.push(jornada);

    return jornada;
  }

  async update(jornada: Jornada): Promise<Jornada> {
    const index = this.jornadas.findIndex((item) => item.id === jornada.id);

    this.jornadas[index] = jornada;

    return jornada;
  }

  async destroy(id: string): Promise<void> {
    const index = this.jornadas.findIndex((item) => item.id === id);
    this.jornadas.splice(index, 1);
  }

  async findById(id: string): Promise<Jornada> {
    return this.jornadas.find((item) => item.id === id);
  }

  async findByIdWithHoras(id: string): Promise<Jornada> {
    return this.jornadas.find((item) => item.id === id);
  }

  async listWithHoras(): Promise<Jornada[]> {
    return this.jornadas;
  }
}

export { FakeJornadasRepository };
