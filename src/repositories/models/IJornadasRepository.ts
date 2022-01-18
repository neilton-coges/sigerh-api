import { Jornada } from '../../entities/Jornada';
import { JornadaHora } from '../../entities/JornadaHora';

type CreateJornadaData = Pick<Jornada, 'descricao'> & {
  horas: Array<Pick<JornadaHora, 'horaInicio' | 'horaFim'>>
};

interface IJornadasRepository {
  create(data: CreateJornadaData): Promise<Jornada>;
  update(jornada: Jornada): Promise<Jornada>;
  destroy(id: string): Promise<void>;
  findById(id: string): Promise<Jornada>;
  findByIdWithHoras(id: string): Promise<Jornada>;
  listWithHoras(): Promise<Jornada[]>;
}

export { CreateJornadaData, IJornadasRepository };
