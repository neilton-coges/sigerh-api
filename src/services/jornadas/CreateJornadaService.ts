import { inject, injectable } from 'tsyringe';
import { Jornada } from '../../entities/Jornada';
import { CreateJornadaData, IJornadasRepository } from '../../repositories/models/IJornadasRepository';

@injectable()
class CreateJornadaService {
  constructor(
    @inject('JornadasRepository')
    private jornadasRepository: IJornadasRepository,
  ) {}

  async execute({ descricao, horas }: CreateJornadaData): Promise<Jornada> {
    const jornada = await this.jornadasRepository.create({
      descricao,
      horas,
    });

    return jornada;
  }
}

export { CreateJornadaService };
