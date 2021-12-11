import { inject, injectable } from 'tsyringe';

import { Jornada } from '../../entities/Jornada';
import { JornadaHora } from '../../entities/JornadaHora';
import { AppError } from '../../error/AppError';
import { IJornadasRepository } from '../../repositories/models/IJornadasRepository';

type UpdateRequestData = {
  id: string;
  nome: string;
  horas: Array<{
    horaInicio: string;
    horaFim: string;
  }>;
}

@injectable()
class UpdateJornadaService {
  constructor(
    @inject('JornadasRepository')
    private jornadasRepository: IJornadasRepository,
  ) {}

  async execute({ id, nome, horas }: UpdateRequestData): Promise<Jornada> {
    const jornada = await this.jornadasRepository.findById(id);

    if (!jornada) {
      throw new AppError('Jornada não encontrada.');
    }

    const horasObject = horas.map((item) => {
      const hora = new JornadaHora();

      hora.horaInicio = item.horaInicio;
      hora.horaFim = item.horaFim;
      hora.jornadaId = id;

      return hora;
    });

    jornada.nome = nome;
    jornada.horas = horasObject;

    await this.jornadasRepository.update(jornada);

    return jornada;
  }
}

export { UpdateJornadaService };
