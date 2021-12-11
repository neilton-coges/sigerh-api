import { inject, injectable } from 'tsyringe';

import { Jornada } from '../../entities/Jornada';
import { AppError } from '../../error/AppError';
import { IJornadasRepository } from '../../repositories/models/IJornadasRepository';

@injectable()
class ShowJornadaService {
  constructor(
    @inject('JornadasRepository')
    private jornadasRepository: IJornadasRepository,
  ) {}

  async execute(id: string): Promise<Jornada> {
    const jornada = await this.jornadasRepository.findById(id);

    if (!jornada) {
      throw new AppError('Jornada não encontrada.');
    }

    return jornada;
  }
}

export { ShowJornadaService };
